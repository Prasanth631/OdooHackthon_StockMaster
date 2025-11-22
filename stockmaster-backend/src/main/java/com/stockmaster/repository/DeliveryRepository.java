package com.stockmaster.repository;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    Optional<Delivery> findByDeliveryNumber(String deliveryNumber);
    List<Delivery> findByStatus(Receipt.DocumentStatus status);
    List<Delivery> findByWarehouse(Warehouse warehouse);
    
    @Query("SELECT COUNT(d) FROM Delivery d WHERE d.status IN ('WAITING', 'READY')")
    Long countPendingDeliveries();
}