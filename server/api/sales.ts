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

    console.log("📊 Total sales loaded:", sales.length);

    let filteredSales = [...sales];

    // 1. Filter category
    if (category && category !== "all") {
      filteredSales = filteredSales.filter((s) => s.category === category);
      console.log(
        `📂 After category filter (${category}):`,
        filteredSales.length
      );
    }

    // 2. Filter period
    if (period && period !== "all") {
      const now = new Date();

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
        // Predefined periods - TO'G'RI VERSIYA
        let startDate = new Date();
        let endDate = new Date();

        switch (period) {
          case "today":
            // Faqat bugungi kun
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
            console.log(
              `📅 Today range: ${startDate.toISOString().split("T")[0]} to ${
                endDate.toISOString().split("T")[0]
              }`
            );
            break;

          case "week":
            // Oxirgi 7 kun (shu kundan boshlab 7 kun oldingi)
            startDate.setDate(startDate.getDate() - 6); // 7 kun = shu kun + 6 oldingi kun
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
            console.log(
              `📅 Week range: ${startDate.toISOString().split("T")[0]} to ${
                endDate.toISOString().split("T")[0]
              }`
            );
            break;

          case "month":
            // Joriy oyning barcha kunlari
            startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Oyning 1-kuni
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Oyning oxirgi kuni
            endDate.setHours(23, 59, 59, 999);
            console.log(
              `📅 Month range: ${startDate.toISOString().split("T")[0]} to ${
                endDate.toISOString().split("T")[0]
              }`
            );
            break;

          case "year":
            // Joriy yilning barcha oylari
            startDate = new Date(now.getFullYear(), 0, 1); // Yilning 1-yanvari
            endDate = new Date(now.getFullYear(), 11, 31); // Yilning 31-dekabri
            endDate.setHours(23, 59, 59, 999);
            console.log(
              `📅 Year range: ${startDate.toISOString().split("T")[0]} to ${
                endDate.toISOString().split("T")[0]
              }`
            );
            break;
        }

        filteredSales = filteredSales.filter((s) => {
          const saleDate = new Date(s.date);
          return saleDate >= startDate && saleDate <= endDate;
        });
      }

      console.log(`✅ After ${period} period filter:`, filteredSales.length);
      console.log(
        "📋 Filtered sales dates:",
        [...new Set(filteredSales.map((s) => s.date))].sort()
      );
    }

    console.log("🎯 Final result count:", filteredSales.length);
    return filteredSales;
  } catch (error) {
    console.error("💥 API Error:", error);
    return [];
  }
});
