export interface Sale {
    date:string;
    amount: number;
    category: string;
}

export interface Metrics {
    totalRevenue: number;
    totalOrders: number;
    avaregOrder: number;
    uniqeUsers: number;
}

export interface SalesResponse {
    sales: Sale[];
    metrics: Metrics;
}

export type Period = "today" | "week" | "month" | "year" | "custom" | "all";
