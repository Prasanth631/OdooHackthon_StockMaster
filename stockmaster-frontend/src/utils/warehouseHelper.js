// src/utils/warehouseHelper.js
import warehouseService from '../services/warehouseService';

// Cache warehouses to avoid repeated API calls
let warehousesCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getWarehouses = async (forceRefresh = false) => {
  const now = Date.now();
  
  if (!forceRefresh && warehousesCache && cacheTimestamp && (now - cacheTimestamp < CACHE_DURATION)) {
    return warehousesCache;
  }
  
  try {
    const response = await warehouseService.getAll();
    warehousesCache = response.data;
    cacheTimestamp = now;
    return warehousesCache;
  } catch (error) {
    console.error('Failed to fetch warehouses:', error);
    return warehousesCache || [];
  }
};

export const getWarehouseIdByName = async (name) => {
  if (!name) return null;
  
  const warehouses = await getWarehouses();
  const warehouse = warehouses.find(w => 
    w.name.toLowerCase() === name.toLowerCase()
  );
  
  return warehouse?.id || null;
};

export const getWarehouseById = async (id) => {
  if (!id) return null;
  
  const warehouses = await getWarehouses();
  return warehouses.find(w => w.id === parseInt(id)) || null;
};

export const getDefaultWarehouse = async () => {
  const warehouses = await getWarehouses();
  
  // Return the first active warehouse or the first warehouse
  return warehouses.find(w => w.isActive) || warehouses[0] || null;
};

export const clearWarehouseCache = () => {
  warehousesCache = null;
  cacheTimestamp = null;
};

// Helper to get warehouse object for backend requests
export const getWarehouseObject = async (warehouseIdentifier) => {
  if (!warehouseIdentifier) {
    const defaultWh = await getDefaultWarehouse();
    return defaultWh ? { id: defaultWh.id } : { id: 1 };
  }
  
  // If it's already an ID
  if (typeof warehouseIdentifier === 'number') {
    return { id: warehouseIdentifier };
  }
  
  // If it's a string, try to find by name
  const id = await getWarehouseIdByName(warehouseIdentifier);
  return { id: id || 1 };
};