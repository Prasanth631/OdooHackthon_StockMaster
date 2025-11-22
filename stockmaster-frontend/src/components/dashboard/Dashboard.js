import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, ClipboardList, Truck, ArrowRightLeft } from 'lucide-react';
import KPICard from './KPICard';
import LowStockAlert from './LowStockAlert';
import RecentMovements from './RecentMovements';
import StatsChart from './StatsChart';
import { PageLoader } from '../common/Loader';
import dashboardService from '../../services/dashboardService';
import productService from '../../services/productService';

const Dashboard = () => {
  const [kpis, setKpis] = useState(null);
  const [lowStock, setLowStock] = useState([]);
  const [movements, setMovements] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [kpisRes, lowStockRes, movementsRes, chartRes] = await Promise.all([
        dashboardService.getKPIs(),
        productService.getLowStock(),
        dashboardService.getRecentMovements(),
        dashboardService.getStockChart()
      ]);
      setKpis(kpisRes.data);
      setLowStock(lowStockRes.data);
      setMovements(movementsRes.data);
      setChartData(chartRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Overview of your inventory operations</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <KPICard
          title="Total Products"
          value={kpis?.totalProducts || 0}
          icon={Package}
          color="blue"
        />
        <KPICard
          title="Low Stock Items"
          value={kpis?.lowStockCount || 0}
          icon={AlertTriangle}
          color="yellow"
        />
        <KPICard
          title="Pending Receipts"
          value={kpis?.pendingReceipts || 0}
          icon={ClipboardList}
          color="green"
        />
        <KPICard
          title="Pending Deliveries"
          value={kpis?.pendingDeliveries || 0}
          icon={Truck}
          color="red"
        />
        <KPICard
          title="Scheduled Transfers"
          value={kpis?.scheduledTransfers || 0}
          icon={ArrowRightLeft}
          color="purple"
        />
      </div>

      {/* Charts and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatsChart data={chartData} />
        <LowStockAlert products={lowStock} />
      </div>

      {/* Recent Movements */}
      <RecentMovements movements={movements} />
    </div>
  );
};

export default Dashboard;