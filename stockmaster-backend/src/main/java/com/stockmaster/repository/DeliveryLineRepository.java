package com.stockmaster.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockmaster.entity.Delivery;
import com.stockmaster.entity.DeliveryLine;
import com.stockmaster.entity.Product;

@Repository
public interface DeliveryLineRepository extends JpaRepository<DeliveryLine, Long> {
    List<DeliveryLine> findByDelivery(Delivery delivery);
    List<DeliveryLine> findByProduct(Product product);
}