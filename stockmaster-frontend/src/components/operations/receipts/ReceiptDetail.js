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
      setAlert({ type: 'error', message: error.message || 'Failed to load receipt' });
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async () => {
    if (!window.confirm('Are you sure you want to validate this receipt? This will update the stock.')) {
      return;
    }
    
    setProcessing(true);
    try {
      await receiptService.validate(id);
      setAlert({ type: 'success', message: 'Receipt validated! Stock has been updated.' });
      fetchReceipt();
    } catch (error) {
      console.error('Validation error:', error);
      setAlert({ type: 'error', message: error.message || 'Failed to validate receipt' });
    } finally {
      setProcessing(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this receipt?')) {
      return;
    }
    
    setProcessing(true);
    try {
      await receiptService.cancel(id);
      setAlert({ type: 'success', message: 'Receipt cancelled' });
      fetchReceipt();
    } catch (error) {
      console.error('Cancel error:', error);
      setAlert({ type: 'error', message: error.message || 'Failed to cancel receipt' });
    } finally {
      setProcessing(false);
    }
  };

  const itemColumns = [
    { 
      key: 'productName', 
      title: 'Product',
      render: (value, row) => {
        if (value) return value;
        if (row.product?.name) return row.product.name;
        return '-';
      }
    },
    { 
      key: 'quantity', 
      title: 'Quantity',
      render: (value, row) => {
        const qty = value || row.quantityReceived || row.quantityOrdered || 0;
        return qty;
      }
    },
    { 
      key: 'unit', 
      title: 'Unit',
      render: (value, row) => {
        if (value) return value;
        if (row.product?.unitOfMeasure) return row.product.unitOfMeasure;
        return 'pcs';
      }
    }
  ];

  if (loading) return <PageLoader />;
  if (!receipt) return (
    <div className="text-center py-8">
      <p className="text-gray-500">Receipt not found</p>
      <Button onClick={() => navigate('/receipts')} className="mt-4">
        Back to Receipts
      </Button>
    </div>
  );

  const displayStatus = receipt.status?.toLowerCase() || 'draft';
  const canProcess = displayStatus === 'draft' || displayStatus === 'waiting';
  const items = receipt.items || receipt.lines || [];
  const totalQuantity = items.reduce((sum, item) => {
    const qty = item.quantity || item.quantityReceived || item.quantityOrdered || 0;
    return sum + Number(qty);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={() => navigate('/receipts')}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {receipt.receiptNumber || receipt.documentNumber || `Receipt #${id}`}
            </h1>
            <Badge status={displayStatus}>{displayStatus}</Badge>
          </div>
        </div>
        {canProcess && (
          <div className="flex gap-2">
            <Button variant="danger" onClick={handleCancel} loading={processing} disabled={processing}>
              <XCircle size={18} /> Cancel
            </Button>
            <Button variant="success" onClick={handleValidate} loading={processing} disabled={processing}>
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
            <div>
              <p className="text-sm text-gray-500">Supplier</p>
              <p className="font-medium">{receipt.supplierName || receipt.supplier || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Warehouse</p>
              <p className="font-medium">
                {typeof receipt.warehouse === 'object' ? receipt.warehouse?.name : receipt.warehouse || '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p className="font-medium">{receipt.createdAt ? formatDateTime(receipt.createdAt) : '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Validated</p>
              <p className="font-medium">
                {receipt.validatedAt || receipt.receivedDate ? formatDateTime(receipt.validatedAt || receipt.receivedDate) : '-'}
              </p>
            </div>
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
            <p className="text-4xl font-bold text-green-600">+{totalQuantity}</p>
            <p className="text-gray-500">Total items to receive</p>
          </div>
        </Card>
      </div>

      <Card title="Items">
        <Table columns={itemColumns} data={items} emptyMessage="No items" />
      </Card>
    </div>
  );
};

export default ReceiptDetail;