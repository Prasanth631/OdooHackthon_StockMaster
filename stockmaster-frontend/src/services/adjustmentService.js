// src/services/adjustmentService.js
import api from './api';

const adjustmentService = {
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/adjustments');
      let adjustments = response.data;
      
      // Apply status filter if provided
      if (filters.status) {
        adjustments = adjustments.filter(a => 
          a.status.toLowerCase() === filters.status.toLowerCase()
        );
      }
      
      // Map backend response to frontend format
      const mapped = adjustments.map(a => {
        const firstLine = a.lines?.[0] || {};
        return {
          id: a.id,
          documentNumber: a.adjustmentNumber,
          productId: firstLine.productId,
          productName: firstLine.productName || 'N/A',
          warehouse: a.warehouse?.name || a.warehouseName || 'N/A',
          previousQuantity: firstLine.systemQuantity || 0,
          countedQuantity: firstLine.countedQuantity || 0,
          difference: firstLine.differenceQuantity || 0,
          reason: a.reason || '',
          status: a.status.toLowerCase(),
          createdAt: a.createdAt,
          approvedAt: a.adjustmentDate,
          approvedBy: a.validatedBy?.fullName || ''
        };
      });
      
      return { data: mapped };
    } catch (error) {
      console.error('Failed to fetch adjustments:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/adjustments/${id}`);
      const a = response.data;
      const firstLine = a.lines?.[0] || {};
      
      return {
        data: {
          id: a.id,
          documentNumber: a.adjustmentNumber,
          productId: firstLine.productId,
          productName: firstLine.productName || 'N/A',
          warehouse: a.warehouse?.name || a.warehouseName || 'N/A',
          previousQuantity: firstLine.systemQuantity || 0,
          countedQuantity: firstLine.countedQuantity || 0,
          difference: firstLine.differenceQuantity || 0,
          reason: a.reason || '',
          status: a.status.toLowerCase(),
          createdAt: a.createdAt,
          approvedAt: a.adjustmentDate,
          approvedBy: a.validatedBy?.fullName || ''
        }
      };
    } catch (error) {
      console.error('Failed to fetch adjustment:', error);
      throw error;
    }
  },

  create: async (adjustmentData) => {
    try {
      // Backend expects Adjustment entity structure
      const payload = {
        warehouse: { id: 1 }, // You'll need to get actual warehouse ID
        location: null,
        type: 'PHYSICAL_COUNT', // or OTHER, DAMAGE, LOSS, FOUND
        reason: adjustmentData.reason,
        lines: [{
          product: { id: adjustmentData.productId },
          systemQuantity: adjustmentData.previousQuantity,
          countedQuantity: adjustmentData.countedQuantity,
          differenceQuantity: adjustmentData.countedQuantity - adjustmentData.previousQuantity
        }]
      };
      
      const response = await api.post('/adjustments', payload);
      return response;
    } catch (error) {
      console.error('Failed to create adjustment:', error);
      throw error;
    }
  },

  approve: async (id, approvedBy) => {
    try {
      // Get current user ID from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id || 1;
      
      const response = await api.post(`/adjustments/${id}/validate?userId=${userId}`);
      return response;
    } catch (error) {
      console.error('Failed to approve adjustment:', error);
      throw error;
    }
  },

  cancel: async (id) => {
    try {
      // Backend doesn't have a cancel endpoint, use delete
      const response = await api.delete(`/adjustments/${id}`);
      return response;
    } catch (error) {
      console.error('Failed to cancel adjustment:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/adjustments/${id}`);
      return response;
    } catch (error) {
      console.error('Failed to delete adjustment:', error);
      throw error;
    }
  }
};

export default adjustmentService;