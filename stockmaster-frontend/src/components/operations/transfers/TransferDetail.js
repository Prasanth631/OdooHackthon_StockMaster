import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../../common/Button';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Table from '../../common/Table';
import Alert from '../../common/Alert';
import { PageLoader } from '../../common/Loader';
import transferService from '../../../services/transferService';
import { formatDateTime } from '../../../utils/helpers';

const TransferDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transfer, setTransfer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => { fetchTransfer(); }, [id]);

  const fetchTransfer = async () => {
    try {
      const response = await transferService.getById(id);
      setTransfer(response.data);
    } catch (error) {
      console.error('Failed to fetch transfer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    setProcessing(true);
    try {
      await transferService.complete(id);
      setAlert({ type: 'success', message: 'Transfer completed!' });
      fetchTransfer();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to complete transfer' });
    } finally {
      setProcessing(false);
    }
  };

  const itemColumns = [
    { key: 'productName', title: 'Product' },
    { key: 'quantity', title: 'Quantity' },
    { key: 'unit', title: 'Unit' }
  ];

  if (loading) return <PageLoader />;
  if (!transfer) return <div className="text-center py-8">Transfer not found</div>;

  const canComplete = transfer.status !== 'done' && transfer.status !== 'canceled';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={() => navigate('/transfers')}><ArrowLeft size={20} /></Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{transfer.documentNumber}</h1>
            <Badge status={transfer.status}>{transfer.status}</Badge>
          </div>
        </div>
        {canComplete && (
          <Button variant="success" onClick={handleComplete} loading={processing}>
            <CheckCircle size={18} /> Complete Transfer
          </Button>
        )}
      </div>

      {alert && <Alert variant={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Transfer Information</h3>
          <div className="flex items-center justify-center gap-4 py-6 bg-gray-50 rounded-lg mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">From</p>
              <p className="font-semibold text-lg">{transfer.sourceWarehouse}</p>
            </div>
            <ArrowRight size={32} className="text-blue-500" />
            <div className="text-center">
              <p className="text-sm text-gray-500">To</p>
              <p className="font-semibold text-lg">{transfer.destinationWarehouse}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-sm text-gray-500">Created</p><p className="font-medium">{formatDateTime(transfer.createdAt)}</p></div>
            <div><p className="text-sm text-gray-500">Completed</p><p className="font-medium">{transfer.completedAt ? formatDateTime(transfer.completedAt) : '-'}</p></div>
          </div>
          {transfer.notes && (<div className="mt-4 pt-4 border-t"><p className="text-sm text-gray-500">Notes</p><p className="mt-1">{transfer.notes}</p></div>)}
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Summary</h3>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-blue-600">{transfer.items?.reduce((sum, item) => sum + Number(item.quantity), 0) || 0}</p>
            <p className="text-gray-500">Total items to transfer</p>
          </div>
        </Card>
      </div>

      <Card title="Items"><Table columns={itemColumns} data={transfer.items || []} emptyMessage="No items" /></Card>
    </div>
  );
};

export default TransferDetail;