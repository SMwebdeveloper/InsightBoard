import { defineStore } from "pinia";
import type { Sale, Metrics, Period } from "~/types";

export const useSalesStore = defineStore("sales", () => {
  const sales = ref<Sale[]>([]);
  const metrics = ref<Metrics>({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrder: 0,
    uniqueUsers: 0,
  });

  const selectedPeriod = ref<Period>("week");
  const isLoading = ref<boolean>(false);

  const fetchData = async (period?: Period): Promise<void> => {
    isLoading.value = true;

    try {
      const query = period ? `?period=${period}` : "";
      const data = await $fetch<any>(`/api/sales${query}`);

      sales.value = data.sales;
      metrics.value = data.metrics;

      if (period) {
        selectedPeriod.value = period;
      }
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xato:", error);
    } finally {
      isLoading.value = false;
    }
  };

  // Kunlik savdolarni guruhlash (chiziqli grafik uchun)
  const dailySales = computed(() => {
    const dailyData: Record<string, any> = {};

    sales.value.forEach((sale: Sale) => {
      if (!dailyData[sale.date]) {
        dailyData[sale.date] = {
          date: sale.date,
          Elektronika: 0,
          Kiyim: 0,
          Kitoblar: 0,
          total: 0,
        };
      }
      dailyData[sale.date][sale.category] += sale.amount;
      dailyData[sale.date].total += sale.amount;
    });

    return Object.values(dailyData).sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  });

  return {
    sales: computed(() => sales.value),
    metrics: computed(() => metrics.value),
    dailySales: computed(() => dailySales.value),
    selectedPeriod: computed(() => selectedPeriod.value),
    isLoading: computed(() => isLoading.value),
    fetchData,
  };
});
