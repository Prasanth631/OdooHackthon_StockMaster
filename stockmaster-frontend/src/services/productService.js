import api from './api';

const productService = {
  getAll: async (filters = {}) => {
    try {
      let url = '/products';
      const params = new URLSearchParams();
      
      if (filters.search) {
        url = `/products/search?keyword=${encodeURIComponent(filters.search)}`;
      } else {
        if (filters.category) {
          params.append('category', filters.category);
        }
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
      }
      
      const response = await api.get(url);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch products');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch product');
    }
  },

  create: async (productData) => {
    try {
      const payload = {
        name: productData.name,
        sku: productData.sku,
        categoryId: productData.categoryId || null,
        unitOfMeasure: productData.unit,
        description: productData.description || '',
        initialStock: productData.initialStock || 0,
        costPrice: productData.price || 0,
        sellingPrice: productData.price || 0,
        active: true
      };
      
      const response = await api.post('/products', payload);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to create product');
    }
  },

  update: async (id, productData) => {
    try {
      const payload = {
        name: productData.name,
        sku: productData.sku,
        categoryId: productData.categoryId || null,
        unitOfMeasure: productData.unit,
        description: productData.description || '',
        costPrice: productData.price || 0,
        sellingPrice: productData.price || 0
      };
      
      const response = await api.put(`/products/${id}`, payload);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to update product');
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`/products/${id}`);
      return { data: { success: true } };
    } catch (error) {
      throw new Error(error.message || 'Failed to delete product');
    }
  },

  getLowStock: async () => {
    try {
      const response = await api.get('/products');
      const products = response.data;
      const lowStock = products.filter(p => 
        p.currentStock <= (p.minStock || 10)
      );
      return { data: lowStock };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch low stock products');
    }
  },

  searchProducts: async (keyword) => {
    try {
      const response = await api.get(`/products/search?keyword=${encodeURIComponent(keyword)}`);
      return { data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to search products');
    }
  }
};

export default productService;