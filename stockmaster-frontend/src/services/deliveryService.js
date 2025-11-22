// src/services/deliveryService.js
import api from './api';

const deliveryService = {
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/deliveries');
      let deliveries = response.data;
      
      // Apply status filter if provided
      if (filters.status) {
        deliveries = deliveries.filter(d => 
          d.status.toLowerCase() === filters.status.toLowerCase()
        );
      }
      
      // Map backend response to frontend format
      const mapped = deliveries.map(d => ({
        id: d.id,
        documentNumber: d.deliveryNumber,
        customer: d.customerName,
        warehouse: d.warehouse?.name || d.warehouseName || 'N/A',
        status: d.status.toLowerCase(),
        items: (d.lines || []).map(line => ({
          productId: line.productId,
          productName: line.productName,
          quantity: line.quantityDelivered,
          unit: line.product?.unitOfMeasure || 'pcs'
        })),
        createdAt: d.createdAt,
        validatedAt: d.deliveredDate,
        notes: d.notes || ''
      }));
      
      return { data: mapped };
    } catch (error) {
      console.error('Failed to fetch deliveries:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/deliveries/${id}`);
      const d = response.data;
      
      return {
        data: {
          id: d.id,
          documentNumber: d.deliveryNumber,
          customer: d.customerName,
          warehouse: d.warehouse?.name || d.warehouseName || 'N/A',
          status: d.status.toLowerCase(),
          items: (d.lines || []).map(line => ({
            productId: line.productId,
            productName: line.productName,
            quantity: line.quantityDelivered,
            unit: line.product?.unitOfMeasure || 'pcs'
          })),
          createdAt: d.createdAt,
          validatedAt: d.deliveredDate,
          notes: d.notes || ''
        }
      };
    } catch (error) {
      console.error('Failed to fetch delivery:', error);
      throw error;
    }
  },

  create: async (deliveryData) => {
    try {
      // Backend expects Delivery entity structure
      const payload = {
        customerName: deliveryData.customer,
        customerReference: '',
        shippingAddress: '',
        warehouse: { id: 1 }, // You'll need to get actual warehouse ID
        location: null,
        notes: deliveryData.notes || '',
        lines: deliveryData.items.map(item => ({
          product: { id: item.productId },
          quantityOrdered: item.quantity,
          quantityDelivered: item.quantity,
          unitPrice: 0
        }))
      };
      
      const response = await api.post('/deliveries', payload);
      return response;
    } catch (error) {
      console.error('Failed to create delivery:', error);
      throw error;
    }
  },

  update: async (id, deliveryData) => {
    try {
      const response = await api.put(`/deliveries/${id}`, deliveryData);
      return response;
    } catch (error) {
      console.error('Failed to update delivery:', error);
      throw error;
    }
  },

  updateStatus: async (id, status) => {
    try {
      // For simple status updates, you might need to fetch then update
      const delivery = await api.get(`/deliveries/${id}`);
      delivery.data.status = status.toUpperCase();
      const response = await api.put(`/deliveries/${id}`, delivery.data);
      return response;
    } catch (error) {
      console.error('Failed to update delivery status:', error);
      throw error;
    }
  },

  validate: async (id) => {
    try {
      // Get current user ID from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id || 1;
      
      const response = await api.post(`/deliveries/${id}/validate?userId=${userId}`);
      return response;
    } catch (error) {
      console.error('Failed to validate delivery:', error);
      throw error;
    }
  },

  getPending: async () => {
    try {
      const response = await api.get('/deliveries');
      const pending = response.data.filter(d => 
        d.status === 'WAITING' || d.status === 'READY' || d.status === 'DRAFT'
      );
      return { data: pending };
    } catch (error) {
      console.error('Failed to fetch pending deliveries:', error);
      return { data: [] };
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/deliveries/${id}`);
      return response;
    } catch (error) {
      console.error('Failed to delete delivery:', error);
      throw error;
    }
  }
};

export default deliveryService;