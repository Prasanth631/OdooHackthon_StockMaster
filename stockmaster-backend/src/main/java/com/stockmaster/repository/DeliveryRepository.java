package com.stockmaster.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.stockmaster.entity.Delivery;
import com.stockmaster.entity.Receipt;
import com.stockmaster.entity.Warehouse;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    Optional<Delivery> findByDeliveryNumber(String deliveryNumber);
    List<Delivery> findByStatus(Receipt.DocumentStatus status);
    List<Delivery> findByWarehouse(Warehouse warehouse);
    
    @Query("SELECT COUNT(d) FROM Delivery d WHERE d.status IN ('WAITING', 'READY')")
    Long countPendingDeliveries();
}