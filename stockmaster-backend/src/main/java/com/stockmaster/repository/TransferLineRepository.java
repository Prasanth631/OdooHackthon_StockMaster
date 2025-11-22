package com.stockmaster.repository;

import org.hibernate.mapping.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockmaster.entity.Transfer;
import com.stockmaster.entity.TransferLine;

@Repository
public interface TransferLineRepository extends JpaRepository<TransferLine, Long> {
    List<TransferLine> findByTransfer(Transfer transfer);
    List<TransferLine> findByProduct(Product product);
}