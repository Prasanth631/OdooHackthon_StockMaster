package com.stockmaster.repository;

@Repository
public interface TransferLineRepository extends JpaRepository<TransferLine, Long> {
    List<TransferLine> findByTransfer(Transfer transfer);
    List<TransferLine> findByProduct(Product product);
}