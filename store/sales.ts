// store/sales.ts
import { defineStore } from "pinia";
import type { Sale, Period, CustomDateRange } from "~/types";

export const useSalesStore = defineStore("sales", {
  state: () => ({
    sales: [] as Sale[],
    loading: false,
    period: "all" as Period,
    category: "all" as string,
    dateRange: { startDate: "", endDate: "" } as CustomDateRange,
  }),

  actions: {
    async fetchSales() {
      this.loading = true;
      try {
        const query: any = {
          period: this.period,
          category: this.category,
        };

        // Faqat custom period va to'liq date range bo'lsa
        if (
          this.period === "custom" &&
          this.dateRange.startDate &&
          this.dateRange.endDate
        ) {
          query.startDate = this.dateRange.startDate;
          query.endDate = this.dateRange.endDate;
        }

        const data = await $fetch<Sale[]>("/api/sales", {
          query,
        });

        this.sales = data;
      } catch (error) {
        console.error("Fetch sales error:", error);
        this.sales = [];
      } finally {
        this.loading = false;
      }
    },

    setPeriod(period: Period) {
      this.period = period;
      // Custom bo'lmagan periodda dateRange ni tozalash
      if (period !== "custom") {
        this.dateRange = { startDate: "", endDate: "" };
      }
      this.fetchSales();
    },

    setCategory(category: string) {
      this.category = category;
      this.fetchSales();
    },

    setDateRange(range: CustomDateRange) {
      this.dateRange = range;
      // Faqat custom period va ikkala sana ham bo'lsa
      if (this.period === "custom" && range.startDate && range.endDate) {
        this.fetchSales();
      }
    },
  },
});
