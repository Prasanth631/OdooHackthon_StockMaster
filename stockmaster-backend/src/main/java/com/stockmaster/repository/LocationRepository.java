package com.stockmaster.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockmaster.entity.Location;
import com.stockmaster.entity.Warehouse;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findByCode(String code);
    Boolean existsByCode(String code);
    List<Location> findByWarehouse(Warehouse warehouse);
    List<Location> findByActiveTrue();
}