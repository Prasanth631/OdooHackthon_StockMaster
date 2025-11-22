package com.stockmaster.repository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockmaster.entity.Adjustment;
import com.stockmaster.entity.Receipt;
import com.stockmaster.entity.Warehouse;

@Repository
public interface AdjustmentRepository extends JpaRepository<Adjustment, Long> {
    Optional<Adjustment> findByAdjustmentNumber(String adjustmentNumber);
    List<Adjustment> findByStatus(Receipt.DocumentStatus status);
    List<Adjustment> findByWarehouse(Warehouse warehouse);
    List<Adjustment> findByType(Adjustment.AdjustmentType type);
}