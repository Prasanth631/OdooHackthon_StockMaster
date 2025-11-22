// src/components/operations/adjustments/AdjustmentDetail.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Button from '../../common/Button';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Alert from '../../common/Alert';
import { PageLoader } from '../../common/Loader';
import { AuthContext } from '../../../context/AuthContext';
import adjustmentService from '../../../services/adjustmentService';
import { formatDateTime } from '../../../utils/helpers';

const AdjustmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [adjustment, setAdjustment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchAdjustment();
  }, [id]);

  const fetchAdjustment = async () => {
    try {
      setLoading(true);
      const response = await adjustmentService.getById(id);
      setAdjustment(response.data);
    } catch (error) {
      console.error('Failed to fetch adjustment:', error);
      setAlert({ 
        type: 'error', 
        message: error.message || 'Failed to load adjustment details' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!window.confirm('Are you sure you want to approve this adjustment? This will update the stock levels.')) {
      return;
    }

    setProcessing(true);
    try {
      await adjustmentService.approve(id, user?.name || 'Admin');
      setAlert({ 
        type: 'success', 
        message: 'Adjustment approved successfully! Stock has been updated.' 
      });
      // Refresh adjustment data
      setTimeout(() => {
        fetchAdjustment();
      }, 1000);
    } catch (error) {
      console.error('Failed to approve adjustment:', error);
      setAlert({ 
        type: 'error', 
        message: error.message || 'Failed to approve adjustment' 
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this adjustment?')) {
      return;
    }

    setProcessing(true);
    try {
      await adjustmentService.cancel(id);
      setAlert({ 
        type: 'success', 
        message: 'Adjustment cancelled successfully' 
      });
      // Refresh adjustment data or navigate back
      setTimeout(() => {
        navigate('/adjustments');
      }, 1500);
    } catch (error) {
      console.error('Failed to cancel adjustment:', error);
      setAlert({ 
        type: 'error', 
        message: error.message || 'Failed to cancel adjustment' 
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <PageLoader />;
  
  if (!adjustment) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Adjustment not found</p>
        <Button 
          variant="secondary" 
          onClick={() => navigate('/adjustments')}
          className="mt-4"
        >
          Back to Adjustments
        </Button>
      </div>
    );
  }

  const canProcess = adjustment.status === 'draft' || adjustment.status === 'waiting';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="secondary" 
            onClick={() => navigate('/adjustments')}
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {adjustment.documentNumber}
            </h1>
            <Badge status={adjustment.status}>{adjustment.status}</Badge>
          </div>
        </div>
        {canProcess && (
          <div className="flex gap-2">
            <Button 
              variant="danger" 
              onClick={handleCancel} 
              loading={processing}
              disabled={processing}
            >
              <XCircle size={18} /> Cancel
            </Button>
            <Button 
              variant="success" 
              onClick={handleApprove} 
              loading={processing}
              disabled={processing}
            >
              <CheckCircle size={18} /> Approve
            </Button>
          </div>
        )}
      </div>

      {/* Alert */}
      {alert && (
        <Alert 
          variant={alert.type} 
          message={alert.message} 
          onClose={() => setAlert(null)} 
        />
      )}

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Adjustment Information */}
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Adjustment Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Product</p>
              <p className="font-medium">{adjustment.productName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Warehouse</p>
              <p className="font-medium">{adjustment.warehouse || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p className="font-medium">
                {adjustment.createdAt ? formatDateTime(adjustment.createdAt) : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Approved By</p>
              <p className="font-medium">{adjustment.approvedBy || 'Pending'}</p>
            </div>
            {adjustment.approvedAt && (
              <div>
                <p className="text-sm text-gray-500">Approved Date</p>
                <p className="font-medium">{formatDateTime(adjustment.approvedAt)}</p>
              </div>
            )}
          </div>
          {adjustment.reason && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-500">Reason</p>
              <p className="mt-1">{adjustment.reason}</p>
            </div>
          )}
        </Card>

        {/* Stock Change */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Stock Change</h3>
          <div className="space-y-4">
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-500">Previous</span>
              <span className="font-semibold">
                {adjustment.previousQuantity ?? 0}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-500">Counted</span>
              <span className="font-semibold">
                {adjustment.countedQuantity ?? 0}
              </span>
            </div>
            <div 
              className={`flex justify-between p-3 rounded-lg ${
                adjustment.difference > 0 
                  ? 'bg-green-50' 
                  : adjustment.difference < 0 
                  ? 'bg-red-50' 
                  : 'bg-gray-50'
              }`}
            >
              <span className="text-gray-500">Difference</span>
              <span 
                className={`font-bold ${
                  adjustment.difference > 0 
                    ? 'text-green-600' 
                    : adjustment.difference < 0 
                    ? 'text-red-600' 
                    : 'text-gray-900'
                }`}
              >
                {adjustment.difference > 0 ? '+' : ''}
                {adjustment.difference ?? 0}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdjustmentDetail;