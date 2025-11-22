// src/utils/helpers.js

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const generateSKU = (category, name) => {
  const catPrefix = category ? category.substring(0, 3).toUpperCase() : 'GEN';
  const namePrefix = name ? name.substring(0, 3).toUpperCase() : 'PRD';
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${catPrefix}-${namePrefix}-${random}`;
};

export const generateDocumentNumber = (type) => {
  const prefixes = {
    receipt: 'RCP',
    delivery: 'DEL',
    transfer: 'TRF',
    adjustment: 'ADJ'
  };
  const prefix = prefixes[type] || 'DOC';
  const timestamp = Date.now().toString().slice(-8);
  return `${prefix}-${timestamp}`;
};

export const calculateStockStatus = (current, minimum) => {
  if (current <= 0) return 'out_of_stock';
  if (current <= minimum) return 'low_stock';
  return 'in_stock';
};

export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Map backend status enums to frontend lowercase format
export const mapBackendStatus = (status) => {
  if (!status) return 'draft';
  
  const statusMap = {
    'DRAFT': 'draft',
    'WAITING': 'waiting',
    'READY': 'ready',
    'DONE': 'done',
    'CANCELLED': 'canceled',
    'CANCELED': 'canceled'
  };
  
  return statusMap[status.toUpperCase()] || status.toLowerCase();
};

// Map frontend status to backend enum format
export const mapFrontendStatus = (status) => {
  if (!status) return 'DRAFT';
  
  const statusMap = {
    'draft': 'DRAFT',
    'waiting': 'WAITING',
    'ready': 'READY',
    'done': 'DONE',
    'canceled': 'CANCELLED',
    'cancelled': 'CANCELLED'
  };
  
  return statusMap[status.toLowerCase()] || status.toUpperCase();
};

// Format backend user role for display
export const formatRole = (role) => {
  if (!role) return 'User';
  
  const roleMap = {
    'INVENTORY_MANAGER': 'Inventory Manager',
    'WAREHOUSE_STAFF': 'Warehouse Staff',
    'ADMIN': 'Administrator'
  };
  
  return roleMap[role] || role.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

// Format currency
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Format quantity with unit
export const formatQuantity = (quantity, unit) => {
  if (!quantity && quantity !== 0) return '0';
  return `${quantity} ${unit || ''}`.trim();
};

// Safely parse JSON from localStorage
export const safeJSONParse = (str, defaultValue = null) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return defaultValue;
  }
};