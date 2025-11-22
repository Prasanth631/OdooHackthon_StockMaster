import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Select from '../../common/Select';
import Card from '../../common/Card';
import Alert from '../../common/Alert';
import deliveryService from '../../../services/deliveryService';
import productService from '../../../services/productService';
import warehouseService from '../../../services/warehouseService';

const DeliveryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer: '', warehouse: '', notes: '', items: [{ productId: '', productName: '', quantity: '', unit: '', available: 0 }]
  });
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

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
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    if (field === 'productId') {
      const product = products.find(p => p.id === parseInt(value));
      if (product) {
        newItems[index].productName = product.name;
        newItems[index].unit = product.unit;
        newItems[index].available = product.stock;
      }
    }
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev, items: [...prev.items, { productId: '', productName: '', quantity: '', unit: '', available: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length === 1) return;
    setFormData(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer) {
      setAlert({ type: 'error', message: 'Customer is required' });
      return;
    }
    const validItems = formData.items.filter(item => item.productId && item.quantity > 0);
    if (validItems.length === 0) {
      setAlert({ type: 'error', message: 'At least one valid item is required' });
      return;
    }
    // Check stock availability
    for (const item of validItems) {
      if (Number(item.quantity) > item.available) {
        setAlert({ type: 'error', message: `Insufficient stock for ${item.productName}. Available: ${item.available}` });
        return;
      }
    }

    setSubmitting(true);
    try {
      await deliveryService.create({ ...formData, items: validItems });
      setAlert({ type: 'success', message: 'Delivery created successfully!' });
      setTimeout(() => navigate('/deliveries'), 1500);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to create delivery' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => navigate('/deliveries')}><ArrowLeft size={20} /></Button>
        <h1 className="text-2xl font-bold text-gray-900">New Delivery</h1>
      </div>

      {alert && <Alert variant={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Delivery Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Customer" name="customer" value={formData.customer} onChange={handleChange} required />
            <Select label="Warehouse" name="warehouse" value={formData.warehouse} onChange={handleChange} options={warehouses} />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Items</h3>
            <Button type="button" variant="outline" onClick={addItem}><Plus size={18} /> Add Item</Button>
          </div>
          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={index} className="flex gap-4 items-end p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                  <select value={item.productId} onChange={(e) => handleItemChange(index, 'productId', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="">Select Product</option>
                    {products.map(p => (<option key={p.id} value={p.id}>{p.name} (Stock: {p.stock})</option>))}
                  </select>
                </div>
                <div className="w-32">
                  <Input label="Quantity" type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} min="1" max={item.available} />
                </div>
                <div className="w-24"><Input label="Unit" value={item.unit} disabled /></div>
                <Button type="button" variant="danger" onClick={() => removeItem(index)} disabled={formData.items.length === 1}><Trash2 size={18} /></Button>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
            <Button type="button" variant="secondary" onClick={() => navigate('/deliveries')}>Cancel</Button>
            <Button type="submit" loading={submitting}>Create Delivery</Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default DeliveryForm;