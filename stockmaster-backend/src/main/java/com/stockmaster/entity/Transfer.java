package com.stockmaster.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "transfers")
@Data
public class Transfer {
    
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

	public Warehouse getSourceWarehouse() {
		return sourceWarehouse;
	}

	public void setSourceWarehouse(Warehouse sourceWarehouse) {
		this.sourceWarehouse = sourceWarehouse;
	}

	public Location getSourceLocation() {
		return sourceLocation;
	}

	public void setSourceLocation(Location sourceLocation) {
		this.sourceLocation = sourceLocation;
	}

	public Warehouse getDestinationWarehouse() {
		return destinationWarehouse;
	}

	public void setDestinationWarehouse(Warehouse destinationWarehouse) {
		this.destinationWarehouse = destinationWarehouse;
	}

	public Location getDestinationLocation() {
		return destinationLocation;
	}

	public void setDestinationLocation(Location destinationLocation) {
		this.destinationLocation = destinationLocation;
	}

	public Receipt.DocumentStatus getStatus() {
		return status;
	}

	public void setStatus(Receipt.DocumentStatus status) {
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

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public User getValidatedBy() {
		return validatedBy;
	}

	public void setValidatedBy(User validatedBy) {
		this.validatedBy = validatedBy;
	}

	public List<TransferLine> getLines() {
		return lines;
	}

	public void setLines(List<TransferLine> lines) {
		this.lines = lines;
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

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String transferNumber;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "source_warehouse_id", nullable = false)
    private Warehouse sourceWarehouse;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "source_location_id", nullable = false)
    private Location sourceLocation;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_warehouse_id", nullable = false)
    private Warehouse destinationWarehouse;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_location_id", nullable = false)
    private Location destinationLocation;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Receipt.DocumentStatus status = Receipt.DocumentStatus.DRAFT;
    
    private LocalDateTime scheduledDate;
    
    private LocalDateTime transferredDate;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "validated_by")
    private User validatedBy;
    
    @OneToMany(mappedBy = "transfer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TransferLine> lines = new ArrayList<>();
    
    private String notes;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}