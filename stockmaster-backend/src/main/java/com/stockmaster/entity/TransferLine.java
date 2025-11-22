package com.stockmaster.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "transfer_lines")
@Data
public class TransferLine {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transfer_id", nullable = false)
    private Transfer transfer;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal quantity;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal quantityTransferred = BigDecimal.ZERO;
    
    private String batchNumber;
    
    private String serialNumber;
    
    private String notes;
}