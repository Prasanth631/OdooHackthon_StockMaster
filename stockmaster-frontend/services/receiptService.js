import productService from './productService';
import { generateDocumentNumber } from '../utils/helpers';

let receipts = [
  {
    id: 1,
    documentNumber: 'RCP-00000001',
    supplier: 'Steel Corp Ltd',
    warehouse: 'Main Warehouse',
    status: 'done',
    items: [{ productId: 1, productName: 'Steel Rods', quantity: 100, unit: 'kg' }],
    createdAt: '2024-01-15T10:30:00Z',
    validatedAt: '2024-01-15T11:00:00Z',
    notes: 'Regular monthly supply'
  },
  {
    id: 2,
    documentNumber: 'RCP-00000002',
    supplier: 'Office Supplies Inc',
    warehouse: 'Main Warehouse',
    status: 'waiting',
    items: [{ productId: 2, productName: 'Office Chair', quantity: 20, unit: 'pcs' }],
    createdAt: '2024-01-18T09:00:00Z',
    validatedAt: null,
    notes: ''
  }
];

const receiptService = {
  getAll: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...receipts];
        if (filters.status) {
          filtered = filtered.filter(r => r.status === filters.status);
        }
        resolve({ data: filtered });
      }, 300);
    });
  },

  getById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const receipt = receipts.find(r => r.id === parseInt(id));
        if (receipt) resolve({ data: receipt });
        else reject(new Error('Receipt not found'));
      }, 200);
    });
  },

  create: async (receiptData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReceipt = {
          id: receipts.length + 1,
          documentNumber: generateDocumentNumber('receipt'),
          ...receiptData,
          status: 'draft',
          createdAt: new Date().toISOString(),
          validatedAt: null
        };
        receipts.push(newReceipt);
        resolve({ data: newReceipt });
      }, 300);
    });
  },

  update: async (id, receiptData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = receipts.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
          receipts[index] = { ...receipts[index], ...receiptData };
          resolve({ data: receipts[index] });
        }
      }, 300);
    });
  },

  validate: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const receipt = receipts.find(r => r.id === parseInt(id));
        if (receipt) {
          receipt.status = 'done';
          receipt.validatedAt = new Date().toISOString();
          // Update stock
          receipt.items.forEach(item => {
            productService.updateStock(item.productId, item.quantity);
          });
          resolve({ data: receipt });
        }
      }, 300);
    });
  },

  cancel: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const receipt = receipts.find(r => r.id === parseInt(id));
        if (receipt) {
          receipt.status = 'canceled';
          resolve({ data: receipt });
        }
      }, 300);
    });
  },

  getPending: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pending = receipts.filter(r => r.status === 'waiting' || r.status === 'draft');
        resolve({ data: pending });
      }, 200);
    });
  }
};

export default receiptService;