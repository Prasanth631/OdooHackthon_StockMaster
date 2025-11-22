package com.stockmaster.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.math.BigDecimal;

@Data
public class DeliveryDTO {
    
    private Long id;
    private String deliveryNumber;
    private Long warehouseId;
    private String warehouseName;
    private Long locationId;
    private String locationName;
    private String customerName;
    private String customerReference;
    private String shippingAddress;
    private String status; // DRAFT, WAITING, READY, DONE, CANCELLED
    private LocalDateTime scheduledDate;
    private LocalDateTime deliveredDate;
    private Long createdById;
    private String createdByName;
    private Long validatedById;
    private String validatedByName;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<DeliveryLineDTO> lines;
    
    @Data
    public static class DeliveryLineDTO {
        private Long id;
        private Long productId;
        private String productName;
        private String productSku;
        private BigDecimal quantityOrdered;
        private BigDecimal quantityDelivered;
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
    
    public String getDeliveryNumber() {
        return deliveryNumber;
    }
    
    public void setDeliveryNumber(String deliveryNumber) {
        this.deliveryNumber = deliveryNumber;
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
    
    public String getCustomerName() {
        return customerName;
    }
    
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    
    public String getCustomerReference() {
        return customerReference;
    }
    
    public void setCustomerReference(String customerReference) {
        this.customerReference = customerReference;
    }
    
    public String getShippingAddress() {
        return shippingAddress;
    }
    
    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
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
    
    public LocalDateTime getDeliveredDate() {
        return deliveredDate;
    }
    
    public void setDeliveredDate(LocalDateTime deliveredDate) {
        this.deliveredDate = deliveredDate;
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
    
    public List<DeliveryLineDTO> getLines() {
        return lines;
    }
    
    public void setLines(List<DeliveryLineDTO> lines) {
        this.lines = lines;
    }
}