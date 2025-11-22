package com.stockmaster.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock_ledger")
@Data
public class StockLedger {
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Warehouse getWarehouse() {
		return warehouse;
	}

	public void setWarehouse(Warehouse warehouse) {
		this.warehouse = warehouse;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public TransactionType getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(TransactionType transactionType) {
		this.transactionType = transactionType;
	}

	public String getReferenceNumber() {
		return referenceNumber;
	}

	public void setReferenceNumber(String referenceNumber) {
		this.referenceNumber = referenceNumber;
	}

	public String getReferenceType() {
		return referenceType;
	}

	public void setReferenceType(String referenceType) {
		this.referenceType = referenceType;
	}

	public BigDecimal getQuantityBefore() {
		return quantityBefore;
	}

	public void setQuantityBefore(BigDecimal quantityBefore) {
		this.quantityBefore = quantityBefore;
	}

	public BigDecimal getQuantityChange() {
		return quantityChange;
	}

	public void setQuantityChange(BigDecimal quantityChange) {
		this.quantityChange = quantityChange;
	}

	public BigDecimal getQuantityAfter() {
		return quantityAfter;
	}

	public void setQuantityAfter(BigDecimal quantityAfter) {
		this.quantityAfter = quantityAfter;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public LocalDateTime getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(LocalDateTime transactionDate) {
		this.transactionDate = transactionDate;
	}

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id", nullable = false)
    private Warehouse warehouse;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType transactionType;
    
    private String referenceNumber;
    
    private String referenceType;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal quantityBefore;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal quantityChange;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal quantityAfter;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    private String notes;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime transactionDate = LocalDateTime.now();
    
    public enum TransactionType {
        RECEIPT,
        DELIVERY,
        TRANSFER_IN,
        TRANSFER_OUT,
        ADJUSTMENT
    }
}