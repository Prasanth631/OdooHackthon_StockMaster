package com.stockmaster.controller;

import com.stockmaster.entity.Adjustment;
import com.stockmaster.service.AdjustmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/adjustments")
@CrossOrigin(origins = "http://localhost:3000")
public class AdjustmentController {
    
    @Autowired
    private AdjustmentService adjustmentService;
    
    @GetMapping
    public ResponseEntity<List<Adjustment>> getAllAdjustments() {
        return ResponseEntity.ok(adjustmentService.getAllAdjustments());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getAdjustmentById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(adjustmentService.getAdjustmentById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createAdjustment(@RequestBody Adjustment adjustment) {
        try {
            return ResponseEntity.ok(adjustmentService.createAdjustment(adjustment));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/{id}/validate")
    public ResponseEntity<?> validateAdjustment(@PathVariable Long id, @RequestParam Long userId) {
        try {
            return ResponseEntity.ok(adjustmentService.validateAdjustment(id, userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdjustment(@PathVariable Long id) {
        try {
            adjustmentService.deleteAdjustment(id);
            return ResponseEntity.ok("Adjustment deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}