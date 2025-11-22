package com.stockmaster.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String sku;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
    
    @Column(nullable = false)
    private String unitOfMeasure;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal initialStock;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal currentStock = BigDecimal.ZERO;
    
    private String description;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal costPrice;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal sellingPrice;
    
    @Column(nullable = false)
    private Boolean active = true;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}