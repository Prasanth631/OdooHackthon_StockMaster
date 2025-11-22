import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import Button from '../../common/Button';
import Table from '../../common/Table';
import Badge from '../../common/Badge';
import { PageLoader } from '../../common/Loader';
import adjustmentService from '../../../services/adjustmentService';
import { formatDate } from '../../../utils/helpers';
import { STATUS } from '../../../utils/constants';

const AdjustmentList = () => {
  const [adjustments, setAdjustments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => { fetchAdjustments(); }, [statusFilter]);

  const fetchAdjustments = async () => {
    try {
      const response = await adjustmentService.getAll({ status: statusFilter });
      setAdjustments(response.data);
    } catch (error) {
      console.error('Failed to fetch adjustments:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'documentNumber', title: 'Document #' },
    { key: 'productName', title: 'Product' },
    { key: 'warehouse', title: 'Warehouse' },
    {
      key: 'difference', title: 'Adjustment',
      render: (diff) => (
        <span className={diff > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
          {diff > 0 ? '+' : ''}{diff}
        </span>
      )
    },
    { key: 'reason', title: 'Reason' },
    { key: 'createdAt', title: 'Date', render: (date) => formatDate(date) },
    { key: 'status', title: 'Status', render: (status) => <Badge status={status}>{status}</Badge> },
    {
      key: 'actions', title: 'Actions',
      render: (_, row) => (
        <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate(`/adjustments/${row.id}`); }}>View</Button>
      )
    }
  ];

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stock Adjustments</h1>
          <p className="text-gray-500">Fix stock discrepancies</p>
        </div>
        <Button onClick={() => navigate('/adjustments/new')}><Plus size={20} /> New Adjustment</Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
        <Filter size={20} className="text-gray-400" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2">
          <option value="">All Status</option>
          {Object.values(STATUS).map((status) => (<option key={status} value={status}>{status}</option>))}
        </select>
      </div>

      <Table columns={columns} data={adjustments} onRowClick={(row) => navigate(`/adjustments/${row.id}`)} emptyMessage="No adjustments found" />
    </div>
  );
};

export default AdjustmentList;