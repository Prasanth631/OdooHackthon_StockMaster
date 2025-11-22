import api from './api';

const deliveryService = {
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/deliveries');
      let deliveries = response.data || [];
      
      if (filters.status) {
        deliveries = deliveries.filter(d => 
          d.status?.toLowerCase() === filters.status.toLowerCase()
        );
      }
      
      return { 
        data: deliveries.map(d => ({
          ...d,
          customer: d.customerName,
          warehouse: d.warehouse?.name || 'N/A',
          items: d.lines || [],
          status: d.status?.toLowerCase() || 'draft',
          documentNumber: d.deliveryNumber,
          validatedAt: d.deliveredDate
        }))
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch deliveries');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/deliveries/${id}`);
      const delivery = response.data;
      
      return { 
        data: {
          ...delivery,
          customer: delivery.customerName,
          warehouse: delivery.warehouse?.name || 'N/A',
          items: (delivery.lines || []).map(line => ({
            productId: line.product?.id,
            productName: line.product?.name,
            quantity: line.quantityDelivered || line.quantityOrdered,
            unit: line.product?.unitOfMeasure || 'pcs'
          })),
          status: delivery.status?.toLowerCase() || 'draft',
          documentNumber: delivery.deliveryNumber,
          validatedAt: delivery.deliveredDate
        }
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch delivery');
    }
  },

  create: async (deliveryData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const warehouses = await api.get('/warehouses');
      const warehouse = warehouses.data.find(w => 
        w.name === deliveryData.warehouse || w.id === deliveryData.warehouseId
      ) || warehouses.data[0];
      
      const payload = {
        customerName: deliveryData.customer,
        customerReference: deliveryData.customerReference || '',
        shippingAddress: deliveryData.shippingAddress || '',
        warehouse: {
          id: warehouse.id
        },
        scheduledDate: new Date().toISOString(),
        notes: deliveryData.notes || '',
        createdBy: {
          id: user?.id || 1
        },
        lines: deliveryData.items.map(item => ({
          product: {
            id: parseInt(item.productId)
          },
          quantityOrdered: parseFloat(item.quantity),
          quantityDelivered: parseFloat(item.quantity),
          unitPrice: parseFloat(item.unitPrice || 0),
          notes: item.notes || ''
        }))
      };
      
      const response = await api.post('/deliveries', payload);
      return { data: response.data };
    } catch (error) {
      console.error('Delivery creation error:', error);
      throw new Error(error.message || 'Failed to create delivery');
    }
  },

  updateStatus: async (id, status) => {
    try {
      const delivery = await api.get(`/deliveries/${id}`);
      delivery.data.status = status.toUpperCase();
      const response = await api.put(`/deliveries/${id}`, delivery.data);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to update delivery status');
    }
  },

  validate: async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await api.post(`/deliveries/${id}/validate?userId=${user?.id || 1}`);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to validate delivery');
    }
  },

  getPending: async () => {
    try {
      const response = await api.get('/deliveries');
      const pending = (response.data || []).filter(d => 
        d.status !== 'DONE' && d.status !== 'CANCELLED'
      );
      return { data: pending };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch pending deliveries');
    }
  }
};

export default deliveryService;