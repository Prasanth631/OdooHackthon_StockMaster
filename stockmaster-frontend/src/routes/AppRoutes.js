import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import ForgotPassword from '../components/auth/ForgotPassword';

// Dashboard
import Dashboard from '../components/dashboard/Dashboard';

// Products
import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductForm';
import ProductDetail from '../components/products/ProductDetail';

// Receipts
import ReceiptList from '../components/operations/receipts/ReceiptList';
import ReceiptForm from '../components/operations/receipts/ReceiptForm';
import ReceiptDetail from '../components/operations/receipts/ReceiptDetail';

// Deliveries
import DeliveryList from '../components/operations/deliveries/DeliveryList';
import DeliveryForm from '../components/operations/deliveries/DeliveryForm';
import DeliveryDetail from '../components/operations/deliveries/DeliveryDetail';

// Transfers
import TransferList from '../components/operations/transfers/TransferList';
import TransferForm from '../components/operations/transfers/TransferForm';
import TransferDetail from '../components/operations/transfers/TransferDetail';

// Adjustments
import AdjustmentList from '../components/operations/adjustments/AdjustmentList';
import AdjustmentForm from '../components/operations/adjustments/AdjustmentForm';
import AdjustmentDetail from '../components/operations/adjustments/AdjustmentDetail';

// History
import MoveHistory from '../components/history/MoveHistory';

// Settings
import WarehouseSettings from '../components/settings/WarehouseSettings';

// Profile
import UserProfile from '../components/profile/UserProfile';

// Common
import ProtectedRoute from '../components/common/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      {/* Products */}
      <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
      <Route path="/products/new" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
      <Route path="/products/edit/:id" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
      <Route path="/products/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />

      {/* Receipts */}
      <Route path="/receipts" element={<ProtectedRoute><ReceiptList /></ProtectedRoute>} />
      <Route path="/receipts/new" element={<ProtectedRoute><ReceiptForm /></ProtectedRoute>} />
      <Route path="/receipts/:id" element={<ProtectedRoute><ReceiptDetail /></ProtectedRoute>} />

      {/* Deliveries */}
      <Route path="/deliveries" element={<ProtectedRoute><DeliveryList /></ProtectedRoute>} />
      <Route path="/deliveries/new" element={<ProtectedRoute><DeliveryForm /></ProtectedRoute>} />
      <Route path="/deliveries/:id" element={<ProtectedRoute><DeliveryDetail /></ProtectedRoute>} />

      {/* Transfers */}
      <Route path="/transfers" element={<ProtectedRoute><TransferList /></ProtectedRoute>} />
      <Route path="/transfers/new" element={<ProtectedRoute><TransferForm /></ProtectedRoute>} />
      <Route path="/transfers/:id" element={<ProtectedRoute><TransferDetail /></ProtectedRoute>} />

      {/* Adjustments */}
      <Route path="/adjustments" element={<ProtectedRoute><AdjustmentList /></ProtectedRoute>} />
      <Route path="/adjustments/new" element={<ProtectedRoute><AdjustmentForm /></ProtectedRoute>} />
      <Route path="/adjustments/:id" element={<ProtectedRoute><AdjustmentDetail /></ProtectedRoute>} />

      {/* History */}
      <Route path="/history" element={<ProtectedRoute><MoveHistory /></ProtectedRoute>} />

      {/* Settings */}
      <Route path="/settings" element={<ProtectedRoute><WarehouseSettings /></ProtectedRoute>} />

      {/* Profile */}
      <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;