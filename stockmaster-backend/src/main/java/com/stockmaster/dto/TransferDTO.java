package com.stockmaster.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.math.BigDecimal;

@Data
public class TransferDTO {
    
    private Long id;
    private String transferNumber;
    private Long sourceWarehouseId;
    private String sourceWarehouseName;
    private Long sourceLocationId;
    private String sourceLocationName;
    private Long destinationWarehouseId;
    private String destinationWarehouseName;
    private Long destinationLocationId;
    private String destinationLocationName;
    private String status; // DRAFT, WAITING, READY, DONE, CANCELLED
    private LocalDateTime scheduledDate;
    private LocalDateTime transferredDate;
    private Long createdById;
    private String createdByName;
    private Long validatedById;
    private String validatedByName;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<TransferLineDTO> lines;
    
    @Data
    public static class TransferLineDTO {
        private Long id;
        private Long productId;
        private String productName;
        private String productSku;
        private BigDecimal quantity;
        private BigDecimal quantityTransferred;
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
    
    public String getTransferNumber() {
        return transferNumber;
    }
    
    public void setTransferNumber(String transferNumber) {
        this.transferNumber = transferNumber;
    }
    
    public Long getSourceWarehouseId() {
        return sourceWarehouseId;
    }
    
    public void setSourceWarehouseId(Long sourceWarehouseId) {
        this.sourceWarehouseId = sourceWarehouseId;
    }
    
    public String getSourceWarehouseName() {
        return sourceWarehouseName;
    }
    
    public void setSourceWarehouseName(String sourceWarehouseName) {
        this.sourceWarehouseName = sourceWarehouseName;
    }
    
    public Long getSourceLocationId() {
        return sourceLocationId;
    }
    
    public void setSourceLocationId(Long sourceLocationId) {
        this.sourceLocationId = sourceLocationId;
    }
    
    public String getSourceLocationName() {
        return sourceLocationName;
    }
    
    public void setSourceLocationName(String sourceLocationName) {
        this.sourceLocationName = sourceLocationName;
    }
    
    public Long getDestinationWarehouseId() {
        return destinationWarehouseId;
    }
    
    public void setDestinationWarehouseId(Long destinationWarehouseId) {
        this.destinationWarehouseId = destinationWarehouseId;
    }
    
    public String getDestinationWarehouseName() {
        return destinationWarehouseName;
    }
    
    public void setDestinationWarehouseName(String destinationWarehouseName) {
        this.destinationWarehouseName = destinationWarehouseName;
    }
    
    public Long getDestinationLocationId() {
        return destinationLocationId;
    }
    
    public void setDestinationLocationId(Long destinationLocationId) {
        this.destinationLocationId = destinationLocationId;
    }
    
    public String getDestinationLocationName() {
        return destinationLocationName;
    }
    
    public void setDestinationLocationName(String destinationLocationName) {
        this.destinationLocationName = destinationLocationName;
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
    
    public LocalDateTime getTransferredDate() {
        return transferredDate;
    }
    
    public void setTransferredDate(LocalDateTime transferredDate) {
        this.transferredDate = transferredDate;
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
    
    public List<TransferLineDTO> getLines() {
        return lines;
    }
    
    public void setLines(List<TransferLineDTO> lines) {
        this.lines = lines;
    }
}