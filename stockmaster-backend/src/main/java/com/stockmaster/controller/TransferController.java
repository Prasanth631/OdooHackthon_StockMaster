package com.stockmaster.controller;

import com.stockmaster.entity.Transfer;
import com.stockmaster.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transfers")
@CrossOrigin(origins = "http://localhost:3000")
public class TransferController {
    
    @Autowired
    private TransferService transferService;
    
    @GetMapping
    public ResponseEntity<List<Transfer>> getAllTransfers() {
        return ResponseEntity.ok(transferService.getAllTransfers());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getTransferById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(transferService.getTransferById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createTransfer(@RequestBody Transfer transfer) {
        try {
            return ResponseEntity.ok(transferService.createTransfer(transfer));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/{id}/validate")
    public ResponseEntity<?> validateTransfer(@PathVariable Long id, @RequestParam Long userId) {
        try {
            return ResponseEntity.ok(transferService.validateTransfer(id, userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransfer(@PathVariable Long id) {
        try {
            transferService.deleteTransfer(id);
            return ResponseEntity.ok("Transfer deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}