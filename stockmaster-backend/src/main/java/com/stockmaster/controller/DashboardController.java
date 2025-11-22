package com.stockmaster.controller;

import com.stockmaster.dto.DashboardKPI;
import com.stockmaster.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {
    
    @Autowired
    private DashboardService dashboardService;
    
    @GetMapping("/kpis")
    public ResponseEntity<DashboardKPI> getDashboardKPIs() {
        return ResponseEntity.ok(dashboardService.getDashboardKPIs());
    }
}