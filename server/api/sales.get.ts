import type { Sale, SalesResponse, Period } from "~/types";

export default defineEventHandler(async (event): Promise<SalesResponse> => {
  const query = getQuery(event);
  const { period, startDate, endDate } = query as {
    period?: Period;
    startDate?: string;
    endDate?: string;
  };

  // Mock ma'lumotlarni import qilish
  const mockData = await import("~/data/mockData.json");
  let filteredSales: Sale[] = mockData.sales;

  // Period bo'yicha filtrlash
  if (period && period !== "all") {
    const now = new Date();

    if (period === "custom" && startDate && endDate) {
      // Maxsus sana oralig'i
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Kun oxirigacha

      filteredSales = mockData.sales.filter((sale: Sale) => {
        const saleDate = new Date(sale.date);
        return saleDate >= start && saleDate <= end;
      });
    } else {
      let startDate = new Date();

      switch (period) {
        case "today":
          // Bugun: joriy kunning boshidan
          startDate = new Date(now);
          startDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          // 7 kun oldin
          startDate.setDate(now.getDate() - 7);
          break;
        case "month":
          // 30 kun oldin
          startDate.setDate(now.getDate() - 30);
          break;
        case "year":
          // 1 yil oldin
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filteredSales = mockData.sales.filter((sale: Sale) => {
        const saleDate = new Date(sale.date);
        return saleDate >= startDate;
      });
    }
  }

  // Metrikalarni hisoblash
  const totalRevenue = filteredSales.reduce(
    (sum: number, sale: Sale) => sum + sale.amount,
    0
  );
  const totalOrders = filteredSales.length;
  const averageOrder =
    totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  // Noyob foydalanuvchilar - har bir buyurtma uchun 0.8 noyob foydalanuvchi
  const uniqueUsers = Math.floor(totalOrders * 0.8);

  const response: SalesResponse = {
    sales: filteredSales,
    metrics: {
      totalRevenue,
      totalOrders,
      averageOrder,
      uniqueUsers,
    },
  };

  return response;
});
