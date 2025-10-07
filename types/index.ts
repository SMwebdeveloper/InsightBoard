export interface Sale {
    date:string;
    amount: number;
    category: string;
}

export interface Metrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrder: number;
  uniqueUsers: number;
}

export interface SalesResponse {
  sales: Sale[];
  metrics: Metrics;
}

export type Period = "today" | "week" | "month" | "year" | "custom" | "all";

export interface CustomDateRange {
  startDate: string;
  endDate: string;
}