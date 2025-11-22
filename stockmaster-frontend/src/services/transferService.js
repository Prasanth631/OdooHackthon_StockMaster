// src/services/transferService.js
import api from './api';

const transferService = {
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/transfers');
      let transfers = response.data;
      
      // Apply status filter if provided
      if (filters.status) {
        transfers = transfers.filter(t => 
          t.status.toLowerCase() === filters.status.toLowerCase()
        );
      }
      
      // Map backend response to frontend format
      const mapped = transfers.map(t => ({
        id: t.id,
        documentNumber: t.transferNumber,
        sourceWarehouse: t.sourceWarehouse?.name || t.sourceWarehouseName || 'N/A',
        destinationWarehouse: t.destinationWarehouse?.name || t.destinationWarehouseName || 'N/A',
        status: t.status.toLowerCase(),
        items: (t.lines || []).map(line => ({
          productId: line.productId,
          productName: line.productName,
          quantity: line.quantityTransferred,
          unit: line.product?.unitOfMeasure || 'pcs'
        })),
        createdAt: t.createdAt,
        completedAt: t.transferredDate,
        notes: t.notes || ''
      }));
      
      return { data: mapped };
    } catch (error) {
      console.error('Failed to fetch transfers:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/transfers/${id}`);
      const t = response.data;
      
      return {
        data: {
          id: t.id,
          documentNumber: t.transferNumber,
          sourceWarehouse: t.sourceWarehouse?.name || t.sourceWarehouseName || 'N/A',
          destinationWarehouse: t.destinationWarehouse?.name || t.destinationWarehouseName || 'N/A',
          status: t.status.toLowerCase(),
          items: (t.lines || []).map(line => ({
            productId: line.productId,
            productName: line.productName,
            quantity: line.quantityTransferred,
            unit: line.product?.unitOfMeasure || 'pcs'
          })),
          createdAt: t.createdAt,
          completedAt: t.transferredDate,
          notes: t.notes || ''
        }
      };
    } catch (error) {
      console.error('Failed to fetch transfer:', error);
      throw error;
    }
  },

  create: async (transferData) => {
    try {
      // Backend expects Transfer entity structure
      const payload = {
        sourceWarehouse: { id: 1 }, // You'll need to get actual warehouse IDs
        sourceLocation: { id: 1 },
        destinationWarehouse: { id: 2 },
        destinationLocation: { id: 2 },
        notes: transferData.notes || '',
        lines: transferData.items.map(item => ({
          product: { id: item.productId },
          quantity: item.quantity,
          quantityTransferred: item.quantity
        }))
      };
      
      const response = await api.post('/transfers', payload);
      return response;
    } catch (error) {
      console.error('Failed to create transfer:', error);
      throw error;
    }
  },

  update: async (id, transferData) => {
    try {
      const response = await api.put(`/transfers/${id}`, transferData);
      return response;
    } catch (error) {
      console.error('Failed to update transfer:', error);
      throw error;
    }
  },

  complete: async (id) => {
    try {
      // Get current user ID from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id || 1;
      
      const response = await api.post(`/transfers/${id}/validate?userId=${userId}`);
      return response;
    } catch (error) {
      console.error('Failed to complete transfer:', error);
      throw error;
    }
  },

  getScheduled: async () => {
    try {
      const response = await api.get('/transfers');
      const scheduled = response.data.filter(t => 
        t.status === 'WAITING' || t.status === 'READY' || t.status === 'DRAFT'
      );
      return { data: scheduled };
    } catch (error) {
      console.error('Failed to fetch scheduled transfers:', error);
      return { data: [] };
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/transfers/${id}`);
      return response;
    } catch (error) {
      console.error('Failed to delete transfer:', error);
      throw error;
    }
  }
};

export default transferService;