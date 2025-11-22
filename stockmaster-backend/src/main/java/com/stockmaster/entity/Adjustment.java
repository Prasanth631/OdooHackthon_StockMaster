package com.stockmaster.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "adjustments")
@Data
public class Adjustment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String adjustmentNumber;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id", nullable = false)
    private Warehouse warehouse;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AdjustmentType type;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Receipt.DocumentStatus status = Receipt.DocumentStatus.DRAFT;
    
    private String reason;
    
    private LocalDateTime adjustmentDate;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "validated_by")
    private User validatedBy;
    
    @OneToMany(mappedBy = "adjustment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AdjustmentLine> lines = new ArrayList<>();
    
    private String notes;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum AdjustmentType {
        PHYSICAL_COUNT,
        DAMAGE,
        LOSS,
        FOUND,
        OTHER
    }
}