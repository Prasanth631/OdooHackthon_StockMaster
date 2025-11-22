let warehouses = [
  { id: 1, name: 'Main Warehouse', address: '123 Industrial Ave', isActive: true },
  { id: 2, name: 'Production Floor', address: '123 Industrial Ave - Floor 2', isActive: true },
  { id: 3, name: 'Warehouse B', address: '456 Storage Blvd', isActive: true }
];

const warehouseService = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: warehouses });
      }, 200);
    });
  },

  getById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const warehouse = warehouses.find(w => w.id === parseInt(id));
        if (warehouse) resolve({ data: warehouse });
        else reject(new Error('Warehouse not found'));
      }, 200);
    });
  },

  create: async (warehouseData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newWarehouse = {
          id: warehouses.length + 1,
          ...warehouseData,
          isActive: true
        };
        warehouses.push(newWarehouse);
        resolve({ data: newWarehouse });
      }, 300);
    });
  },

  update: async (id, warehouseData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = warehouses.findIndex(w => w.id === parseInt(id));
        if (index !== -1) {
          warehouses[index] = { ...warehouses[index], ...warehouseData };
          resolve({ data: warehouses[index] });
        }
      }, 300);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        warehouses = warehouses.filter(w => w.id !== parseInt(id));
        resolve({ data: { success: true } });
      }, 300);
    });
  }
};

export default warehouseService;