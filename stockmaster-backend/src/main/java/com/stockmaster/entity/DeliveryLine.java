package com.stockmaster.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "delivery_lines")
@Data
public class DeliveryLine {
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Delivery getDelivery() {
		return delivery;
	}

	public void setDelivery(Delivery delivery) {
		this.delivery = delivery;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public BigDecimal getQuantityOrdered() {
		return quantityOrdered;
	}

	public void setQuantityOrdered(BigDecimal quantityOrdered) {
		this.quantityOrdered = quantityOrdered;
	}

	public BigDecimal getQuantityDelivered() {
		return quantityDelivered;
	}

	public void setQuantityDelivered(BigDecimal quantityDelivered) {
		this.quantityDelivered = quantityDelivered;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
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