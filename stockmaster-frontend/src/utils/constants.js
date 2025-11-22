export const API_BASE_URL = 'http://localhost:5000/api';

export const DOCUMENT_TYPES = {
  RECEIPT: 'receipt',
  DELIVERY: 'delivery',
  TRANSFER: 'transfer',
  ADJUSTMENT: 'adjustment'
};

export const STATUS = {
  DRAFT: 'draft',
  WAITING: 'waiting',
  READY: 'ready',
  DONE: 'done',
  CANCELED: 'canceled'
};

export const STATUS_COLORS = {
  draft: 'bg-gray-100 text-gray-800',
  waiting: 'bg-yellow-100 text-yellow-800',
  ready: 'bg-blue-100 text-blue-800',
  done: 'bg-green-100 text-green-800',
  canceled: 'bg-red-100 text-red-800'
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