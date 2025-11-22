// src/utils/validators.js

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim() !== '';
  }
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
  } else if (product.sku.length < 3) {
    errors.sku = 'SKU must be at least 3 characters';
  }
  
  if (!validateRequired(product.category) && !product.categoryId) {
    errors.category = 'Category is required';
  }
  
  if (!validateRequired(product.unit)) {
    errors.unit = 'Unit of measure is required';
  }
  
  if (product.initialStock !== undefined && product.initialStock !== '' && !validateNonNegativeNumber(product.initialStock)) {
    errors.initialStock = 'Initial stock must be a non-negative number';
  }
  
  if (product.price && !validateNonNegativeNumber(product.price)) {
    errors.price = 'Price must be a non-negative number';
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
  } else {
    // Validate each item
    const hasInvalidItem = receipt.items.some(item => 
      !item.productId || !item.quantity || item.quantity <= 0
    );
    if (hasInvalidItem) {
      errors.items = 'All items must have a product and valid quantity';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateDeliveryForm = (delivery) => {
  const errors = {};
  
  if (!validateRequired(delivery.customer)) {
    errors.customer = 'Customer is required';
  }
  
  if (!delivery.items || delivery.items.length === 0) {
    errors.items = 'At least one item is required';
  } else {
    const hasInvalidItem = delivery.items.some(item => 
      !item.productId || !item.quantity || item.quantity <= 0
    );
    if (hasInvalidItem) {
      errors.items = 'All items must have a product and valid quantity';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateTransferForm = (transfer) => {
  const errors = {};
  
  if (!validateRequired(transfer.sourceWarehouse)) {
    errors.sourceWarehouse = 'Source warehouse is required';
  }
  
  if (!validateRequired(transfer.destinationWarehouse)) {
    errors.destinationWarehouse = 'Destination warehouse is required';
  }
  
  if (transfer.sourceWarehouse === transfer.destinationWarehouse) {
    errors.destinationWarehouse = 'Source and destination must be different';
  }
  
  if (!transfer.items || transfer.items.length === 0) {
    errors.items = 'At least one item is required';
  } else {
    const hasInvalidItem = transfer.items.some(item => 
      !item.productId || !item.quantity || item.quantity <= 0
    );
    if (hasInvalidItem) {
      errors.items = 'All items must have a product and valid quantity';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateAdjustmentForm = (adjustment) => {
  const errors = {};
  
  if (!adjustment.productId) {
    errors.productId = 'Product is required';
  }
  
  if (adjustment.countedQuantity === undefined || adjustment.countedQuantity === '' || !validateNonNegativeNumber(adjustment.countedQuantity)) {
    errors.countedQuantity = 'Counted quantity is required and must be non-negative';
  }
  
  if (!validateRequired(adjustment.reason)) {
    errors.reason = 'Reason is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateWarehouseForm = (warehouse) => {
  const errors = {};
  
  if (!validateRequired(warehouse.name)) {
    errors.name = 'Warehouse name is required';
  }
  
  if (warehouse.name && warehouse.name.length < 3) {
    errors.name = 'Warehouse name must be at least 3 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateUserForm = (user) => {
  const errors = {};
  
  if (!validateRequired(user.fullName || user.name)) {
    errors.name = 'Full name is required';
  }
  
  if (!validateEmail(user.email)) {
    errors.email = 'Valid email is required';
  }
  
  if (user.password && !validatePassword(user.password)) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};