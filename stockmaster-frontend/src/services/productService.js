// src/services/productService.js
import api from './api';

const productService = {
  getAll: async (filters = {}) => {
    try {
      let url = '/products';
      
      // Add search query if provided
      if (filters.search) {
        url += `/search?keyword=${encodeURIComponent(filters.search)}`;
      }
      
      const response = await api.get(url);
      
      // Apply category filter on frontend if needed
      let products = response.data;
      if (filters.category) {
        products = products.filter(p => 
          p.categoryName === filters.category
        );
      }
      
      return { data: products };
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      throw error;
    }
  },

  create: async (productData) => {
    try {
      // Map frontend field names to backend DTO
      const dto = {
        name: productData.name,
        sku: productData.sku,
        categoryId: productData.categoryId,
        unitOfMeasure: productData.unit,
        initialStock: productData.initialStock || 0,
        description: productData.description,
        costPrice: productData.price || 0,
        sellingPrice: productData.price || 0,
        active: true
      };
      
      const response = await api.post('/products', dto);
      return response;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  },

  update: async (id, productData) => {
    try {
      const dto = {
        name: productData.name,
        sku: productData.sku,
        categoryId: productData.categoryId,
        unitOfMeasure: productData.unit,
        description: productData.description,
        costPrice: productData.price || 0,
        sellingPrice: productData.price || 0,
        active: productData.active !== undefined ? productData.active : true
      };
      
      const response = await api.put(`/products/${id}`, dto);
      return response;
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response;
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw error;
    }
  },

  getLowStock: async () => {
    try {
      const response = await api.get('/products');
      
      // Filter for low stock items
      const lowStockProducts = response.data.filter(p => 
        p.currentStock === 0 || p.currentStock <= 10
      ).map(p => ({
        id: p.id,
        name: p.name,
        sku: p.sku,
        stock: p.currentStock,
        unit: p.unitOfMeasure,
        minStock: 10,
        category: p.categoryName,
        warehouse: 'Main Warehouse'
      }));
      
      return { data: lowStockProducts };
    } catch (error) {
      console.error('Failed to fetch low stock products:', error);
      return { data: [] };
    }
  }
};

export default productService;