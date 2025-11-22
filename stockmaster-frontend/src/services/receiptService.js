// src/services/receiptService.js
import api from './api';

const receiptService = {
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/receipts');
      let receipts = response.data;
      
      // Apply status filter if provided
      if (filters.status) {
        receipts = receipts.filter(r => 
          r.status.toLowerCase() === filters.status.toLowerCase()
        );
      }
      
      // Map backend response to frontend format
      const mapped = receipts.map(r => ({
        id: r.id,
        documentNumber: r.receiptNumber,
        supplier: r.supplierName,
        warehouse: r.warehouse?.name || r.warehouseName || 'N/A',
        status: r.status.toLowerCase(),
        items: r.lines || [],
        createdAt: r.createdAt,
        validatedAt: r.receivedDate,
        notes: r.notes || ''
      }));
      
      return { data: mapped };
    } catch (error) {
      console.error('Failed to fetch receipts:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/receipts/${id}`);
      const r = response.data;
      
      return {
        data: {
          id: r.id,
          documentNumber: r.receiptNumber,
          supplier: r.supplierName,
          warehouse: r.warehouse?.name || r.warehouseName || 'N/A',
          status: r.status.toLowerCase(),
          items: (r.lines || []).map(line => ({
            productId: line.productId,
            productName: line.productName,
            quantity: line.quantityReceived,
            unit: line.product?.unitOfMeasure || 'pcs'
          })),
          createdAt: r.createdAt,
          validatedAt: r.receivedDate,
          notes: r.notes || ''
        }
      };
    } catch (error) {
      console.error('Failed to fetch receipt:', error);
      throw error;
    }
  },

  create: async (receiptData) => {
    try {
      // Create receipt with lines - backend expects Receipt entity structure
      const payload = {
        supplierName: receiptData.supplier,
        warehouse: { id: 1 }, // You'll need to get actual warehouse ID
        notes: receiptData.notes || '',
        lines: receiptData.items.map(item => ({
          product: { id: item.productId },
          quantityOrdered: item.quantity,
          quantityReceived: item.quantity,
          unitPrice: 0
        }))
      };
      
      const response = await api.post('/receipts', payload);
      return response;
    } catch (error) {
      console.error('Failed to create receipt:', error);
      throw error;
    }
  },

  validate: async (id) => {
    try {
      // Get current user ID from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id || 1;
      
      const response = await api.post(`/receipts/${id}/validate?userId=${userId}`);
      return response;
    } catch (error) {
      console.error('Failed to validate receipt:', error);
      throw error;
    }
  },

  cancel: async (id) => {
    try {
      // Backend doesn't have a cancel endpoint, use delete
      const response = await api.delete(`/receipts/${id}`);
      return response;
    } catch (error) {
      console.error('Failed to cancel receipt:', error);
      throw error;
    }
  },

  getPending: async () => {
    try {
      const response = await api.get('/receipts');
      const pending = response.data.filter(r => 
        r.status === 'WAITING' || r.status === 'DRAFT'
      );
      return { data: pending };
    } catch (error) {
      console.error('Failed to fetch pending receipts:', error);
      return { data: [] };
    }
  }
};

export default receiptService;