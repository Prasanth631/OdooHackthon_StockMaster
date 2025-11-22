package com.stockmaster.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class StockLedgerDTO {
    
    private Long id;
    private Long productId;
    private String productName;
    private String productSku;
    private Long warehouseId;
    private String warehouseName;
    private Long locationId;
    private String locationName;
    private String transactionType; // RECEIPT, DELIVERY, TRANSFER_IN, TRANSFER_OUT, ADJUSTMENT
    private String referenceNumber;
    private String referenceType;
    private BigDecimal quantityBefore;
    private BigDecimal quantityChange;
    private BigDecimal quantityAfter;
    private Long userId;
    private String userName;
    private String notes;
    private LocalDateTime transactionDate;
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getProductId() {
        return productId;
    }
    
    public void setProductId(Long productId) {
        this.productId = productId;
    }
    
    public String getProductName() {
        return productName;
    }
    
    public void setProductName(String productName) {
        this.productName = productName;
    }
    
    public String getProductSku() {
        return productSku;
    }
    
    public void setProductSku(String productSku) {
        this.productSku = productSku;
    }
    
    public Long getWarehouseId() {
        return warehouseId;
    }
    
    public void setWarehouseId(Long warehouseId) {
        this.warehouseId = warehouseId;
    }
    
    public String getWarehouseName() {
        return warehouseName;
    }
    
    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }
    
    public Long getLocationId() {
        return locationId;
    }
    
    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }
    
    public String getLocationName() {
        return locationName;
    }
    
    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }
    
    public String getTransactionType() {
        return transactionType;
    }
    
    public void setTransactionType(String transactionType) {
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
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
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
}