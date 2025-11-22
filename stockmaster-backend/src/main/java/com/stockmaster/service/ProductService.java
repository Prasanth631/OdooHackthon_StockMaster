package com.stockmaster.service;

import com.stockmaster.dto.ProductDTO;
import com.stockmaster.entity.Product;
import com.stockmaster.entity.Category;
import com.stockmaster.repository.ProductRepository;
import com.stockmaster.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));
        return convertToDTO(product);
    }
    
    @Transactional
    public ProductDTO createProduct(ProductDTO dto) {
        if (productRepository.existsBySku(dto.getSku())) {
            throw new RuntimeException("SKU already exists");
        }
        
        Product product = new Product();
        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setUnitOfMeasure(dto.getUnitOfMeasure());
        product.setDescription(dto.getDescription());
        product.setInitialStock(dto.getInitialStock());
        product.setCurrentStock(dto.getInitialStock() != null ? dto.getInitialStock() : dto.getCurrentStock());
        product.setCostPrice(dto.getCostPrice());
        product.setSellingPrice(dto.getSellingPrice());
        product.setActive(true);
        
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }
        
        product = productRepository.save(product);
        return convertToDTO(product);
    }
    
    @Transactional
    public ProductDTO updateProduct(Long id, ProductDTO dto) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));
        
        product.setName(dto.getName());
        product.setUnitOfMeasure(dto.getUnitOfMeasure());
        product.setDescription(dto.getDescription());
        product.setCostPrice(dto.getCostPrice());
        product.setSellingPrice(dto.getSellingPrice());
        
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }
        
        product = productRepository.save(product);
        return convertToDTO(product);
    }
    
    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setActive(false);
        productRepository.save(product);
    }
    
    public List<ProductDTO> searchProducts(String keyword) {
        return productRepository.searchProducts(keyword).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setSku(product.getSku());
        dto.setUnitOfMeasure(product.getUnitOfMeasure());
        dto.setDescription(product.getDescription());
        dto.setInitialStock(product.getInitialStock());
        dto.setCurrentStock(product.getCurrentStock());
        dto.setCostPrice(product.getCostPrice());
        dto.setSellingPrice(product.getSellingPrice());
        dto.setActive(product.getActive());
        
        if (product.getCategory() != null) {
            dto.setCategoryId(product.getCategory().getId());
            dto.setCategoryName(product.getCategory().getName());
        }
        
        return dto;
    }
}