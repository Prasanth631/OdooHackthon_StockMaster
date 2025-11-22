package com.stockmaster.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;

@Data
public class ProductDTO {

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getUnitOfMeasure() {
		return unitOfMeasure;
	}

	public void setUnitOfMeasure(String unitOfMeasure) {
		this.unitOfMeasure = unitOfMeasure;
	}

	public BigDecimal getInitialStock() {
		return initialStock;
	}

	public void setInitialStock(BigDecimal initialStock) {
		this.initialStock = initialStock;
	}

	public BigDecimal getCurrentStock() {
		return currentStock;
	}

	public void setCurrentStock(BigDecimal currentStock) {
		this.currentStock = currentStock;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getCostPrice() {
		return costPrice;
	}

	public void setCostPrice(BigDecimal costPrice) {
		this.costPrice = costPrice;
	}

	public BigDecimal getSellingPrice() {
		return sellingPrice;
	}

	public void setSellingPrice(BigDecimal sellingPrice) {
		this.sellingPrice = sellingPrice;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String sku;

    private Long categoryId;
    private String categoryName;

    @NotBlank
    private String unitOfMeasure;

    private BigDecimal initialStock;
    private BigDecimal currentStock;

    private String description;

    private BigDecimal costPrice;
    private BigDecimal sellingPrice;

    private Boolean active;
}
