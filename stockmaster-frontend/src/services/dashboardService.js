// src/services/dashboardService.js
import api from './api';

const dashboardService = {
  getKPIs: async () => {
    try {
      const response = await api.get('/dashboard/kpis');
      return response;
    } catch (error) {
      console.error('Failed to fetch KPIs:', error);
      // Return default values on error
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
      // This would need a backend endpoint that combines all movement types
      // For now, fetch from individual endpoints and combine
      const [receipts, deliveries, transfers, adjustments] = await Promise.all([
        api.get('/receipts').catch(() => ({ data: [] })),
        api.get('/deliveries').catch(() => ({ data: [] })),
        api.get('/transfers').catch(() => ({ data: [] })),
        api.get('/adjustments').catch(() => ({ data: [] }))
      ]);

      const movements = [
        ...receipts.data.slice(0, 2).map(r => ({
          id: `receipt-${r.id}`,
          type: 'receipt',
          document: r.receiptNumber,
          product: r.lines?.[0]?.productName || 'Multiple Items',
          quantity: `+${r.lines?.reduce((sum, line) => sum + (line.quantityReceived || 0), 0) || 0}`,
          date: new Date(r.createdAt).toLocaleDateString(),
          status: r.status.toLowerCase()
        })),
        ...deliveries.data.slice(0, 2).map(d => ({
          id: `delivery-${d.id}`,
          type: 'delivery',
          document: d.deliveryNumber,
          product: d.lines?.[0]?.productName || 'Multiple Items',
          quantity: `-${d.lines?.reduce((sum, line) => sum + (line.quantityDelivered || 0), 0) || 0}`,
          date: new Date(d.createdAt).toLocaleDateString(),
          status: d.status.toLowerCase()
        })),
        ...transfers.data.slice(0, 1).map(t => ({
          id: `transfer-${t.id}`,
          type: 'transfer',
          document: t.transferNumber,
          product: t.lines?.[0]?.productName || 'Multiple Items',
          quantity: `${t.lines?.reduce((sum, line) => sum + (line.quantityTransferred || 0), 0) || 0}`,
          date: new Date(t.createdAt).toLocaleDateString(),
          status: t.status.toLowerCase()
        })),
        ...adjustments.data.slice(0, 1).map(a => ({
          id: `adjustment-${a.id}`,
          type: 'adjustment',
          document: a.adjustmentNumber,
          product: a.lines?.[0]?.productName || 'Multiple Items',
          quantity: `${a.lines?.[0]?.differenceQuantity > 0 ? '+' : ''}${a.lines?.[0]?.differenceQuantity || 0}`,
          date: new Date(a.createdAt).toLocaleDateString(),
          status: a.status.toLowerCase()
        }))
      ];

      // Sort by date (most recent first)
      movements.sort((a, b) => new Date(b.date) - new Date(a.date));

      return { data: movements.slice(0, 5) };
    } catch (error) {
      console.error('Failed to fetch recent movements:', error);
      return { data: [] };
    }
  },

  getStockChart: async () => {
    try {
      // This would ideally come from a backend analytics endpoint
      // For now, return mock data
      return {
        data: [
          { name: 'Week 1', receipts: 150, deliveries: 80 },
          { name: 'Week 2', receipts: 200, deliveries: 120 },
          { name: 'Week 3', receipts: 180, deliveries: 150 },
          { name: 'Week 4', receipts: 250, deliveries: 100 },
          { name: 'Week 5', receipts: 300, deliveries: 180 }
        ]
      };
    } catch (error) {
      console.error('Failed to fetch stock chart data:', error);
      return { data: [] };
    }
  }
};

export default dashboardService;