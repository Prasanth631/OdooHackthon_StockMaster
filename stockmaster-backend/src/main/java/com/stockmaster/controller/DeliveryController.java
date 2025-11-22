package com.stockmaster.controller;

import com.stockmaster.entity.Delivery;
import com.stockmaster.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/deliveries")
@CrossOrigin(origins = "http://localhost:3000")
public class DeliveryController {
    
    @Autowired
    private DeliveryService deliveryService;
    
    @GetMapping
    public ResponseEntity<List<Delivery>> getAllDeliveries() {
        return ResponseEntity.ok(deliveryService.getAllDeliveries());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getDeliveryById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(deliveryService.getDeliveryById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createDelivery(@RequestBody Delivery delivery) {
        try {
            return ResponseEntity.ok(deliveryService.createDelivery(delivery));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/{id}/validate")
    public ResponseEntity<?> validateDelivery(@PathVariable Long id, @RequestParam Long userId) {
        try {
            return ResponseEntity.ok(deliveryService.validateDelivery(id, userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDelivery(@PathVariable Long id) {
        try {
            deliveryService.deleteDelivery(id);
            return ResponseEntity.ok("Delivery deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}