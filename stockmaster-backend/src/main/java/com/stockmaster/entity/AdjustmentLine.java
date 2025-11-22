package com.stockmaster.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "adjustment_lines")
@Data
public class AdjustmentLine {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "adjustment_id", nullable = false)
    private Adjustment adjustment;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal systemQuantity;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal countedQuantity;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal differenceQuantity;
    
    private String batchNumber;
    
    private String serialNumber;
    
    private String notes;
}