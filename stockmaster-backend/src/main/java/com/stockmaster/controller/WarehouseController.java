package com.stockmaster.controller;

import com.stockmaster.entity.Warehouse;
import com.stockmaster.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/warehouses")
@CrossOrigin(origins = "http://localhost:3000")
public class WarehouseController {
    
    @Autowired
    private WarehouseRepository warehouseRepository;
    
    @GetMapping
    public ResponseEntity<List<Warehouse>> getAllWarehouses() {
        return ResponseEntity.ok(warehouseRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getWarehouseById(@PathVariable Long id) {
        return warehouseRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<?> createWarehouse(@RequestBody Warehouse warehouse) {
        try {
            if (warehouseRepository.existsByCode(warehouse.getCode())) {
                return ResponseEntity.badRequest().body("Warehouse code already exists");
            }
            return ResponseEntity.ok(warehouseRepository.save(warehouse));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateWarehouse(@PathVariable Long id, @RequestBody Warehouse warehouse) {
        try {
            Warehouse existing = warehouseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));
            
            existing.setName(warehouse.getName());
            existing.setAddress(warehouse.getAddress());
            existing.setCity(warehouse.getCity());
            existing.setState(warehouse.getState());
            existing.setZipCode(warehouse.getZipCode());
            existing.setCountry(warehouse.getCountry());
            existing.setActive(warehouse.getActive());
            
            return ResponseEntity.ok(warehouseRepository.save(existing));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWarehouse(@PathVariable Long id) {
        try {
            Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));
            warehouse.setActive(false);
            warehouseRepository.save(warehouse);
            return ResponseEntity.ok("Warehouse deactivated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}