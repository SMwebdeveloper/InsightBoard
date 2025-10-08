<template>
  <div>
    <!-- Metrics card -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-7">
      <MetricCard
        v-for="(metric, index) in metricsData"
        :key="index"
        :title="metric.title"
        :value="metric.value"
        :icon="metric.icon"
        :color="metric.color"
      />
    </div>
    <div class="mb-6">
      <PeriodFilter />
    </div>
    <div v-if="loading" class="text-center">
      <UIcon name="i-lucide-loader-2" class="animate-spin w-[30px] h-[30px]" />
      <p class="mt-4 text-gray-600 dark:text-gray-400">Загрузка...</p>
    </div>
    <SalesChart v-else :sales="sales" />
  </div>
</template>
<script lang="ts" setup>
import type { MetricsData } from "~/types";
import { useSalesStore } from "~/store/sales";
import { storeToRefs } from "pinia";
const SalesChart = defineAsyncComponent(
  () => import("~/components/SalesChart.vue")
);

const store = useSalesStore();
const { sales, loading } = storeToRefs(store);

onMounted(() => {
  store.fetchSales();
});

// SEO meta
useSeoMeta({
  title: "InsightBoard - Аналитическая Панель",
  description: "Аналитическая панель для мониторинга продаж",
});

const metricsData: MetricsData[] = [
  {
    title: "Общий доход за период",
    value: "$15,000",
    icon: "i-heroicons-banknotes",
    color: "blue",
  },
  {
    title: "Количество заказов",
    value: 300,
    icon: "i-heroicons-shopping-cart",
    color: "green",
  },
  {
    title: "Средний чек",
    value: "$2000",
    icon: "i-heroicons-currency-dollar",
    color: "yellow",
  },
  {
    title: "Unique Users",
    value: 75,
    icon: "i-heroicons-users",
    color: "purple",
  },
];
</script>
