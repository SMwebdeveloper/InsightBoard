<template>
  <UContainer class="space-y-6 py-6">
    <!-- Metrics card -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        v-for="(metric, index) in metricsData"
        :key="index"
        :title="metric.title"
        :value="metric.value"
        :icon="metric.icon"
        :color="metric.color"
      />
    </div>
  </UContainer>
</template>
<script lang="ts" setup>
import MetricCard from "@/components/MetricCard.vue";
import type { MetricsData } from "~/types";

const metricsData: MetricsData[] = [
  {
    title: "Total Users",
    value: 1200,
    icon: "i-heroicons-user-group",
    color: "blue",
  },
  {
    title: "Active Sessions",
    value: 300,
    icon: "i-heroicons-computer-desktop",
    color: "green",
  },
  {
    title: "Revenue",
    value: "$15,000",
    icon: "i-heroicons-currency-dollar",
    color: "yellow",
  },
  {
    title: "New Signups",
    value: 75,
    icon: "i-heroicons-user-plus",
    color: "purple",
  },
];
</script>
