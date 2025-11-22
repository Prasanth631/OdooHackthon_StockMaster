import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import Button from '../common/Button';
import Table from '../common/Table';
import Badge from '../common/Badge';
import { PageLoader } from '../common/Loader';
import productService from '../../services/productService';
import { CATEGORIES } from '../../utils/constants';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [search, categoryFilter]);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAll({ search, category: categoryFilter });
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStockStatus = (stock, minStock) => {
    if (stock === 0) return 'canceled';
    if (stock <= minStock) return 'warning';
    return 'done';
  };

  const columns = [
    { key: 'sku', title: 'SKU' },
    { key: 'name', title: 'Product Name' },
    { key: 'category', title: 'Category' },
    {
      key: 'stock',
      title: 'Stock',
      render: (stock, row) => (
        <div className="flex items-center gap-2">
          <span>{stock} {row.unit}</span>
          <Badge status={getStockStatus(stock, row.minStock)}>
            {stock === 0 ? 'Out of Stock' : stock <= row.minStock ? 'Low' : 'OK'}
          </Badge>
        </div>
      )
    },
    { key: 'warehouse', title: 'Warehouse' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate(`/products/${row.id}`); }}>
          View
        </Button>
      )
    }
  ];

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500">Manage your inventory products</p>
        </div>
        <Button onClick={() => navigate('/products/new')}>
          <Plus size={20} /> Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <Table columns={columns} data={products} onRowClick={(row) => navigate(`/products/${row.id}`)} emptyMessage="No products found" />
    </div>
  );
};

export default ProductList;