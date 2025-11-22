package com.stockmaster.repository;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, Long> {
    Optional<Receipt> findByReceiptNumber(String receiptNumber);
    List<Receipt> findByStatus(Receipt.DocumentStatus status);
    List<Receipt> findByWarehouse(Warehouse warehouse);
    
    @Query("SELECT COUNT(r) FROM Receipt r WHERE r.status IN ('WAITING', 'READY')")
    Long countPendingReceipts();
}