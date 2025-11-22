package com.stockmaster.repository;

@Repository
public interface ReorderRuleRepository extends JpaRepository<ReorderRule, Long> {
    List<ReorderRule> findByProduct(Product product);
    List<ReorderRule> findByWarehouse(Warehouse warehouse);
    Optional<ReorderRule> findByProductAndWarehouse(Product product, Warehouse warehouse);
    List<ReorderRule> findByActiveTrue();
}