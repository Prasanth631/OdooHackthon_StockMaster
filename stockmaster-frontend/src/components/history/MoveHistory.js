import React, { useState, useEffect } from 'react';
import { ArrowDownCircle, ArrowUpCircle, ArrowRightLeft, ClipboardCheck, Filter } from 'lucide-react';
import Table from '../common/Table';
import Badge from '../common/Badge';
import { PageLoader } from '../common/Loader';
import dashboardService from '../../services/dashboardService';
import { DOCUMENT_TYPES } from '../../utils/constants';

const typeIcons = {
  receipt: ArrowDownCircle,
  delivery: ArrowUpCircle,
  transfer: ArrowRightLeft,
  adjustment: ClipboardCheck
};

const typeColors = {
  receipt: 'text-green-500',
  delivery: 'text-red-500',
  transfer: 'text-blue-500',
  adjustment: 'text-purple-500'
};

const MoveHistory = () => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => { fetchMovements(); }, []);

  const fetchMovements = async () => {
    try {
      const response = await dashboardService.getRecentMovements();
      setMovements(response.data);
    } catch (error) {
      console.error('Failed to fetch movements:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMovements = typeFilter 
    ? movements.filter(m => m.type === typeFilter) 
    : movements;

  const columns = [
    {
      key: 'type', title: 'Type',
      render: (type) => {
        const Icon = typeIcons[type];
        return (
          <div className="flex items-center gap-2">
            <Icon className={typeColors[type]} size={20} />
            <span className="capitalize">{type}</span>
          </div>
        );
      }
    },
    { key: 'document', title: 'Document #' },
    { key: 'product', title: 'Product' },
    {
      key: 'quantity', title: 'Quantity',
      render: (qty) => (
        <span className={qty.startsWith('+') ? 'text-green-600 font-semibold' : qty.startsWith('-') ? 'text-red-600 font-semibold' : ''}>
          {qty}
        </span>
      )
    },
    { key: 'date', title: 'Date' },
    { key: 'status', title: 'Status', render: (status) => <Badge status={status}>{status}</Badge> }
  ];

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Move History</h1>
        <p className="text-gray-500">Track all stock movements</p>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
        <Filter size={20} className="text-gray-400" />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2">
          <option value="">All Types</option>
          {Object.values(DOCUMENT_TYPES).map((type) => (
            <option key={type} value={type} className="capitalize">{type}</option>
          ))}
        </select>
      </div>

      <Table columns={columns} data={filteredMovements} emptyMessage="No movements found" />
    </div>
  );
};

export default MoveHistory;