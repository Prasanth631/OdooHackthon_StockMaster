package com.stockmaster.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockmaster.entity.Product;
import com.stockmaster.entity.ReorderRule;
import com.stockmaster.entity.Warehouse;

@Repository
public interface ReorderRuleRepository extends JpaRepository<ReorderRule, Long> {
    List<ReorderRule> findByProduct(Product product);
    List<ReorderRule> findByWarehouse(Warehouse warehouse);
    Optional<ReorderRule> findByProductAndWarehouse(Product product, Warehouse warehouse);
    List<ReorderRule> findByActiveTrue();
}