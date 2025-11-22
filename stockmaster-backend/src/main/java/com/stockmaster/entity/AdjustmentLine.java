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
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Adjustment getAdjustment() {
		return adjustment;
	}

	public void setAdjustment(Adjustment adjustment) {
		this.adjustment = adjustment;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public BigDecimal getSystemQuantity() {
		return systemQuantity;
	}

	public void setSystemQuantity(BigDecimal systemQuantity) {
		this.systemQuantity = systemQuantity;
	}

	public BigDecimal getCountedQuantity() {
		return countedQuantity;
	}

	public void setCountedQuantity(BigDecimal countedQuantity) {
		this.countedQuantity = countedQuantity;
	}

	public BigDecimal getDifferenceQuantity() {
		return differenceQuantity;
	}

	public void setDifferenceQuantity(BigDecimal differenceQuantity) {
		this.differenceQuantity = differenceQuantity;
	}

	public String getBatchNumber() {
		return batchNumber;
	}

	public void setBatchNumber(String batchNumber) {
		this.batchNumber = batchNumber;
	}

	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	@Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal differenceQuantity;
    
    private String batchNumber;
    
    private String serialNumber;
    
    private String notes;
}