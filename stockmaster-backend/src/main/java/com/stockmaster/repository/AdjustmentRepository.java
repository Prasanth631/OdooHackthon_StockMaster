package com.stockmaster.repository;

@Repository
public interface AdjustmentRepository extends JpaRepository<Adjustment, Long> {
    Optional<Adjustment> findByAdjustmentNumber(String adjustmentNumber);
    List<Adjustment> findByStatus(Receipt.DocumentStatus status);
    List<Adjustment> findByWarehouse(Warehouse warehouse);
    List<Adjustment> findByType(Adjustment.AdjustmentType type);
}