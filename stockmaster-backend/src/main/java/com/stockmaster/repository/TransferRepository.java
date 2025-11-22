package com.stockmaster.repository;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {
    Optional<Transfer> findByTransferNumber(String transferNumber);
    List<Transfer> findByStatus(Receipt.DocumentStatus status);
    List<Transfer> findBySourceWarehouse(Warehouse warehouse);
    List<Transfer> findByDestinationWarehouse(Warehouse warehouse);
    
    @Query("SELECT COUNT(t) FROM Transfer t WHERE t.status IN ('WAITING', 'READY')")
    Long countScheduledTransfers();
}