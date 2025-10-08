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

export interface MetricsData {
  title: string;
  value: number | string;
  icon: string;
  color: "green" | "blue" | "purple" | "yellow" | "red";
}
export type Period = "today" | "week" | "month" | "custom" | "all";
export type Category = "all" | "Электроника" | "Одежда" | "Книги";

export interface CustomDateRange {
  startDate: string;
  endDate: string;
}