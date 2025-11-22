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