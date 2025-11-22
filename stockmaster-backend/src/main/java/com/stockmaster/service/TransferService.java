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
public class TransferService {
    
    @Autowired
    private TransferRepository transferRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private StockService stockService;
    
    public List<Transfer> getAllTransfers() {
        return transferRepository.findAll();
    }
    
    public Transfer getTransferById(Long id) {
        return transferRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Transfer not found"));
    }
    
    @Transactional
    public Transfer createTransfer(Transfer transfer) {
        transfer.setTransferNumber("TRF-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        transfer.setStatus(Receipt.DocumentStatus.DRAFT);
        transfer.setCreatedAt(LocalDateTime.now());
        return transferRepository.save(transfer);
    }
    
    @Transactional
    public Transfer validateTransfer(Long transferId, Long userId) {
        Transfer transfer = transferRepository.findById(transferId)
            .orElseThrow(() -> new RuntimeException("Transfer not found"));
        
        if (transfer.getStatus() == Receipt.DocumentStatus.DONE) {
            throw new RuntimeException("Transfer already validated");
        }
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        transfer.getLines().forEach(line -> {
            stockService.updateStock(
                line.getProduct(),
                transfer.getSourceWarehouse(),
                transfer.getSourceLocation(),
                line.getQuantityTransferred().negate(),
                StockLedger.TransactionType.TRANSFER_OUT,
                transfer.getTransferNumber(),
                "Transfer",
                user,
                "Transfer from source"
            );
            
            stockService.updateStock(
                line.getProduct(),
                transfer.getDestinationWarehouse(),
                transfer.getDestinationLocation(),
                line.getQuantityTransferred(),
                StockLedger.TransactionType.TRANSFER_IN,
                transfer.getTransferNumber(),
                "Transfer",
                user,
                "Transfer to destination"
            );
        });
        
        transfer.setStatus(Receipt.DocumentStatus.DONE);
        transfer.setValidatedBy(user);
        transfer.setTransferredDate(LocalDateTime.now());
        
        return transferRepository.save(transfer);
    }
    
    @Transactional
    public void deleteTransfer(Long id) {
        Transfer transfer = transferRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Transfer not found"));
        
        if (transfer.getStatus() == Receipt.DocumentStatus.DONE) {
            throw new RuntimeException("Cannot delete validated transfer");
        }
        
        transferRepository.delete(transfer);
    }
}