// src/services/warehouseService.js
import api from './api';

const warehouseService = {
  getAll: async () => {
    try {
      const response = await api.get('/warehouses');
      
      // Map backend response to frontend format
      const mapped = response.data.map(w => ({
        id: w.id,
        name: w.name,
        address: `${w.address || ''}, ${w.city || ''}, ${w.state || ''}`.trim(),
        code: w.code,
        city: w.city,
        state: w.state,
        zipCode: w.zipCode,
        country: w.country,
        isActive: w.active
      }));
      
      return { data: mapped };
    } catch (error) {
      console.error('Failed to fetch warehouses:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/warehouses/${id}`);
      const w = response.data;
      
      return {
        data: {
          id: w.id,
          name: w.name,
          address: w.address,
          code: w.code,
          city: w.city,
          state: w.state,
          zipCode: w.zipCode,
          country: w.country,
          isActive: w.active
        }
      };
    } catch (error) {
      console.error('Failed to fetch warehouse:', error);
      throw error;
    }
  },

  create: async (warehouseData) => {
    try {
      const payload = {
        name: warehouseData.name,
        code: `WH-${Date.now().toString().slice(-6)}`, // Generate code
        address: warehouseData.address,
        city: warehouseData.city || '',
        state: warehouseData.state || '',
        zipCode: warehouseData.zipCode || '',
        country: warehouseData.country || 'USA',
        active: true
      };
      
      const response = await api.post('/warehouses', payload);
      return response;
    } catch (error) {
      console.error('Failed to create warehouse:', error);
      throw error;
    }
  },

  update: async (id, warehouseData) => {
    try {
      const payload = {
        name: warehouseData.name,
        address: warehouseData.address,
        city: warehouseData.city || '',
        state: warehouseData.state || '',
        zipCode: warehouseData.zipCode || '',
        country: warehouseData.country || 'USA',
        active: warehouseData.isActive !== undefined ? warehouseData.isActive : true
      };
      
      const response = await api.put(`/warehouses/${id}`, payload);
      return response;
    } catch (error) {
      console.error('Failed to update warehouse:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/warehouses/${id}`);
      return response;
    } catch (error) {
      console.error('Failed to delete warehouse:', error);
      throw error;
    }
  }
};

export default warehouseService;