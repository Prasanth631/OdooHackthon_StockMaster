import api from './api';

const warehouseService = {
  getAll: async () => {
    try {
      const response = await api.get('/warehouses');
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch warehouses');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/warehouses/${id}`);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch warehouse');
    }
  },

  create: async (warehouseData) => {
    try {
      const payload = {
        name: warehouseData.name,
        code: warehouseData.code || warehouseData.name.substring(0, 3).toUpperCase() + Date.now().toString().slice(-4),
        address: warehouseData.address || '',
        city: warehouseData.city || '',
        state: warehouseData.state || '',
        zipCode: warehouseData.zipCode || '',
        country: warehouseData.country || '',
        active: true
      };
      
      const response = await api.post('/warehouses', payload);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to create warehouse');
    }
  },

  update: async (id, warehouseData) => {
    try {
      const payload = {
        name: warehouseData.name,
        address: warehouseData.address || '',
        city: warehouseData.city || '',
        state: warehouseData.state || '',
        zipCode: warehouseData.zipCode || '',
        country: warehouseData.country || '',
        active: warehouseData.active !== undefined ? warehouseData.active : true
      };
      
      const response = await api.put(`/warehouses/${id}`, payload);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to update warehouse');
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`/warehouses/${id}`);
      return { data: { success: true } };
    } catch (error) {
      throw new Error(error.message || 'Failed to delete warehouse');
    }
  }
};

export default warehouseService;