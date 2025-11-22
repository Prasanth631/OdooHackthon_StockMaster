package com.stockmaster.controller;

import com.stockmaster.entity.Receipt;
import com.stockmaster.service.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/receipts")
@CrossOrigin(origins = "http://localhost:3000")
public class ReceiptController {
    
    @Autowired
    private ReceiptService receiptService;
    
    @GetMapping
    public ResponseEntity<List<Receipt>> getAllReceipts() {
        return ResponseEntity.ok(receiptService.getAllReceipts());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getReceiptById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(receiptService.getReceiptById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createReceipt(@RequestBody Receipt receipt) {
        try {
            return ResponseEntity.ok(receiptService.createReceipt(receipt));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/{id}/validate")
    public ResponseEntity<?> validateReceipt(@PathVariable Long id, @RequestParam Long userId) {
        try {
            return ResponseEntity.ok(receiptService.validateReceipt(id, userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReceipt(@PathVariable Long id) {
        try {
            receiptService.deleteReceipt(id);
            return ResponseEntity.ok("Receipt deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}