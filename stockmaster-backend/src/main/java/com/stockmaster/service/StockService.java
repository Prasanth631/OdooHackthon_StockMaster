package com.stockmaster.service;

import com.stockmaster.entity.*;
import com.stockmaster.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class StockService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private StockLedgerRepository stockLedgerRepository;
    
    @Transactional
    public void updateStock(Product product, Warehouse warehouse, Location location, 
                           BigDecimal quantity, StockLedger.TransactionType type, 
                           String referenceNumber, String referenceType, User user, String notes) {
        
        BigDecimal quantityBefore = product.getCurrentStock();
        BigDecimal quantityAfter = quantityBefore.add(quantity);
        
        product.setCurrentStock(quantityAfter);
        productRepository.save(product);
        
        StockLedger ledger = new StockLedger();
        ledger.setProduct(product);
        ledger.setWarehouse(warehouse);
        ledger.setLocation(location);
        ledger.setTransactionType(type);
        ledger.setReferenceNumber(referenceNumber);
        ledger.setReferenceType(referenceType);
        ledger.setQuantityBefore(quantityBefore);
        ledger.setQuantityChange(quantity);
        ledger.setQuantityAfter(quantityAfter);
        ledger.setUser(user);
        ledger.setNotes(notes);
        ledger.setTransactionDate(LocalDateTime.now());
        
        stockLedgerRepository.save(ledger);
    }
}