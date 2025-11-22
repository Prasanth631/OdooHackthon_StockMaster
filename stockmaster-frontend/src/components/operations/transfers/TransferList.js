import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import Button from '../../common/Button';
import Table from '../../common/Table';
import Badge from '../../common/Badge';
import { PageLoader } from '../../common/Loader';
import transferService from '../../../services/transferService';
import { formatDate } from '../../../utils/helpers';
import { STATUS } from '../../../utils/constants';

const TransferList = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => { fetchTransfers(); }, [statusFilter]);

  const fetchTransfers = async () => {
    try {
      const response = await transferService.getAll({ status: statusFilter });
      setTransfers(response.data);
    } catch (error) {
      console.error('Failed to fetch transfers:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'documentNumber', title: 'Document #' },
    { key: 'sourceWarehouse', title: 'From' },
    { key: 'destinationWarehouse', title: 'To' },
    { key: 'items', title: 'Items', render: (items) => `${items?.length || 0} item(s)` },
    { key: 'createdAt', title: 'Date', render: (date) => formatDate(date) },
    { key: 'status', title: 'Status', render: (status) => <Badge status={status}>{status}</Badge> },
    {
      key: 'actions', title: 'Actions',
      render: (_, row) => (
        <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate(`/transfers/${row.id}`); }}>View</Button>
      )
    }
  ];

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Internal Transfers</h1>
          <p className="text-gray-500">Move stock between warehouses</p>
        </div>
        <Button onClick={() => navigate('/transfers/new')}><Plus size={20} /> New Transfer</Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
        <Filter size={20} className="text-gray-400" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2">
          <option value="">All Status</option>
          {Object.values(STATUS).map((status) => (<option key={status} value={status}>{status}</option>))}
        </select>
      </div>

      <Table columns={columns} data={transfers} onRowClick={(row) => navigate(`/transfers/${row.id}`)} emptyMessage="No transfers found" />
    </div>
  );
};

export default TransferList;