<template>
  <UCard>
    <div class="flex items-center space-x-4">
      <div
        :class="colorClass"
        class="p-3 rounded-lg text-2xl"
      >
               <UIcon :name="icon" class="w-6 h-6" />

      </div>
      <div>
        <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400">
          {{ title }}
        </h3>
        <p class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          {{ value }}
        </p>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { MetricsData } from "~/types";

const props = defineProps<MetricsData>();

const colorClass = computed(() => {
  const classes = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600'
  };
  return classes[props?.color];
});
</script>