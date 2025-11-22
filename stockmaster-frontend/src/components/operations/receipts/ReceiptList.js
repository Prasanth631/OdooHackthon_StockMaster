import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import Button from '../../common/Button';
import Table from '../../common/Table';
import Badge from '../../common/Badge';
import { PageLoader } from '../../common/Loader';
import receiptService from '../../../services/receiptService';
import { formatDate } from '../../../utils/helpers';
import { STATUS } from '../../../utils/constants';

const ReceiptList = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchReceipts();
  }, [statusFilter]);

  const fetchReceipts = async () => {
    setLoading(true);
    try {
      const response = await receiptService.getAll({ status: statusFilter });
      setReceipts(response.data || []);
    } catch (error) {
      console.error('Failed to fetch receipts:', error);
      setReceipts([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
      key: 'receiptNumber', 
      title: 'Document #',
      render: (value, row) => value || row.documentNumber || '-'
    },
    { 
      key: 'supplierName', 
      title: 'Supplier',
      render: (value, row) => value || row.supplier || '-'
    },
    { 
      key: 'warehouse', 
      title: 'Warehouse',
      render: (value, row) => {
        if (typeof value === 'object' && value?.name) return value.name;
        if (typeof value === 'string') return value;
        return row.warehouseName || '-';
      }
    },
    {
      key: 'lines',
      title: 'Items',
      render: (lines, row) => {
        const items = lines || row.items || [];
        return `${items.length} item(s)`;
      }
    },
    {
      key: 'createdAt',
      title: 'Date',
      render: (date) => date ? formatDate(date) : '-'
    },
    {
      key: 'status',
      title: 'Status',
      render: (status) => {
        const displayStatus = status?.toLowerCase() || 'draft';
        return <Badge status={displayStatus}>{displayStatus}</Badge>;
      }
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
            navigate(`/receipts/${row.id}`);
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Receipts</h1>
          <p className="text-gray-500">Manage incoming stock from suppliers</p>
        </div>
        <Button onClick={() => navigate('/receipts/new')}>
          <Plus size={20} /> New Receipt
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
        <Filter size={20} className="text-gray-400" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          {Object.values(STATUS).map((status) => (
            <option key={status} value={status} className="capitalize">
              {status}
            </option>
          ))}
        </select>
      </div>

      <Table
        columns={columns}
        data={receipts}
        onRowClick={(row) => navigate(`/receipts/${row.id}`)}
        emptyMessage="No receipts found"
      />
    </div>
  );
};

export default ReceiptList;