package com.stockmaster.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.math.BigDecimal;

@Data
public class AdjustmentDTO {
    
    private Long id;
    private String adjustmentNumber;
    private Long warehouseId;
    private String warehouseName;
    private Long locationId;
    private String locationName;
    private String type; // PHYSICAL_COUNT, DAMAGE, LOSS, FOUND, OTHER
    private String status; // DRAFT, WAITING, READY, DONE, CANCELLED
    private String reason;
    private LocalDateTime adjustmentDate;
    private Long createdById;
    private String createdByName;
    private Long validatedById;
    private String validatedByName;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<AdjustmentLineDTO> lines;
    
    @Data
    public static class AdjustmentLineDTO {
        private Long id;
        private Long productId;
        private String productName;
        private String productSku;
        private BigDecimal systemQuantity;
        private BigDecimal countedQuantity;
        private BigDecimal differenceQuantity;
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
    
    public String getAdjustmentNumber() {
        return adjustmentNumber;
    }
    
    public void setAdjustmentNumber(String adjustmentNumber) {
        this.adjustmentNumber = adjustmentNumber;
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
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getReason() {
        return reason;
    }
    
    public void setReason(String reason) {
        this.reason = reason;
    }
    
    public LocalDateTime getAdjustmentDate() {
        return adjustmentDate;
    }
    
    public void setAdjustmentDate(LocalDateTime adjustmentDate) {
        this.adjustmentDate = adjustmentDate;
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
    
    public List<AdjustmentLineDTO> getLines() {
        return lines;
    }
    
    public void setLines(List<AdjustmentLineDTO> lines) {
        this.lines = lines;
    }
}