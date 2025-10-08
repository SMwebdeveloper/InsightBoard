// server/api/sales.get.ts
import { readFileSync } from "fs";
import path from "path";
import type { Sale } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const period = (query.period as string) || "all";
    const category = (query.category as string) || "all";
    const customStartDate = query.startDate as string | undefined;
    const customEndDate = query.endDate as string | undefined;

    console.log("🔍 Query params:", {
      period,
      category,
      customStartDate,
      customEndDate,
    });

    // Mock data
    const filePath = path.resolve(process.cwd(), "data/mockData.json");
    const fileContent = readFileSync(filePath, "utf-8");
    const { sales } = JSON.parse(fileContent) as { sales: Sale[] };

    let filteredSales = [...sales];

    // 1. Filter category
    if (category && category !== "all") {
      filteredSales = filteredSales.filter((s) => s.category === category);
    }

    // 2. Filter period
    if (period && period !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Faqat sana

      console.log("🕐 Current date:", today.toISOString().split("T")[0]);

      if (period === "custom" && customStartDate && customEndDate) {
        // Custom date range
        const start = new Date(customStartDate);
        const end = new Date(customEndDate);
        end.setHours(23, 59, 59, 999);

        console.log("📅 Custom date range:", {
          start: start.toISOString().split("T")[0],
          end: end.toISOString().split("T")[0],
        });

        filteredSales = filteredSales.filter((s) => {
          const saleDate = new Date(s.date);
          return saleDate >= start && saleDate <= end;
        });
      } else {
        // Predefined periods
        let startDate = new Date(today);
        let endDate = new Date(today);
        endDate.setHours(23, 59, 59, 999);

        switch (period) {
          case "today":
            startDate.setHours(0, 0, 0, 0);

            break;

          case "week":
            // last 7 days
            startDate.setDate(today.getDate() - 6); // Bugundan 6 kun oldin
            startDate.setHours(0, 0, 0, 0);

            break;

          case "month":
            // last 30 days
            startDate.setDate(today.getDate() - 29); // Bugundan 29 kun oldin
            startDate.setHours(0, 0, 0, 0);

            break;

          case "year":
            // last 365 days
            startDate.setDate(today.getDate() - 364); // Bugundan 364 kun oldin
            startDate.setHours(0, 0, 0, 0);

            break;
        }

        filteredSales = filteredSales.filter((s) => {
          const saleDate = new Date(s.date);
          const isInRange = saleDate >= startDate && saleDate <= endDate;
          return isInRange;
        });
      }
    }

    return filteredSales;
  } catch (error) {
    console.error("💥 API Error:", error);
    return [];
  }
});
