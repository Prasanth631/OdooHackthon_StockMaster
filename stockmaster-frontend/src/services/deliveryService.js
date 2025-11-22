import productService from './productService';
import { generateDocumentNumber } from '../utils/helpers';

let deliveries = [
  {
    id: 1,
    documentNumber: 'DEL-00000001',
    customer: 'ABC Construction',
    warehouse: 'Main Warehouse',
    status: 'done',
    items: [{ productId: 1, productName: 'Steel Rods', quantity: 50, unit: 'kg' }],
    createdAt: '2024-01-16T14:00:00Z',
    validatedAt: '2024-01-16T15:30:00Z',
    notes: 'Urgent delivery'
  },
  {
    id: 2,
    documentNumber: 'DEL-00000002',
    customer: 'XYZ Office Solutions',
    warehouse: 'Main Warehouse',
    status: 'ready',
    items: [{ productId: 2, productName: 'Office Chair', quantity: 10, unit: 'pcs' }],
    createdAt: '2024-01-19T10:00:00Z',
    validatedAt: null,
    notes: 'Pack with care'
  }
];

const deliveryService = {
  getAll: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...deliveries];
        if (filters.status) {
          filtered = filtered.filter(d => d.status === filters.status);
        }
        resolve({ data: filtered });
      }, 300);
    });
  },

  getById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const delivery = deliveries.find(d => d.id === parseInt(id));
        if (delivery) resolve({ data: delivery });
        else reject(new Error('Delivery not found'));
      }, 200);
    });
  },

  create: async (deliveryData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDelivery = {
          id: deliveries.length + 1,
          documentNumber: generateDocumentNumber('delivery'),
          ...deliveryData,
          status: 'draft',
          createdAt: new Date().toISOString(),
          validatedAt: null
        };
        deliveries.push(newDelivery);
        resolve({ data: newDelivery });
      }, 300);
    });
  },

  update: async (id, deliveryData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = deliveries.findIndex(d => d.id === parseInt(id));
        if (index !== -1) {
          deliveries[index] = { ...deliveries[index], ...deliveryData };
          resolve({ data: deliveries[index] });
        }
      }, 300);
    });
  },

  updateStatus: async (id, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const delivery = deliveries.find(d => d.id === parseInt(id));
        if (delivery) {
          delivery.status = status;
          resolve({ data: delivery });
        }
      }, 300);
    });
  },

  validate: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const delivery = deliveries.find(d => d.id === parseInt(id));
        if (delivery) {
          delivery.status = 'done';
          delivery.validatedAt = new Date().toISOString();
          delivery.items.forEach(item => {
            productService.updateStock(item.productId, -item.quantity);
          });
          resolve({ data: delivery });
        }
      }, 300);
    });
  },

  getPending: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pending = deliveries.filter(d => d.status !== 'done' && d.status !== 'canceled');
        resolve({ data: pending });
      }, 200);
    });
  }
};

export default deliveryService;