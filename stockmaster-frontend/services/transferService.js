import { generateDocumentNumber } from '../utils/helpers';

let transfers = [
  {
    id: 1,
    documentNumber: 'TRF-00000001',
    sourceWarehouse: 'Main Warehouse',
    destinationWarehouse: 'Production Floor',
    status: 'done',
    items: [{ productId: 1, productName: 'Steel Rods', quantity: 100, unit: 'kg' }],
    createdAt: '2024-01-17T08:00:00Z',
    completedAt: '2024-01-17T09:00:00Z',
    notes: 'Production requirement'
  },
  {
    id: 2,
    documentNumber: 'TRF-00000002',
    sourceWarehouse: 'Main Warehouse',
    destinationWarehouse: 'Warehouse B',
    status: 'waiting',
    items: [{ productId: 4, productName: 'Cardboard Boxes', quantity: 50, unit: 'box' }],
    createdAt: '2024-01-20T11:00:00Z',
    completedAt: null,
    notes: 'Redistribute stock'
  }
];

const transferService = {
  getAll: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...transfers];
        if (filters.status) {
          filtered = filtered.filter(t => t.status === filters.status);
        }
        resolve({ data: filtered });
      }, 300);
    });
  },

  getById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const transfer = transfers.find(t => t.id === parseInt(id));
        if (transfer) resolve({ data: transfer });
        else reject(new Error('Transfer not found'));
      }, 200);
    });
  },

  create: async (transferData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTransfer = {
          id: transfers.length + 1,
          documentNumber: generateDocumentNumber('transfer'),
          ...transferData,
          status: 'draft',
          createdAt: new Date().toISOString(),
          completedAt: null
        };
        transfers.push(newTransfer);
        resolve({ data: newTransfer });
      }, 300);
    });
  },

  update: async (id, transferData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = transfers.findIndex(t => t.id === parseInt(id));
        if (index !== -1) {
          transfers[index] = { ...transfers[index], ...transferData };
          resolve({ data: transfers[index] });
        }
      }, 300);
    });
  },

  complete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transfer = transfers.find(t => t.id === parseInt(id));
        if (transfer) {
          transfer.status = 'done';
          transfer.completedAt = new Date().toISOString();
          resolve({ data: transfer });
        }
      }, 300);
    });
  },

  getScheduled: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const scheduled = transfers.filter(t => t.status === 'waiting' || t.status === 'draft');
        resolve({ data: scheduled });
      }, 200);
    });
  }
};

export default transferService;