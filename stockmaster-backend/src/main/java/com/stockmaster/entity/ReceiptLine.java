package com.stockmaster.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "receipt_lines")
@Data
public class ReceiptLine {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receipt_id", nullable = false)
    private Receipt receipt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal quantityOrdered;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal quantityReceived = BigDecimal.ZERO;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal unitPrice;
    
    private String batchNumber;
    
    private String serialNumber;
    
    private String notes;
}