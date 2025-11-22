let products = [
  { id: 1, name: 'Steel Rods', sku: 'RAW-STE-0001', category: 'Raw Materials', unit: 'kg', stock: 500, minStock: 100, warehouse: 'Main Warehouse', price: 25 },
  { id: 2, name: 'Office Chair', sku: 'FUR-OFF-0002', category: 'Furniture', unit: 'pcs', stock: 45, minStock: 20, warehouse: 'Main Warehouse', price: 150 },
  { id: 3, name: 'Laptop Dell XPS', sku: 'ELE-LAP-0003', category: 'Electronics', unit: 'pcs', stock: 8, minStock: 10, warehouse: 'Main Warehouse', price: 1200 },
  { id: 4, name: 'Cardboard Boxes', sku: 'PAC-CAR-0004', category: 'Packaging', unit: 'box', stock: 200, minStock: 50, warehouse: 'Main Warehouse', price: 5 },
  { id: 5, name: 'Screwdriver Set', sku: 'TOO-SCR-0005', category: 'Tools', unit: 'pack', stock: 0, minStock: 15, warehouse: 'Main Warehouse', price: 35 },
];

const productService = {
  getAll: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...products];
        if (filters.category) {
          filtered = filtered.filter(p => p.category === filters.category);
        }
        if (filters.search) {
          const search = filters.search.toLowerCase();
          filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(search) || 
            p.sku.toLowerCase().includes(search)
          );
        }
        resolve({ data: filtered });
      }, 300);
    });
  },

  getById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = products.find(p => p.id === parseInt(id));
        if (product) resolve({ data: product });
        else reject(new Error('Product not found'));
      }, 200);
    });
  },

  create: async (productData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct = {
          id: products.length + 1,
          ...productData,
          stock: productData.initialStock || 0
        };
        products.push(newProduct);
        resolve({ data: newProduct });
      }, 300);
    });
  },

  update: async (id, productData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
          products[index] = { ...products[index], ...productData };
          resolve({ data: products[index] });
        }
      }, 300);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        products = products.filter(p => p.id !== parseInt(id));
        resolve({ data: { success: true } });
      }, 300);
    });
  },

  updateStock: (id, quantity) => {
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
      product.stock += quantity;
    }
  },

  getLowStock: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowStock = products.filter(p => p.stock <= p.minStock);
        resolve({ data: lowStock });
      }, 200);
    });
  }
};

export default productService;