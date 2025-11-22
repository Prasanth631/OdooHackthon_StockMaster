import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Select from '../../common/Select';
import Card from '../../common/Card';
import Alert from '../../common/Alert';
import adjustmentService from '../../../services/adjustmentService';
import productService from '../../../services/productService';
import warehouseService from '../../../services/warehouseService';

const AdjustmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productId: '', productName: '', warehouse: '', previousQuantity: 0, countedQuantity: '', reason: ''
  });
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [prodRes, whRes] = await Promise.all([productService.getAll(), warehouseService.getAll()]);
      setProducts(prodRes.data);
      setWarehouses(whRes.data.map(w => ({ value: w.name, label: w.name })));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'productId') {
      const product = products.find(p => p.id === parseInt(value));
      if (product) {
        setFormData(prev => ({
          ...prev, productId: value, productName: product.name,
          previousQuantity: product.stock, warehouse: product.warehouse
        }));
      }
    }
  };

  const difference = formData.countedQuantity ? Number(formData.countedQuantity) - formData.previousQuantity : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.productId || !formData.countedQuantity || !formData.reason) {
      setAlert({ type: 'error', message: 'All fields are required' });
      return;
    }

    setSubmitting(true);
    try {
      await adjustmentService.create(formData);
      setAlert({ type: 'success', message: 'Adjustment created successfully!' });
      setTimeout(() => navigate('/adjustments'), 1500);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to create adjustment' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => navigate('/adjustments')}><ArrowLeft size={20} /></Button>
        <h1 className="text-2xl font-bold text-gray-900">New Stock Adjustment</h1>
      </div>

      {alert && <Alert variant={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product *</label>
              <select name="productId" value={formData.productId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                <option value="">Select Product</option>
                {products.map(p => (<option key={p.id} value={p.id}>{p.name} ({p.sku})</option>))}
              </select>
            </div>
            <Select label="Warehouse" name="warehouse" value={formData.warehouse} onChange={handleChange} options={warehouses} disabled />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
              <div className="px-3 py-2 bg-gray-100 rounded-lg font-semibold">{formData.previousQuantity}</div>
            </div>
            <Input label="Counted Quantity" name="countedQuantity" type="number" value={formData.countedQuantity} onChange={handleChange} min="0" required />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difference</label>
              <div className={`px-3 py-2 rounded-lg font-semibold ${difference > 0 ? 'bg-green-100 text-green-700' : difference < 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100'}`}>
                {difference > 0 ? '+' : ''}{difference}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason *</label>
            <textarea name="reason" value={formData.reason} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., Damaged items, Count correction, Theft..." required />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="secondary" onClick={() => navigate('/adjustments')}>Cancel</Button>
            <Button type="submit" loading={submitting}>Create Adjustment</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdjustmentForm;