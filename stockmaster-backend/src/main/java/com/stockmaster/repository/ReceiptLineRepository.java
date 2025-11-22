package com.stockmaster.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockmaster.entity.Product;
import com.stockmaster.entity.Receipt;
import com.stockmaster.entity.ReceiptLine;

@Repository
public interface ReceiptLineRepository extends JpaRepository<ReceiptLine, Long> {
    List<ReceiptLine> findByReceipt(Receipt receipt);
    List<ReceiptLine> findByProduct(Product product);
}