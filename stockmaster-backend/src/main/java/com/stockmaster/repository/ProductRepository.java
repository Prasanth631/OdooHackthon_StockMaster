package com.stockmaster.repository;

import com.stockmaster.entity.Product;
import com.stockmaster.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findBySku(String sku);
    Boolean existsBySku(String sku);
    List<Product> findByCategory(Category category);
    List<Product> findByActiveTrue();
    
    @Query("SELECT p FROM Product p WHERE p.currentStock <= :threshold")
    List<Product> findLowStockProducts(BigDecimal threshold);
    
    @Query("SELECT p FROM Product p WHERE p.currentStock = 0")
    List<Product> findOutOfStockProducts();
    
    @Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword% OR p.sku LIKE %:keyword%")
    List<Product> searchProducts(String keyword);
}