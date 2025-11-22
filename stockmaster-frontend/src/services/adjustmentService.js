import productService from './productService';
import { generateDocumentNumber } from '../utils/helpers';

let adjustments = [
  {
    id: 1,
    documentNumber: 'ADJ-00000001',
    productId: 1,
    productName: 'Steel Rods',
    warehouse: 'Main Warehouse',
    previousQuantity: 503,
    countedQuantity: 500,
    difference: -3,
    reason: 'Damaged items',
    status: 'done',
    createdAt: '2024-01-18T16:00:00Z',
    approvedAt: '2024-01-18T17:00:00Z',
    approvedBy: 'Admin'
  }
];

const adjustmentService = {
  getAll: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...adjustments];
        if (filters.status) {
          filtered = filtered.filter(a => a.status === filters.status);
        }
        resolve({ data: filtered });
      }, 300);
    });
  },

  getById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const adjustment = adjustments.find(a => a.id === parseInt(id));
        if (adjustment) resolve({ data: adjustment });
        else reject(new Error('Adjustment not found'));
      }, 200);
    });
  },

  create: async (adjustmentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAdjustment = {
          id: adjustments.length + 1,
          documentNumber: generateDocumentNumber('adjustment'),
          ...adjustmentData,
          difference: adjustmentData.countedQuantity - adjustmentData.previousQuantity,
          status: 'draft',
          createdAt: new Date().toISOString(),
          approvedAt: null,
          approvedBy: null
        };
        adjustments.push(newAdjustment);
        resolve({ data: newAdjustment });
      }, 300);
    });
  },

  approve: async (id, approvedBy) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const adjustment = adjustments.find(a => a.id === parseInt(id));
        if (adjustment) {
          adjustment.status = 'done';
          adjustment.approvedAt = new Date().toISOString();
          adjustment.approvedBy = approvedBy;
          productService.updateStock(adjustment.productId, adjustment.difference);
          resolve({ data: adjustment });
        }
      }, 300);
    });
  },

  cancel: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const adjustment = adjustments.find(a => a.id === parseInt(id));
        if (adjustment) {
          adjustment.status = 'canceled';
          resolve({ data: adjustment });
        }
      }, 300);
    });
  }
};

export default adjustmentService;