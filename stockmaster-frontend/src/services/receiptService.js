import api from './api';

const receiptService = {
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/receipts');
      let receipts = response.data || [];
      
      if (filters.status) {
        receipts = receipts.filter(r => 
          r.status?.toLowerCase() === filters.status.toLowerCase()
        );
      }
      
      return { 
        data: receipts.map(r => ({
          ...r,
          supplier: r.supplierName,
          warehouse: r.warehouse?.name || 'N/A',
          items: r.lines || [],
          status: r.status?.toLowerCase() || 'draft',
          documentNumber: r.receiptNumber,
          validatedAt: r.receivedDate
        }))
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch receipts');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/receipts/${id}`);
      const receipt = response.data;
      
      return { 
        data: {
          ...receipt,
          supplier: receipt.supplierName,
          warehouse: receipt.warehouse?.name || 'N/A',
          items: (receipt.lines || []).map(line => ({
            productId: line.product?.id,
            productName: line.product?.name,
            quantity: line.quantityReceived || line.quantityOrdered,
            unit: line.product?.unitOfMeasure || 'pcs'
          })),
          status: receipt.status?.toLowerCase() || 'draft',
          documentNumber: receipt.receiptNumber,
          validatedAt: receipt.receivedDate
        }
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch receipt');
    }
  },

  create: async (receiptData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      const warehouseResponse = await api.get('/warehouses');
      const warehouses = warehouseResponse.data || [];
      
      let warehouseId = 1;
      if (receiptData.warehouse) {
        const foundWarehouse = warehouses.find(w => w.name === receiptData.warehouse);
        if (foundWarehouse) {
          warehouseId = foundWarehouse.id;
        }
      } else if (warehouses.length > 0) {
        warehouseId = warehouses[0].id;
      }

      const lines = receiptData.items.map(item => ({
        product: {
          id: parseInt(item.productId)
        },
        quantityOrdered: parseFloat(item.quantity),
        quantityReceived: 0,
        unitPrice: parseFloat(item.unitPrice || 0),
        batchNumber: item.batchNumber || '',
        serialNumber: item.serialNumber || '',
        notes: item.notes || ''
      }));

      const payload = {
        supplierName: receiptData.supplier,
        supplierReference: receiptData.supplierReference || '',
        warehouse: {
          id: warehouseId
        },
        status: 'DRAFT',
        scheduledDate: new Date().toISOString(),
        notes: receiptData.notes || '',
        createdBy: {
          id: user?.id || 1
        },
        lines: lines
      };
      
      const response = await api.post('/receipts', payload);
      return { data: response.data };
    } catch (error) {
      console.error('Receipt creation error:', error);
      throw new Error(error.message || 'Failed to create receipt');
    }
  },

  validate: async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await api.post(`/receipts/${id}/validate?userId=${user?.id || 1}`);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to validate receipt');
    }
  },

  cancel: async (id) => {
    try {
      await api.delete(`/receipts/${id}`);
      return { data: { success: true } };
    } catch (error) {
      throw new Error(error.message || 'Failed to cancel receipt');
    }
  },

  getPending: async () => {
    try {
      const response = await api.get('/receipts');
      const pending = (response.data || []).filter(r => 
        r.status === 'WAITING' || r.status === 'DRAFT' || r.status === 'READY'
      );
      return { data: pending };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch pending receipts');
    }
  }
};

export default receiptService;