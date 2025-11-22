package com.stockmaster.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "delivery_lines")
@Data
public class DeliveryLine {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_id", nullable = false)
    private Delivery delivery;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal quantityOrdered;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal quantityDelivered = BigDecimal.ZERO;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal unitPrice;
    
    private String batchNumber;
    
    private String serialNumber;
    
    private String notes;
}