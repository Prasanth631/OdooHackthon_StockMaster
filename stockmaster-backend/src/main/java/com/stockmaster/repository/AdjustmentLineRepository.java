package com.stockmaster.repository;

@Repository
public interface AdjustmentLineRepository extends JpaRepository<AdjustmentLine, Long> {
    List<AdjustmentLine> findByAdjustment(Adjustment adjustment);
    List<AdjustmentLine> findByProduct(Product product);
}