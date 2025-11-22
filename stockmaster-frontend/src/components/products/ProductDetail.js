import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import { PageLoader } from '../common/Loader';
import productService from '../../services/productService';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productService.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await productService.delete(id);
      navigate('/products');
    } catch (error) {
      console.error('Failed to delete product:', error);
    } finally {
      setDeleting(false);
    }
  };

  const getStockStatus = () => {
    if (product.stock === 0) return { status: 'canceled', text: 'Out of Stock' };
    if (product.stock <= product.minStock) return { status: 'warning', text: 'Low Stock' };
    return { status: 'done', text: 'In Stock' };
  };

  if (loading) return <PageLoader />;
  if (!product) return <div className="text-center py-8">Product not found</div>;

  const stockStatus = getStockStatus();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={() => navigate('/products')}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-500">{product.sku}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/products/edit/${id}`)}>
            <Edit size={18} /> Edit
          </Button>
          <Button variant="danger" onClick={() => setShowDelete(true)}>
            <Trash2 size={18} /> Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Product Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-sm text-gray-500">Category</p><p className="font-medium">{product.category}</p></div>
            <div><p className="text-sm text-gray-500">Unit</p><p className="font-medium">{product.unit}</p></div>
            <div><p className="text-sm text-gray-500">Warehouse</p><p className="font-medium">{product.warehouse}</p></div>
            <div><p className="text-sm text-gray-500">Price</p><p className="font-medium">${product.price || 0}</p></div>
          </div>
          {product.description && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-500">Description</p>
              <p className="mt-1">{product.description}</p>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Stock Information</h3>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-gray-900">{product.stock}</p>
            <p className="text-gray-500">{product.unit}</p>
            <Badge status={stockStatus.status} className="mt-2">{stockStatus.text}</Badge>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Minimum Stock</span>
              <span className="font-medium">{product.minStock} {product.unit}</span>
            </div>
          </div>
        </Card>
      </div>

      <Modal isOpen={showDelete} onClose={() => setShowDelete(false)} title="Delete Product">
        <p className="text-gray-600 mb-6">Are you sure you want to delete "{product.name}"? This action cannot be undone.</p>
        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={() => setShowDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete} loading={deleting}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetail;