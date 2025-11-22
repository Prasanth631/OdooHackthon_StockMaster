package com.stockmaster.service;

import com.stockmaster.dto.*;
import com.stockmaster.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;

@Service
public class DashboardService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private ReceiptRepository receiptRepository;
    
    @Autowired
    private DeliveryRepository deliveryRepository;
    
    @Autowired
    private TransferRepository transferRepository;
    
    public DashboardKPI getDashboardKPIs() {
        Long totalProducts = productRepository.count();
        Long lowStockItems = (long) productRepository.findLowStockProducts(BigDecimal.valueOf(10)).size();
        Long outOfStockItems = (long) productRepository.findOutOfStockProducts().size();
        Long pendingReceipts = receiptRepository.countPendingReceipts();
        Long pendingDeliveries = deliveryRepository.countPendingDeliveries();
        Long scheduledTransfers = transferRepository.countScheduledTransfers();
        
        return new DashboardKPI(
            totalProducts,
            lowStockItems,
            outOfStockItems,
            pendingReceipts,
            pendingDeliveries,
            scheduledTransfers
        );
    }
}