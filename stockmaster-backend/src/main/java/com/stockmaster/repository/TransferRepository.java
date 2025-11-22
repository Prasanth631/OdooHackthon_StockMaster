package com.stockmaster.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.stockmaster.entity.Receipt;
import com.stockmaster.entity.Transfer;
import com.stockmaster.entity.Warehouse;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {
    Optional<Transfer> findByTransferNumber(String transferNumber);
    List<Transfer> findByStatus(Receipt.DocumentStatus status);
    List<Transfer> findBySourceWarehouse(Warehouse warehouse);
    List<Transfer> findByDestinationWarehouse(Warehouse warehouse);
    
    @Query("SELECT COUNT(t) FROM Transfer t WHERE t.status IN ('WAITING', 'READY')")
    Long countScheduledTransfers();
}