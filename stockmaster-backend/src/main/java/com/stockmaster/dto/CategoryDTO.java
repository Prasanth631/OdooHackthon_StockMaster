package com.stockmaster.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class CategoryDTO {
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	private Long id;
    @NotBlank
    private String name;
    private String description;
}
