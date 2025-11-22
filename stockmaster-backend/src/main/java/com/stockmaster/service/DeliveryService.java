package com.stockmaster.service;

import com.stockmaster.entity.*;
import com.stockmaster.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class DeliveryService {
    
    @Autowired
    private DeliveryRepository deliveryRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private StockService stockService;
    
    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }
    
    public Delivery getDeliveryById(Long id) {
        return deliveryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Delivery not found"));
    }
    
    @Transactional
    public Delivery createDelivery(Delivery delivery) {
        delivery.setDeliveryNumber("DEL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        delivery.setStatus(Receipt.DocumentStatus.DRAFT);
        delivery.setCreatedAt(LocalDateTime.now());
        return deliveryRepository.save(delivery);
    }
    
    @Transactional
    public Delivery validateDelivery(Long deliveryId, Long userId) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
            .orElseThrow(() -> new RuntimeException("Delivery not found"));
        
        if (delivery.getStatus() == Receipt.DocumentStatus.DONE) {
            throw new RuntimeException("Delivery already validated");
        }
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        delivery.getLines().forEach(line -> {
            stockService.updateStock(
                line.getProduct(),
                delivery.getWarehouse(),
                delivery.getLocation(),
                line.getQuantityDelivered().negate(),
                StockLedger.TransactionType.DELIVERY,
                delivery.getDeliveryNumber(),
                "Delivery",
                user,
                "Delivery validated"
            );
        });
        
        delivery.setStatus(Receipt.DocumentStatus.DONE);
        delivery.setValidatedBy(user);
        delivery.setDeliveredDate(LocalDateTime.now());
        
        return deliveryRepository.save(delivery);
    }
    
    @Transactional
    public void deleteDelivery(Long id) {
        Delivery delivery = deliveryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Delivery not found"));
        
        if (delivery.getStatus() == Receipt.DocumentStatus.DONE) {
            throw new RuntimeException("Cannot delete validated delivery");
        }
        
        deliveryRepository.delete(delivery);
    }
}