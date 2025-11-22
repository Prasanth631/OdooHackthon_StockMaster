import productService from './productService';
import receiptService from './receiptService';
import deliveryService from './deliveryService';
import transferService from './transferService';

const dashboardService = {
  getKPIs: async () => {
    return new Promise(async (resolve) => {
      const [products, lowStock, pendingReceipts, pendingDeliveries, scheduledTransfers] = 
        await Promise.all([
          productService.getAll(),
          productService.getLowStock(),
          receiptService.getPending(),
          deliveryService.getPending(),
          transferService.getScheduled()
        ]);

      const totalProducts = products.data.length;
      const totalStock = products.data.reduce((sum, p) => sum + p.stock, 0);
      const outOfStock = products.data.filter(p => p.stock === 0).length;

      resolve({
        data: {
          totalProducts,
          totalStock,
          lowStockCount: lowStock.data.length,
          outOfStockCount: outOfStock,
          pendingReceipts: pendingReceipts.data.length,
          pendingDeliveries: pendingDeliveries.data.length,
          scheduledTransfers: scheduledTransfers.data.length
        }
      });
    });
  },

  getRecentMovements: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: 1, type: 'receipt', document: 'RCP-00000001', product: 'Steel Rods', quantity: '+100 kg', date: '2024-01-15', status: 'done' },
            { id: 2, type: 'delivery', document: 'DEL-00000001', product: 'Steel Rods', quantity: '-50 kg', date: '2024-01-16', status: 'done' },
            { id: 3, type: 'transfer', document: 'TRF-00000001', product: 'Steel Rods', quantity: '100 kg', date: '2024-01-17', status: 'done' },
            { id: 4, type: 'adjustment', document: 'ADJ-00000001', product: 'Steel Rods', quantity: '-3 kg', date: '2024-01-18', status: 'done' },
            { id: 5, type: 'receipt', document: 'RCP-00000002', product: 'Office Chair', quantity: '+20 pcs', date: '2024-01-18', status: 'waiting' }
          ]
        });
      }, 300);
    });
  },

  getStockChart: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { name: 'Jan 1', receipts: 150, deliveries: 80 },
            { name: 'Jan 5', receipts: 200, deliveries: 120 },
            { name: 'Jan 10', receipts: 180, deliveries: 150 },
            { name: 'Jan 15', receipts: 250, deliveries: 100 },
            { name: 'Jan 20', receipts: 300, deliveries: 180 }
          ]
        });
      }, 300);
    });
  }
};

export default dashboardService;