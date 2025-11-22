import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Warehouse } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import Modal from '../common/Modal';
import Alert from '../common/Alert';
import { PageLoader } from '../common/Loader';
import warehouseService from '../../services/warehouseService';

const WarehouseSettings = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [formData, setFormData] = useState({ name: '', address: '' });
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => { fetchWarehouses(); }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await warehouseService.getAll();
      setWarehouses(response.data);
    } catch (error) {
      console.error('Failed to fetch warehouses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (warehouse = null) => {
    if (warehouse) {
      setEditingWarehouse(warehouse);
      setFormData({ name: warehouse.name, address: warehouse.address });
    } else {
      setEditingWarehouse(null);
      setFormData({ name: '', address: '' });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      setAlert({ type: 'error', message: 'Warehouse name is required' });
      return;
    }

    setSubmitting(true);
    try {
      if (editingWarehouse) {
        await warehouseService.update(editingWarehouse.id, formData);
        setAlert({ type: 'success', message: 'Warehouse updated!' });
      } else {
        await warehouseService.create(formData);
        setAlert({ type: 'success', message: 'Warehouse created!' });
      }
      fetchWarehouses();
      setShowModal(false);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to save warehouse' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this warehouse?')) return;
    try {
      await warehouseService.delete(id);
      setAlert({ type: 'success', message: 'Warehouse deleted!' });
      fetchWarehouses();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to delete warehouse' });
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage warehouses and system settings</p>
        </div>
        <Button onClick={() => handleOpenModal()}><Plus size={20} /> Add Warehouse</Button>
      </div>

      {alert && <Alert variant={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <Card title="Warehouses">
        <div className="space-y-4">
          {warehouses.map((warehouse) => (
            <div key={warehouse.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg"><Warehouse className="text-blue-600" size={24} /></div>
                <div>
                  <p className="font-semibold">{warehouse.name}</p>
                  <p className="text-sm text-gray-500">{warehouse.address}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleOpenModal(warehouse)}><Edit size={16} /></Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(warehouse.id)}><Trash2 size={16} /></Button>
              </div>
            </div>
          ))}
          {warehouses.length === 0 && <p className="text-center text-gray-500 py-4">No warehouses configured</p>}
        </div>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingWarehouse ? 'Edit Warehouse' : 'Add Warehouse'}>
        <form onSubmit={handleSubmit}>
          <Input label="Warehouse Name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <Input label="Address" name="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" loading={submitting}>{editingWarehouse ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default WarehouseSettings;