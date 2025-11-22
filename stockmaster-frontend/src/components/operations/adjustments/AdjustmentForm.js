// src/components/operations/adjustments/AdjustmentForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Select from '../../common/Select';
import Card from '../../common/Card';
import Alert from '../../common/Alert';
import { PageLoader } from '../../common/Loader';
import adjustmentService from '../../../services/adjustmentService';
import productService from '../../../services/productService';
import warehouseService from '../../../services/warehouseService';
import { validateAdjustmentForm } from '../../../utils/validators';

const AdjustmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    warehouse: '',
    previousQuantity: 0,
    countedQuantity: '',
    reason: ''
  });
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, whRes] = await Promise.all([
        productService.getAll(),
        warehouseService.getAll()
      ]);
      
      setProducts(prodRes.data);
      setWarehouses(whRes.data.map(w => ({ 
        value: w.name, 
        label: w.name 
      })));
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setAlert({ 
        type: 'error', 
        message: 'Failed to load products and warehouses. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setAlert(null);

    // Auto-fill product details when product is selected
    if (name === 'productId') {
      const product = products.find(p => p.id === parseInt(value));
      if (product) {
        setFormData(prev => ({
          ...prev,
          productId: value,
          productName: product.name,
          previousQuantity: product.currentStock || 0,
          warehouse: 'Main Warehouse' // You can get this from product if needed
        }));
      }
    }
  };

  // Calculate difference
  const difference = formData.countedQuantity 
    ? Number(formData.countedQuantity) - formData.previousQuantity 
    : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateAdjustmentForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setAlert({ 
        type: 'error', 
        message: 'Please fill in all required fields correctly' 
      });
      return;
    }

    setSubmitting(true);
    setAlert(null);

    try {
      await adjustmentService.create(formData);
      setAlert({ 
        type: 'success', 
        message: 'Adjustment created successfully!' 
      });
      
      // Navigate after short delay
      setTimeout(() => {
        navigate('/adjustments');
      }, 1500);
    } catch (error) {
      console.error('Failed to create adjustment:', error);
      setAlert({ 
        type: 'error', 
        message: error.message || 'Failed to create adjustment. Please try again.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="secondary" 
          onClick={() => navigate('/adjustments')}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          New Stock Adjustment
        </h1>
      </div>

      {/* Alert */}
      {alert && (
        <Alert 
          variant={alert.type} 
          message={alert.message} 
          onClose={() => setAlert(null)} 
        />
      )}

      {/* Form */}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product and Warehouse Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product <span className="text-red-500">*</span>
              </label>
              <select
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.productId ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select Product</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.sku}) - Stock: {p.currentStock || 0}
                  </option>
                ))}
              </select>
              {errors.productId && (
                <p className="mt-1 text-sm text-red-500">{errors.productId}</p>
              )}
            </div>

            <Select
              label="Warehouse"
              name="warehouse"
              value={formData.warehouse}
              onChange={handleChange}
              options={warehouses}
              disabled
              className="bg-gray-50"
            />
          </div>

          {/* Stock Quantities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Stock
              </label>
              <div className="px-3 py-2 bg-gray-100 rounded-lg font-semibold text-gray-900">
                {formData.previousQuantity}
              </div>
            </div>

            <Input
              label="Counted Quantity"
              name="countedQuantity"
              type="number"
              value={formData.countedQuantity}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              error={errors.countedQuantity}
              placeholder="Enter counted quantity"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difference
              </label>
              <div
                className={`px-3 py-2 rounded-lg font-semibold ${
                  difference > 0
                    ? 'bg-green-100 text-green-700'
                    : difference < 0
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {difference > 0 ? '+' : ''}
                {difference}
              </div>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.reason ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Damaged items, Physical count correction, Theft, Found items..."
              required
            />
            {errors.reason && (
              <p className="mt-1 text-sm text-red-500">{errors.reason}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Please provide a detailed explanation for the stock adjustment
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/adjustments')}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={submitting}
              disabled={submitting || !formData.productId || !formData.countedQuantity || !formData.reason}
            >
              {submitting ? 'Creating...' : 'Create Adjustment'}
            </Button>
          </div>
        </form>
      </Card>

      {/* Help Text */}
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Stock adjustments are used to correct discrepancies 
          between system stock and physical count. Once approved, the stock levels 
          will be updated automatically.
        </p>
      </div>
    </div>
  );
};

export default AdjustmentForm;