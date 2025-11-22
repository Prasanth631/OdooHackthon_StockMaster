import api from './api';

const transferService = {
  getAll: async (filters = {}) => {
    try {
      let url = '/transfers';
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
      throw new Error(error.message || 'Failed to fetch transfers');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/transfers/${id}`);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch transfer');
    }
  },

  create: async (transferData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      const payload = {
        sourceWarehouse: {
          id: transferData.sourceWarehouseId || 1
        },
        sourceLocation: transferData.sourceLocationId ? {
          id: transferData.sourceLocationId
        } : null,
        destinationWarehouse: {
          id: transferData.destinationWarehouseId || 2
        },
        destinationLocation: transferData.destinationLocationId ? {
          id: transferData.destinationLocationId
        } : null,
        scheduledDate: transferData.scheduledDate || new Date().toISOString(),
        notes: transferData.notes || '',
        createdBy: {
          id: user?.id || 1
        },
        lines: transferData.items.map(item => ({
          product: {
            id: item.productId
          },
          quantity: parseFloat(item.quantity),
          quantityTransferred: 0,
          batchNumber: item.batchNumber || '',
          serialNumber: item.serialNumber || '',
          notes: item.notes || ''
        }))
      };
      
      const response = await api.post('/transfers', payload);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to create transfer');
    }
  },

  complete: async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await api.post(`/transfers/${id}/validate?userId=${user?.id || 1}`);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to complete transfer');
    }
  },

  getScheduled: async () => {
    try {
      const response = await api.get('/transfers');
      const scheduled = response.data.filter(t => 
        t.status === 'WAITING' || t.status === 'READY'
      );
      return { data: scheduled };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch scheduled transfers');
    }
  }
};

export default transferService;