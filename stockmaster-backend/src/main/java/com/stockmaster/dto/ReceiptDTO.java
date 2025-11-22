package com.stockmaster.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.math.BigDecimal;

@Data
public class ReceiptDTO {
    
    private Long id;
    private String receiptNumber;
    private Long warehouseId;
    private String warehouseName;
    private Long locationId;
    private String locationName;
    private String supplierName;
    private String supplierReference;
    private String status; // DRAFT, WAITING, READY, DONE, CANCELLED
    private LocalDateTime scheduledDate;
    private LocalDateTime receivedDate;
    private Long createdById;
    private String createdByName;
    private Long validatedById;
    private String validatedByName;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ReceiptLineDTO> lines;
    
    @Data
    public static class ReceiptLineDTO {
        private Long id;
        private Long productId;
        private String productName;
        private String productSku;
        private BigDecimal quantityOrdered;
        private BigDecimal quantityReceived;
        private BigDecimal unitPrice;
        private String batchNumber;
        private String serialNumber;
        private String notes;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getReceiptNumber() {
        return receiptNumber;
    }
    
    public void setReceiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
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
    
    public String getSupplierName() {
        return supplierName;
    }
    
    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }
    
    public String getSupplierReference() {
        return supplierReference;
    }
    
    public void setSupplierReference(String supplierReference) {
        this.supplierReference = supplierReference;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public LocalDateTime getScheduledDate() {
        return scheduledDate;
    }
    
    public void setScheduledDate(LocalDateTime scheduledDate) {
        this.scheduledDate = scheduledDate;
    }
    
    public LocalDateTime getReceivedDate() {
        return receivedDate;
    }
    
    public void setReceivedDate(LocalDateTime receivedDate) {
        this.receivedDate = receivedDate;
    }
    
    public Long getCreatedById() {
        return createdById;
    }
    
    public void setCreatedById(Long createdById) {
        this.createdById = createdById;
    }
    
    public String getCreatedByName() {
        return createdByName;
    }
    
    public void setCreatedByName(String createdByName) {
        this.createdByName = createdByName;
    }
    
    public Long getValidatedById() {
        return validatedById;
    }
    
    public void setValidatedById(Long validatedById) {
        this.validatedById = validatedById;
    }
    
    public String getValidatedByName() {
        return validatedByName;
    }
    
    public void setValidatedByName(String validatedByName) {
        this.validatedByName = validatedByName;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public List<ReceiptLineDTO> getLines() {
        return lines;
    }
    
    public void setLines(List<ReceiptLineDTO> lines) {
        this.lines = lines;
    }
}