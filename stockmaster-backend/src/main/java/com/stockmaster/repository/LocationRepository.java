package com.stockmaster.repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findByCode(String code);
    Boolean existsByCode(String code);
    List<Location> findByWarehouse(Warehouse warehouse);
    List<Location> findByActiveTrue();
}