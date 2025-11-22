import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import Card from '../common/Card';
import Alert from '../common/Alert';
import { PageLoader } from '../common/Loader';
import productService from '../../services/productService';
import warehouseService from '../../services/warehouseService';
import { CATEGORIES, UNITS_OF_MEASURE } from '../../utils/constants';
import { generateSKU } from '../../utils/helpers';
import { validateProductForm } from '../../utils/validators';

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', sku: '', category: '', unit: '', initialStock: '',
    minStock: '', warehouse: '', price: '', description: ''
  });
  const [warehouses, setWarehouses] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchWarehouses();
    if (isEdit) fetchProduct();
  }, [id]);

  const fetchWarehouses = async () => {
    try {
      const response = await warehouseService.getAll();
      setWarehouses(response.data.map(w => ({ value: w.name, label: w.name })));
    } catch (error) {
      console.error('Failed to fetch warehouses:', error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await productService.getById(id);
      setFormData(response.data);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to load product' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleGenerateSKU = () => {
    const sku = generateSKU(formData.category, formData.name);
    setFormData(prev => ({ ...prev, sku }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateProductForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    try {
      if (isEdit) {
        await productService.update(id, formData);
        setAlert({ type: 'success', message: 'Product updated successfully!' });
      } else {
        await productService.create(formData);
        setAlert({ type: 'success', message: 'Product created successfully!' });
      }
      setTimeout(() => navigate('/products'), 1500);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to save product' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => navigate('/products')}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
      </div>

      {alert && <Alert variant={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Product Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} required />
            <div className="flex gap-2">
              <div className="flex-1">
                <Input label="SKU / Code" name="sku" value={formData.sku} onChange={handleChange} error={errors.sku} required />
              </div>
              <div className="flex items-end">
                <Button type="button" variant="secondary" onClick={handleGenerateSKU}>Generate</Button>
              </div>
            </div>
            <Select label="Category" name="category" value={formData.category} onChange={handleChange} options={CATEGORIES} error={errors.category} required />
            <Select label="Unit of Measure" name="unit" value={formData.unit} onChange={handleChange} options={UNITS_OF_MEASURE} error={errors.unit} required />
            <Select label="Warehouse" name="warehouse" value={formData.warehouse} onChange={handleChange} options={warehouses} />
            <Input label="Price" name="price" type="number" value={formData.price} onChange={handleChange} />
            {!isEdit && <Input label="Initial Stock" name="initialStock" type="number" value={formData.initialStock} onChange={handleChange} error={errors.initialStock} />}
            <Input label="Minimum Stock Level" name="minStock" type="number" value={formData.minStock} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="secondary" onClick={() => navigate('/products')}>Cancel</Button>
            <Button type="submit" loading={submitting}>{isEdit ? 'Update Product' : 'Create Product'}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProductForm;