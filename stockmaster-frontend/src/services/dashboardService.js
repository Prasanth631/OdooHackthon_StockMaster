import api from './api';

const dashboardService = {
  getKPIs: async () => {
    try {
      const response = await api.get('/dashboard/kpis');
      return { data: response.data };
    } catch (error) {
      console.error('Failed to fetch KPIs:', error);
      return {
        data: {
          totalProducts: 0,
          lowStockItems: 0,
          outOfStockItems: 0,
          pendingReceipts: 0,
          pendingDeliveries: 0,
          scheduledTransfers: 0
        }
      };
    }
  },

  getRecentMovements: async () => {
    try {
      const [receipts, deliveries, transfers, adjustments] = await Promise.all([
        api.get('/receipts').catch(() => ({ data: [] })),
        api.get('/deliveries').catch(() => ({ data: [] })),
        api.get('/transfers').catch(() => ({ data: [] })),
        api.get('/adjustments').catch(() => ({ data: [] }))
      ]);

      const movements = [
        ...receipts.data.slice(0, 3).map(r => ({
          id: r.id,
          type: 'receipt',
          document: r.receiptNumber,
          product: r.lines?.[0]?.product?.name || 'Multiple items',
          quantity: `+${r.lines?.reduce((sum, line) => sum + (line.quantityReceived || 0), 0) || 0}`,
          date: new Date(r.createdAt).toLocaleDateString(),
          status: r.status?.toLowerCase() || 'draft'
        })),
        ...deliveries.data.slice(0, 3).map(d => ({
          id: d.id,
          type: 'delivery',
          document: d.deliveryNumber,
          product: d.lines?.[0]?.product?.name || 'Multiple items',
          quantity: `-${d.lines?.reduce((sum, line) => sum + (line.quantityDelivered || 0), 0) || 0}`,
          date: new Date(d.createdAt).toLocaleDateString(),
          status: d.status?.toLowerCase() || 'draft'
        })),
        ...transfers.data.slice(0, 2).map(t => ({
          id: t.id,
          type: 'transfer',
          document: t.transferNumber,
          product: t.lines?.[0]?.product?.name || 'Multiple items',
          quantity: `${t.lines?.reduce((sum, line) => sum + (line.quantityTransferred || 0), 0) || 0}`,
          date: new Date(t.createdAt).toLocaleDateString(),
          status: t.status?.toLowerCase() || 'draft'
        })),
        ...adjustments.data.slice(0, 2).map(a => ({
          id: a.id,
          type: 'adjustment',
          document: a.adjustmentNumber,
          product: a.lines?.[0]?.product?.name || 'Item',
          quantity: `${a.lines?.[0]?.differenceQuantity > 0 ? '+' : ''}${a.lines?.[0]?.differenceQuantity || 0}`,
          date: new Date(a.createdAt).toLocaleDateString(),
          status: a.status?.toLowerCase() || 'draft'
        }))
      ];

      movements.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      return { data: movements.slice(0, 10) };
    } catch (error) {
      console.error('Failed to fetch recent movements:', error);
      return { data: [] };
    }
  },

  getStockChart: async () => {
    try {
      const response = await api.get('/dashboard/stock-chart');
      return { data: response.data };
    } catch (error) {
      console.error('Failed to fetch stock chart:', error);
      return {
        data: [
          { name: 'Week 1', receipts: 0, deliveries: 0 },
          { name: 'Week 2', receipts: 0, deliveries: 0 },
          { name: 'Week 3', receipts: 0, deliveries: 0 },
          { name: 'Week 4', receipts: 0, deliveries: 0 }
        ]
      };
    }
  }
};

export default dashboardService;