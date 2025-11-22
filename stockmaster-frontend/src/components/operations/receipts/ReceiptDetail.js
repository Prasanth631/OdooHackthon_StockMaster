import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Button from '../../common/Button';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Table from '../../common/Table';
import Alert from '../../common/Alert';
import { PageLoader } from '../../common/Loader';
import receiptService from '../../../services/receiptService';
import { formatDateTime } from '../../../utils/helpers';

const ReceiptDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchReceipt();
  }, [id]);

  const fetchReceipt = async () => {
    try {
      const response = await receiptService.getById(id);
      setReceipt(response.data);
    } catch (error) {
      console.error('Failed to fetch receipt:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async () => {
    setProcessing(true);
    try {
      await receiptService.validate(id);
      setAlert({ type: 'success', message: 'Receipt validated! Stock has been updated.' });
      fetchReceipt();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to validate receipt' });
    } finally {
      setProcessing(false);
    }
  };

  const handleCancel = async () => {
    setProcessing(true);
    try {
      await receiptService.cancel(id);
      setAlert({ type: 'success', message: 'Receipt cancelled' });
      fetchReceipt();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to cancel receipt' });
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
  if (!receipt) return <div className="text-center py-8">Receipt not found</div>;

  const canProcess = receipt.status === 'draft' || receipt.status === 'waiting';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={() => navigate('/receipts')}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{receipt.documentNumber}</h1>
            <Badge status={receipt.status}>{receipt.status}</Badge>
          </div>
        </div>
        {canProcess && (
          <div className="flex gap-2">
            <Button variant="danger" onClick={handleCancel} loading={processing}>
              <XCircle size={18} /> Cancel
            </Button>
            <Button variant="success" onClick={handleValidate} loading={processing}>
              <CheckCircle size={18} /> Validate
            </Button>
          </div>
        )}
      </div>

      {alert && <Alert variant={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Receipt Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-sm text-gray-500">Supplier</p><p className="font-medium">{receipt.supplier}</p></div>
            <div><p className="text-sm text-gray-500">Warehouse</p><p className="font-medium">{receipt.warehouse}</p></div>
            <div><p className="text-sm text-gray-500">Created</p><p className="font-medium">{formatDateTime(receipt.createdAt)}</p></div>
            <div><p className="text-sm text-gray-500">Validated</p><p className="font-medium">{receipt.validatedAt ? formatDateTime(receipt.validatedAt) : '-'}</p></div>
          </div>
          {receipt.notes && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-500">Notes</p>
              <p className="mt-1">{receipt.notes}</p>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Summary</h3>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-green-600">+{receipt.items?.reduce((sum, item) => sum + Number(item.quantity), 0) || 0}</p>
            <p className="text-gray-500">Total items to receive</p>
          </div>
        </Card>
      </div>

      <Card title="Items">
        <Table columns={itemColumns} data={receipt.items || []} emptyMessage="No items" />
      </Card>
    </div>
  );
};

export default ReceiptDetail;