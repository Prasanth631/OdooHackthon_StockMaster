package com.stockmaster.service;

import com.stockmaster.entity.Location;
import com.stockmaster.entity.Warehouse;
import com.stockmaster.exception.ResourceNotFoundException;
import com.stockmaster.repository.LocationRepository;
import com.stockmaster.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class WarehouseService {
    
    @Autowired
    private WarehouseRepository warehouseRepository;
    
    @Autowired
    private LocationRepository locationRepository;
    
    // Warehouse Operations
    
    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }
    
    public List<Warehouse> getActiveWarehouses() {
        return warehouseRepository.findByActiveTrue();
    }
    
    public Warehouse getWarehouseById(Long id) {
        return warehouseRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + id));
    }
    
    public Warehouse getWarehouseByCode(String code) {
        return warehouseRepository.findByCode(code)
            .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with code: " + code));
    }
    
    @Transactional
    public Warehouse createWarehouse(Warehouse warehouse) {
        if (warehouseRepository.existsByCode(warehouse.getCode())) {
            throw new RuntimeException("Warehouse code already exists: " + warehouse.getCode());
        }
        
        warehouse.setActive(true);
        return warehouseRepository.save(warehouse);
    }
    
    @Transactional
    public Warehouse updateWarehouse(Long id, Warehouse warehouseDetails) {
        Warehouse warehouse = getWarehouseById(id);
        
        // Don't allow code change if it conflicts
        if (!warehouse.getCode().equals(warehouseDetails.getCode()) && 
            warehouseRepository.existsByCode(warehouseDetails.getCode())) {
            throw new RuntimeException("Warehouse code already exists: " + warehouseDetails.getCode());
        }
        
        warehouse.setName(warehouseDetails.getName());
        warehouse.setCode(warehouseDetails.getCode());
        warehouse.setAddress(warehouseDetails.getAddress());
        warehouse.setCity(warehouseDetails.getCity());
        warehouse.setState(warehouseDetails.getState());
        warehouse.setZipCode(warehouseDetails.getZipCode());
        warehouse.setCountry(warehouseDetails.getCountry());
        
        return warehouseRepository.save(warehouse);
    }
    
    @Transactional
    public void deactivateWarehouse(Long id) {
        Warehouse warehouse = getWarehouseById(id);
        warehouse.setActive(false);
        warehouseRepository.save(warehouse);
    }
    
    @Transactional
    public void activateWarehouse(Long id) {
        Warehouse warehouse = getWarehouseById(id);
        warehouse.setActive(true);
        warehouseRepository.save(warehouse);
    }
    
    @Transactional
    public void deleteWarehouse(Long id) {
        Warehouse warehouse = getWarehouseById(id);
        
        // Check if warehouse has any locations
        List<Location> locations = locationRepository.findByWarehouse(warehouse);
        if (!locations.isEmpty()) {
            throw new RuntimeException("Cannot delete warehouse with existing locations. Please remove or reassign locations first.");
        }
        
        warehouseRepository.delete(warehouse);
    }
    
    // Location Operations
    
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }
    
    public List<Location> getActiveLocations() {
        return locationRepository.findByActiveTrue();
    }
    
    public List<Location> getLocationsByWarehouse(Long warehouseId) {
        Warehouse warehouse = getWarehouseById(warehouseId);
        return locationRepository.findByWarehouse(warehouse);
    }
    
    public Location getLocationById(Long id) {
        return locationRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Location not found with id: " + id));
    }
    
    public Location getLocationByCode(String code) {
        return locationRepository.findByCode(code)
            .orElseThrow(() -> new ResourceNotFoundException("Location not found with code: " + code));
    }
    
    @Transactional
    public Location createLocation(Location location) {
        if (locationRepository.existsByCode(location.getCode())) {
            throw new RuntimeException("Location code already exists: " + location.getCode());
        }
        
        // Verify warehouse exists
        Warehouse warehouse = getWarehouseById(location.getWarehouse().getId());
        
        if (!warehouse.getActive()) {
            throw new RuntimeException("Cannot create location in inactive warehouse");
        }
        
        location.setActive(true);
        return locationRepository.save(location);
    }
    
    @Transactional
    public Location updateLocation(Long id, Location locationDetails) {
        Location location = getLocationById(id);
        
        // Don't allow code change if it conflicts
        if (!location.getCode().equals(locationDetails.getCode()) && 
            locationRepository.existsByCode(locationDetails.getCode())) {
            throw new RuntimeException("Location code already exists: " + locationDetails.getCode());
        }
        
        location.setName(locationDetails.getName());
        location.setCode(locationDetails.getCode());
        location.setType(locationDetails.getType());
        location.setAisle(locationDetails.getAisle());
        location.setRack(locationDetails.getRack());
        location.setShelf(locationDetails.getShelf());
        
        return locationRepository.save(location);
    }
    
    @Transactional
    public void deactivateLocation(Long id) {
        Location location = getLocationById(id);
        location.setActive(false);
        locationRepository.save(location);
    }
    
    @Transactional
    public void activateLocation(Long id) {
        Location location = getLocationById(id);
        location.setActive(true);
        locationRepository.save(location);
    }
    
    @Transactional
    public void deleteLocation(Long id) {
        Location location = getLocationById(id);
        
        // TODO: Check if location has any stock before deleting
        // This would require checking stock_ledger or other related tables
        
        locationRepository.delete(location);
    }
    
    // Utility Methods
    
    public boolean isWarehouseActive(Long warehouseId) {
        Warehouse warehouse = getWarehouseById(warehouseId);
        return warehouse.getActive();
    }
    
    public boolean isLocationActive(Long locationId) {
        Location location = getLocationById(locationId);
        return location.getActive();
    }
    
    public boolean isLocationInWarehouse(Long locationId, Long warehouseId) {
        Location location = getLocationById(locationId);
        return location.getWarehouse().getId().equals(warehouseId);
    }
    
    @Transactional
    public void validateWarehouseAndLocation(Long warehouseId, Long locationId) {
        if (!isWarehouseActive(warehouseId)) {
            throw new RuntimeException("Warehouse is not active");
        }
        
        if (locationId != null) {
            if (!isLocationActive(locationId)) {
                throw new RuntimeException("Location is not active");
            }
            
            if (!isLocationInWarehouse(locationId, warehouseId)) {
                throw new RuntimeException("Location does not belong to the specified warehouse");
            }
        }
    }
}