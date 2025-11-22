export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value !== '';
};

export const validatePositiveNumber = (value) => {
  return !isNaN(value) && Number(value) > 0;
};

export const validateNonNegativeNumber = (value) => {
  return !isNaN(value) && Number(value) >= 0;
};

export const validateProductForm = (product) => {
  const errors = {};
  
  if (!validateRequired(product.name)) {
    errors.name = 'Product name is required';
  }
  
  if (!validateRequired(product.sku)) {
    errors.sku = 'SKU is required';
  }
  
  if (!validateRequired(product.category)) {
    errors.category = 'Category is required';
  }
  
  if (!validateRequired(product.unit)) {
    errors.unit = 'Unit of measure is required';
  }
  
  if (product.initialStock && !validateNonNegativeNumber(product.initialStock)) {
    errors.initialStock = 'Initial stock must be a non-negative number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateReceiptForm = (receipt) => {
  const errors = {};
  
  if (!validateRequired(receipt.supplier)) {
    errors.supplier = 'Supplier is required';
  }
  
  if (!receipt.items || receipt.items.length === 0) {
    errors.items = 'At least one item is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};