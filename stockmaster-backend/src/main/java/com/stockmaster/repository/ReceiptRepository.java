package com.stockmaster.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.stockmaster.entity.Receipt;
import com.stockmaster.entity.Warehouse;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, Long> {
    Optional<Receipt> findByReceiptNumber(String receiptNumber);
    List<Receipt> findByStatus(Receipt.DocumentStatus status);
    List<Receipt> findByWarehouse(Warehouse warehouse);
    
    @Query("SELECT COUNT(r) FROM Receipt r WHERE r.status IN ('WAITING', 'READY')")
    Long countPendingReceipts();
}