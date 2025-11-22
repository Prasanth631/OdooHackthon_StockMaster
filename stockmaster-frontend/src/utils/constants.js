// src/utils/constants.js
export const API_BASE_URL = 'http://localhost:8083/api';

export const DOCUMENT_TYPES = {
  RECEIPT: 'receipt',
  DELIVERY: 'delivery',
  TRANSFER: 'transfer',
  ADJUSTMENT: 'adjustment'
};

// Backend uses uppercase enum values
export const STATUS = {
  DRAFT: 'draft',
  WAITING: 'waiting',
  READY: 'ready',
  DONE: 'done',
  CANCELED: 'canceled'
};

// Map backend status enums to frontend display
export const STATUS_DISPLAY = {
  DRAFT: 'draft',
  WAITING: 'waiting',
  READY: 'ready',
  DONE: 'done',
  CANCELLED: 'canceled'
};

export const STATUS_COLORS = {
  draft: 'bg-gray-100 text-gray-800',
  waiting: 'bg-yellow-100 text-yellow-800',
  ready: 'bg-blue-100 text-blue-800',
  done: 'bg-green-100 text-green-800',
  canceled: 'bg-red-100 text-red-800',
  cancelled: 'bg-red-100 text-red-800'
};

export const UNITS_OF_MEASURE = [
  { value: 'pcs', label: 'Pieces' },
  { value: 'kg', label: 'Kilograms' },
  { value: 'g', label: 'Grams' },
  { value: 'l', label: 'Liters' },
  { value: 'ml', label: 'Milliliters' },
  { value: 'm', label: 'Meters' },
  { value: 'box', label: 'Boxes' },
  { value: 'pack', label: 'Packs' }
];

export const CATEGORIES = [
  'Electronics',
  'Furniture',
  'Raw Materials',
  'Finished Goods',
  'Packaging',
  'Office Supplies',
  'Tools',
  'Other'
];

// User roles from backend
export const USER_ROLES = {
  INVENTORY_MANAGER: 'INVENTORY_MANAGER',
  WAREHOUSE_STAFF: 'WAREHOUSE_STAFF',
  ADMIN: 'ADMIN'
};

// Adjustment types from backend
export const ADJUSTMENT_TYPES = {
  PHYSICAL_COUNT: 'PHYSICAL_COUNT',
  DAMAGE: 'DAMAGE',
  LOSS: 'LOSS',
  FOUND: 'FOUND',
  OTHER: 'OTHER'
};

// Location types from backend
export const LOCATION_TYPES = {
  STORAGE: 'STORAGE',
  PRODUCTION: 'PRODUCTION',
  SHIPPING: 'SHIPPING',
  RECEIVING: 'RECEIVING',
  QUARANTINE: 'QUARANTINE'
};