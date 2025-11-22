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
public class ReceiptService {
    
    @Autowired
    private ReceiptRepository receiptRepository;
    
    @Autowired
    private WarehouseRepository warehouseRepository;
    
    @Autowired
    private LocationRepository locationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private StockService stockService;
    
    public List<Receipt> getAllReceipts() {
        return receiptRepository.findAll();
    }
    
    public Receipt getReceiptById(Long id) {
        return receiptRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Receipt not found"));
    }
    
    @Transactional
    public Receipt createReceipt(Receipt receipt) {
        receipt.setReceiptNumber("REC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        receipt.setStatus(Receipt.DocumentStatus.DRAFT);
        receipt.setCreatedAt(LocalDateTime.now());
        return receiptRepository.save(receipt);
    }
    
    @Transactional
    public Receipt validateReceipt(Long receiptId, Long userId) {
        Receipt receipt = receiptRepository.findById(receiptId)
            .orElseThrow(() -> new RuntimeException("Receipt not found"));
        
        if (receipt.getStatus() == Receipt.DocumentStatus.DONE) {
            throw new RuntimeException("Receipt already validated");
        }
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        receipt.getLines().forEach(line -> {
            stockService.updateStock(
                line.getProduct(),
                receipt.getWarehouse(),
                receipt.getLocation(),
                line.getQuantityReceived(),
                StockLedger.TransactionType.RECEIPT,
                receipt.getReceiptNumber(),
                "Receipt",
                user,
                "Receipt validated"
            );
        });
        
        receipt.setStatus(Receipt.DocumentStatus.DONE);
        receipt.setValidatedBy(user);
        receipt.setReceivedDate(LocalDateTime.now());
        
        return receiptRepository.save(receipt);
    }
    
    @Transactional
    public void deleteReceipt(Long id) {
        Receipt receipt = receiptRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Receipt not found"));
        
        if (receipt.getStatus() == Receipt.DocumentStatus.DONE) {
            throw new RuntimeException("Cannot delete validated receipt");
        }
        
        receiptRepository.delete(receipt);
    }
}