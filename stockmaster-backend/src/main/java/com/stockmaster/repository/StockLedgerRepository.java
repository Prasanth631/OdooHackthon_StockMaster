package com.stockmaster.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.stockmaster.entity.Product;
import com.stockmaster.entity.StockLedger;
import com.stockmaster.entity.Warehouse;

@Repository
public interface StockLedgerRepository extends JpaRepository<StockLedger, Long> {
    List<StockLedger> findByProduct(Product product);
    List<StockLedger> findByWarehouse(Warehouse warehouse);
    List<StockLedger> findByProductAndWarehouse(Product product, Warehouse warehouse);
    
    @Query("SELECT sl FROM StockLedger sl WHERE sl.product = :product ORDER BY sl.transactionDate DESC")
    List<StockLedger> findByProductOrderByTransactionDateDesc(Product product);
}