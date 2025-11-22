package com.stockmaster.repository;

@Repository
public interface StockLedgerRepository extends JpaRepository<StockLedger, Long> {
    List<StockLedger> findByProduct(Product product);
    List<StockLedger> findByWarehouse(Warehouse warehouse);
    List<StockLedger> findByProductAndWarehouse(Product product, Warehouse warehouse);
    
    @Query("SELECT sl FROM StockLedger sl WHERE sl.product = :product ORDER BY sl.transactionDate DESC")
    List<StockLedger> findByProductOrderByTransactionDateDesc(Product product);
}