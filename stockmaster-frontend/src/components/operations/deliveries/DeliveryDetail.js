import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Package, Truck } from 'lucide-react';
import Button from '../../common/Button';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Table from '../../common/Table';
import Alert from '../../common/Alert';
import { PageLoader } from '../../common/Loader';
import deliveryService from '../../../services/deliveryService';
import { formatDateTime } from '../../../utils/helpers';

const DeliveryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => { fetchDelivery(); }, [id]);

  const fetchDelivery = async () => {
    try {
      const response = await deliveryService.getById(id);
      setDelivery(response.data);
    } catch (error) {
      console.error('Failed to fetch delivery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    setProcessing(true);
    try {
      if (newStatus === 'done') {
        await deliveryService.validate(id);
        setAlert({ type: 'success', message: 'Delivery completed! Stock has been updated.' });
      } else {
        await deliveryService.updateStatus(id, newStatus);
        setAlert({ type: 'success', message: `Status updated to ${newStatus}` });
      }
      fetchDelivery();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to update status' });
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
  if (!delivery) return <div className="text-center py-8">Delivery not found</div>;

  const canProcess = delivery.status !== 'done' && delivery.status !== 'canceled';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={() => navigate('/deliveries')}><ArrowLeft size={20} /></Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{delivery.documentNumber}</h1>
            <Badge status={delivery.status}>{delivery.status}</Badge>
          </div>
        </div>
        {canProcess && (
          <div className="flex gap-2">
            {delivery.status === 'draft' && (
              <Button variant="warning" onClick={() => handleStatusUpdate('waiting')} loading={processing}>
                <Package size={18} /> Mark as Waiting
              </Button>
            )}
            {delivery.status === 'waiting' && (
              <Button variant="primary" onClick={() => handleStatusUpdate('ready')} loading={processing}>
                <Truck size={18} /> Mark Ready
              </Button>
            )}
            {delivery.status === 'ready' && (
              <Button variant="success" onClick={() => handleStatusUpdate('done')} loading={processing}>
                <CheckCircle size={18} /> Complete Delivery
              </Button>
            )}
          </div>
        )}
      </div>

      {alert && <Alert variant={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Delivery Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-sm text-gray-500">Customer</p><p className="font-medium">{delivery.customer}</p></div>
            <div><p className="text-sm text-gray-500">Warehouse</p><p className="font-medium">{delivery.warehouse}</p></div>
            <div><p className="text-sm text-gray-500">Created</p><p className="font-medium">{formatDateTime(delivery.createdAt)}</p></div>
            <div><p className="text-sm text-gray-500">Completed</p><p className="font-medium">{delivery.validatedAt ? formatDateTime(delivery.validatedAt) : '-'}</p></div>
          </div>
          {delivery.notes && (<div className="mt-4 pt-4 border-t"><p className="text-sm text-gray-500">Notes</p><p className="mt-1">{delivery.notes}</p></div>)}
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Summary</h3>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-red-600">-{delivery.items?.reduce((sum, item) => sum + Number(item.quantity), 0) || 0}</p>
            <p className="text-gray-500">Total items to deliver</p>
          </div>
        </Card>
      </div>

      <Card title="Items"><Table columns={itemColumns} data={delivery.items || []} emptyMessage="No items" /></Card>
    </div>
  );
};

export default DeliveryDetail;