<template>
  <div class="border border-slate-200 p-4 min-h-[300px] rounded-2xl shadow">
    <ClientOnly>
      <apexchart
        v-if="
          chartData &&
          chartData.series &&
          chartData.series[0] &&
          chartData.series[0].data.length > 0
        "
        type="line"
        height="350"
        :options="chartData.options"
        :series="chartData.series"
      />
      <div v-else class="h-64 flex items-center justify-center text-gray-500">
        {{ store.loading ? "Загрузка..." : "Нет данных" }}
      </div>
      <template #fallback>
        <div class="h-64 flex items-center justify-center">
          <ULoader />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useSalesStore } from "~/store/sales";
import VueApexCharts from "vue3-apexcharts";

const apexchart = defineAsyncComponent(() => 
  import('vue3-apexcharts').then(module => module.default)
)
const store = useSalesStore();
const colorMode = useColorMode();

const chartData = computed(() => {
  if (!store.sales || store.sales.length === 0) {
    return {
      options: {},
      series: [{ name: "Продажи", data: [] }],
    };
  }

  // Sales grouping data
  const grouped = store.sales.reduce((acc: any, sale) => {
    const date = sale.date;
    acc[date] = (acc[date] || 0) + sale.amount;
    return acc;
  }, {});

  const dates = Object.keys(grouped).sort();
  const amounts = dates.map((date) => grouped[date]);

  // update date formate
  const formattedDates = dates.map((date) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString('ru-RU', { month: 'short' });
  return `${day} ${month}`;
});
  return {
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: { show: false },
        animations: { enabled: true, easing: "easeinout", speed: 700 },
        zoom: { enabled: false },
      },
      xaxis: {
        categories: formattedDates,
        labels: {
          style: {
            colors: "#6b7280",
            fontSize: "12px",
          },
          formatter: function (value: string) {
            return value;
          },
        },
        axisBorder: { show: true, color: "#e5e7eb" },
        axisTicks: { show: true, color: "#e5e7eb" },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#6b7280",
            fontSize: "12px",
          },
          formatter: (val: number) => `${val.toLocaleString()} $`,
        },
        forceNiceScale: true,
      },
      tooltip: {
        theme: colorMode.value ? "dark" : "light",
        style: {
          fontSize: "14px",
          fontFamily: "Inter, sans-serif",
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          const date = dates[dataPointIndex];
          const value = series[seriesIndex][dataPointIndex];
          const categoryData = store.sales.filter((s) => s.date === date);
          const categories = [...new Set(categoryData.map((s) => s.category))];

          const themeClass =
            colorMode.value === "dark" ? "dark-tooltip" : "light-tooltip";

          return `
            <div class="custom-tooltip ${themeClass}">
              <div class="tooltip-header">
                <strong>${date}</strong>
              </div>
              <div class="tooltip-body">
                <div class="total-amount">
                  💰 ${value.toLocaleString()} $
                </div>
                <div class="categories">
                  📊 ${categories.join(", ")}
                </div>
                <div class="transactions">
                  🔢 ${categoryData.length} транзакций
                </div>
              </div>
            </div>
          `;
        },
      },

      colors: ["#7c3aed"],
      stroke: {
        curve: "smooth",
        width: 3,
        colors: ["#7c3aed"],
      },
      grid: {
        borderColor: "#e5e7eb",
        strokeDashArray: 4,
        padding: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        },
      },
      markers: {
        size: 5,
        colors: ["#7c3aed"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
    series: [
      {
        name: "Продажи",
        data: amounts,
      },
    ],
  };
});
</script>
