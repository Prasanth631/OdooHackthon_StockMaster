import React from 'react';
import { AlertTriangle } from 'lucide-react';

const LowStockAlert = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alerts</h3>
        <p className="text-gray-500 text-center py-4">All stock levels are healthy!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <AlertTriangle className="text-yellow-500" size={20} />
        Low Stock Alerts
      </h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className={`flex items-center justify-between p-3 rounded-lg ${
              product.stock === 0 ? 'bg-red-50' : 'bg-yellow-50'
            }`}
          >
            <div>
              <p className="font-medium text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">{product.sku}</p>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                product.stock === 0 ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {product.stock} {product.unit}
              </p>
              <p className="text-xs text-gray-500">Min: {product.minStock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockAlert;