import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import Button from '../../common/Button';
import Table from '../../common/Table';
import Badge from '../../common/Badge';
import { PageLoader } from '../../common/Loader';
import deliveryService from '../../../services/deliveryService';
import { formatDate } from '../../../utils/helpers';
import { STATUS } from '../../../utils/constants';

const DeliveryList = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeliveries();
  }, [statusFilter]);

  const fetchDeliveries = async () => {
    try {
      const response = await deliveryService.getAll({ status: statusFilter });
      setDeliveries(response.data);
    } catch (error) {
      console.error('Failed to fetch deliveries:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'documentNumber', title: 'Document #' },
    { key: 'customer', title: 'Customer' },
    { key: 'warehouse', title: 'Warehouse' },
    { key: 'items', title: 'Items', render: (items) => `${items?.length || 0} item(s)` },
    { key: 'createdAt', title: 'Date', render: (date) => formatDate(date) },
    { key: 'status', title: 'Status', render: (status) => <Badge status={status}>{status}</Badge> },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate(`/deliveries/${row.id}`); }}>
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
          <h1 className="text-2xl font-bold text-gray-900">Deliveries</h1>
          <p className="text-gray-500">Manage outgoing stock to customers</p>
        </div>
        <Button onClick={() => navigate('/deliveries/new')}>
          <Plus size={20} /> New Delivery
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
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <Table columns={columns} data={deliveries} onRowClick={(row) => navigate(`/deliveries/${row.id}`)} emptyMessage="No deliveries found" />
    </div>
  );
};

export default DeliveryList;