package com.stockmaster.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockmaster.entity.Adjustment;
import com.stockmaster.entity.AdjustmentLine;
import com.stockmaster.entity.Product;

@Repository
public interface AdjustmentLineRepository extends JpaRepository<AdjustmentLine, Long> {
    List<AdjustmentLine> findByAdjustment(Adjustment adjustment);
    List<AdjustmentLine> findByProduct(Product product);
}