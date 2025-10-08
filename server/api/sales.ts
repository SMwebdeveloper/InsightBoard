// server/api/sales.get.ts
import { readFileSync } from "fs";
import path from "path";
import type { Sale } from "~/types";

export default defineEventHandler(async (event) => {
  
  try {
    const query = getQuery(event);
    const period = (query.period as string) || "all";
    const category = (query.category as string) || "all";
    const startDate = query.startDate as string | undefined;
    const endDate = query.endDate as string | undefined;

    console.log("Query params:", { period, category, startDate, endDate });

    // Mock data 
    const filePath = path.resolve(process.cwd(), "data/mockData.json");
    const fileContent = readFileSync(filePath, "utf-8");
    const { sales } = JSON.parse(fileContent) as { sales: Sale[] };
    

    let filteredSales = [...sales];

    // 1.Filter category
    if (category && category !== "all") {
      filteredSales = filteredSales.filter((s) => s.category === category);
      console.log("After category filter:", filteredSales.length);
    }

    // 2. Filter period
    if (period && period !== "all") {
      const now = new Date();

      if (period === "custom" && startDate && endDate) {
        // Custom date range
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);


        filteredSales = filteredSales.filter((s) => {
          const saleDate = new Date(s.date);
          return saleDate >= start && saleDate <= end;
        });
      } else {
        // Predefined periods
        let startDate = new Date();

        switch (period) {
          case "today":
            startDate.setHours(0, 0, 0, 0);
            break;
          case "week":
            startDate.setDate(startDate.getDate() - 7);
            break;
          case "month":
            startDate.setMonth(startDate.getMonth() - 1);
            break;
          case "year":
            startDate.setFullYear(startDate.getFullYear() - 1);
            break;
        }


        filteredSales = filteredSales.filter((s) => {
          const saleDate = new Date(s.date);
          return saleDate >= startDate;
        });
      }
    }
    return filteredSales;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
});
