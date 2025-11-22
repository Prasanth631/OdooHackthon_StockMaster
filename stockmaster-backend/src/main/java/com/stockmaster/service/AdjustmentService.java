package com.stockmaster.service;

import com.stockmaster.entity.*;
import com.stockmaster.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class AdjustmentService {
    
    @Autowired
    private AdjustmentRepository adjustmentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private StockService stockService;
    
    public List<Adjustment> getAllAdjustments() {
        return adjustmentRepository.findAll();
    }
    
    public Adjustment getAdjustmentById(Long id) {
        return adjustmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Adjustment not found"));
    }
    
    @Transactional
    public Adjustment createAdjustment(Adjustment adjustment) {
        adjustment.setAdjustmentNumber("ADJ-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        adjustment.setStatus(Receipt.DocumentStatus.DRAFT);
        adjustment.setCreatedAt(LocalDateTime.now());
        return adjustmentRepository.save(adjustment);
    }
    
    @Transactional
    public Adjustment validateAdjustment(Long adjustmentId, Long userId) {
        Adjustment adjustment = adjustmentRepository.findById(adjustmentId)
            .orElseThrow(() -> new RuntimeException("Adjustment not found"));
        
        if (adjustment.getStatus() == Receipt.DocumentStatus.DONE) {
            throw new RuntimeException("Adjustment already validated");
        }
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        adjustment.getLines().forEach(line -> {
            stockService.updateStock(
                line.getProduct(),
                adjustment.getWarehouse(),
                adjustment.getLocation(),
                line.getDifferenceQuantity(),
                StockLedger.TransactionType.ADJUSTMENT,
                adjustment.getAdjustmentNumber(),
                "Adjustment",
                user,
                adjustment.getReason()
            );
        });
        
        adjustment.setStatus(Receipt.DocumentStatus.DONE);
        adjustment.setValidatedBy(user);
        adjustment.setAdjustmentDate(LocalDateTime.now());
        
        return adjustmentRepository.save(adjustment);
    }
    
    @Transactional
    public void deleteAdjustment(Long id) {
        Adjustment adjustment = adjustmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Adjustment not found"));
        
        if (adjustment.getStatus() == Receipt.DocumentStatus.DONE) {
            throw new RuntimeException("Cannot delete validated adjustment");
        }
        
        adjustmentRepository.delete(adjustment);
    }
}