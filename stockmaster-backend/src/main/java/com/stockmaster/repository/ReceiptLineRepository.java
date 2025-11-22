package com.stockmaster.repository;

@Repository
public interface ReceiptLineRepository extends JpaRepository<ReceiptLine, Long> {
    List<ReceiptLine> findByReceipt(Receipt receipt);
    List<ReceiptLine> findByProduct(Product product);
}