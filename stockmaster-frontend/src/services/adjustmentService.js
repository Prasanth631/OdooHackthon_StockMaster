import api from './api';

const adjustmentService = {
  getAll: async (filters = {}) => {
    try {
      let url = '/adjustments';
      const params = new URLSearchParams();
      
      if (filters.status) {
        params.append('status', filters.status.toUpperCase());
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await api.get(url);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch adjustments');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/adjustments/${id}`);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch adjustment');
    }
  },

  create: async (adjustmentData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      const payload = {
        warehouse: {
          id: adjustmentData.warehouseId || 1
        },
        location: adjustmentData.locationId ? {
          id: adjustmentData.locationId
        } : null,
        type: adjustmentData.type || 'PHYSICAL_COUNT',
        reason: adjustmentData.reason,
        adjustmentDate: new Date().toISOString(),
        notes: adjustmentData.notes || '',
        createdBy: {
          id: user?.id || 1
        },
        lines: [{
          product: {
            id: adjustmentData.productId
          },
          systemQuantity: parseFloat(adjustmentData.previousQuantity),
          countedQuantity: parseFloat(adjustmentData.countedQuantity),
          differenceQuantity: parseFloat(adjustmentData.countedQuantity) - parseFloat(adjustmentData.previousQuantity),
          batchNumber: adjustmentData.batchNumber || '',
          serialNumber: adjustmentData.serialNumber || '',
          notes: adjustmentData.notes || ''
        }]
      };
      
      const response = await api.post('/adjustments', payload);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to create adjustment');
    }
  },

  approve: async (id, approvedBy) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await api.post(`/adjustments/${id}/validate?userId=${user?.id || 1}`);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to approve adjustment');
    }
  },

  cancel: async (id) => {
    try {
      await api.delete(`/adjustments/${id}`);
      return { data: { success: true } };
    } catch (error) {
      throw new Error(error.message || 'Failed to cancel adjustment');
    }
  }
};

export default adjustmentService;