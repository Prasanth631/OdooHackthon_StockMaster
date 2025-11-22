// src/components/operations/adjustments/AdjustmentList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, RefreshCw } from 'lucide-react';
import Button from '../../common/Button';
import Table from '../../common/Table';
import Badge from '../../common/Badge';
import Alert from '../../common/Alert';
import { PageLoader } from '../../common/Loader';
import adjustmentService from '../../../services/adjustmentService';
import { formatDate } from '../../../utils/helpers';
import { STATUS } from '../../../utils/constants';

const AdjustmentList = () => {
  const [adjustments, setAdjustments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdjustments();
  }, [statusFilter]);

  const fetchAdjustments = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await adjustmentService.getAll({ status: statusFilter });
      setAdjustments(response.data || []);
      
      if (showRefreshIndicator) {
        setAlert({ 
          type: 'success', 
          message: 'Adjustments list refreshed' 
        });
        setTimeout(() => setAlert(null), 2000);
      }
    } catch (error) {
      console.error('Failed to fetch adjustments:', error);
      setAlert({ 
        type: 'error', 
        message: error.message || 'Failed to load adjustments. Please try again.' 
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchAdjustments(true);
  };

  const columns = [
    {
      key: 'documentNumber',
      title: 'Document #',
      render: (docNum) => (
        <span className="font-medium text-blue-600">{docNum}</span>
      )
    },
    {
      key: 'productName',
      title: 'Product'
    },
    {
      key: 'warehouse',
      title: 'Warehouse'
    },
    {
      key: 'difference',
      title: 'Adjustment',
      render: (diff) => {
        if (!diff && diff !== 0) return '-';
        return (
          <span
            className={`font-semibold ${
              diff > 0
                ? 'text-green-600'
                : diff < 0
                ? 'text-red-600'
                : 'text-gray-600'
            }`}
          >
            {diff > 0 ? '+' : ''}
            {diff}
          </span>
        );
      }
    },
    {
      key: 'reason',
      title: 'Reason',
      render: (reason) => (
        <span className="truncate max-w-xs inline-block" title={reason}>
          {reason || '-'}
        </span>
      )
    },
    {
      key: 'createdAt',
      title: 'Date',
      render: (date) => formatDate(date)
    },
    {
      key: 'status',
      title: 'Status',
      render: (status) => (
        <Badge status={status}>
          {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
        </Badge>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/adjustments/${row.id}`);
          }}
        >
          View
        </Button>
      )
    }
  ];

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stock Adjustments</h1>
          <p className="text-gray-500">Fix stock discrepancies and manage inventory corrections</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            loading={refreshing}
            disabled={refreshing}
          >
            <RefreshCw size={18} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button onClick={() => navigate('/adjustments/new')}>
            <Plus size={20} /> New Adjustment
          </Button>
        </div>
      </div>

      {/* Alert */}
      {alert && (
        <Alert
          variant={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
        <Filter size={20} className="text-gray-400" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          {Object.values(STATUS).map((status) => (
            <option key={status} value={status} className="capitalize">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
        
        {statusFilter && (
          <button
            onClick={() => setStatusFilter('')}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Clear filter
          </button>
        )}
        
        <div className="ml-auto text-sm text-gray-500">
          Total: {adjustments.length} adjustment{adjustments.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={adjustments}
        onRowClick={(row) => navigate(`/adjustments/${row.id}`)}
        emptyMessage={
          statusFilter
            ? `No adjustments found with status "${statusFilter}"`
            : 'No adjustments found. Create your first adjustment to get started.'
        }
      />

      {/* Summary Stats */}
      {adjustments.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Total Adjustments</p>
              <p className="text-lg font-semibold text-gray-900">
                {adjustments.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-lg font-semibold text-yellow-600">
                {adjustments.filter(a => a.status === 'draft' || a.status === 'waiting').length}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Approved</p>
              <p className="text-lg font-semibold text-green-600">
                {adjustments.filter(a => a.status === 'done').length}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Cancelled</p>
              <p className="text-lg font-semibold text-red-600">
                {adjustments.filter(a => a.status === 'canceled' || a.status === 'cancelled').length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdjustmentList;