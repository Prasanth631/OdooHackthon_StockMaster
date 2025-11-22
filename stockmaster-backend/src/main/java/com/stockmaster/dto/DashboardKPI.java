package com.stockmaster.dto;

public class DashboardKPI {

    private Long totalProducts;
    private Long lowStockItems;
    private Long outOfStockItems;
    private Long pendingReceipts;
    private Long pendingDeliveries;
    private Long scheduledTransfers;

    public DashboardKPI() {}

    public DashboardKPI(Long totalProducts,
                        Long lowStockItems,
                        Long outOfStockItems,
                        Long pendingReceipts,
                        Long pendingDeliveries,
                        Long scheduledTransfers) {

        this.totalProducts = totalProducts;
        this.lowStockItems = lowStockItems;
        this.outOfStockItems = outOfStockItems;
        this.pendingReceipts = pendingReceipts;
        this.pendingDeliveries = pendingDeliveries;
        this.scheduledTransfers = scheduledTransfers;
    }

    public Long getTotalProducts() { return totalProducts; }
    public void setTotalProducts(Long totalProducts) { this.totalProducts = totalProducts; }

    public Long getLowStockItems() { return lowStockItems; }
    public void setLowStockItems(Long lowStockItems) { this.lowStockItems = lowStockItems; }

    public Long getOutOfStockItems() { return outOfStockItems; }
    public void setOutOfStockItems(Long outOfStockItems) { this.outOfStockItems = outOfStockItems; }

    public Long getPendingReceipts() { return pendingReceipts; }
    public void setPendingReceipts(Long pendingReceipts) { this.pendingReceipts = pendingReceipts; }

    public Long getPendingDeliveries() { return pendingDeliveries; }
    public void setPendingDeliveries(Long pendingDeliveries) { this.pendingDeliveries = pendingDeliveries; }

    public Long getScheduledTransfers() { return scheduledTransfers; }
    public void setScheduledTransfers(Long scheduledTransfers) { this.scheduledTransfers = scheduledTransfers; }
}
