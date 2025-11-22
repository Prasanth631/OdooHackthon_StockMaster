package com.stockmaster.repository;

@Repository
public interface DeliveryLineRepository extends JpaRepository<DeliveryLine, Long> {
    List<DeliveryLine> findByDelivery(Delivery delivery);
    List<DeliveryLine> findByProduct(Product product);
}