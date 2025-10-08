<template>
  <div class="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full">
    <!-- Filter controls -->
    <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
      <!-- Period Select -->
      <div class="flex-1 min-w-[200px]">
        <USelect
          v-model="period"
          :items="periodOptions"
          placeholder="Период"
          @update:model-value="handlePeriodUpdate"
          size="lg"
          class="w-full"
        />
      </div>

      <!-- Category Select -->
      <div class="flex-1 min-w-[200px]">
        <USelect
          v-model="category"
          :items="categories"
          placeholder="Категория"
          @update:model-value="handleCategoriesUpdate"
          size="lg"
          class="w-full"
        />
      </div>
    </div>

    <!-- Date Range and Actions -->
    <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-start sm:items-center">
      <!-- Date Range -->
      <div class="flex gap-2 flex-1">
        <UInput 
          type="date" 
          :disabled="period !== 'custom'" 
          v-model="dateRange.startDate" 
          @change="store.setDateRange(dateRange)" 
          size="lg"
          class="flex-1 disabled:opacity-50 min-w-[140px]"
          placeholder="От"
        />
        <UInput 
          type="date" 
          :disabled="dateRange.startDate === ''" 
          v-model="dateRange.endDate" 
          @change="store.setDateRange(dateRange)" 
          size="lg"
          class="flex-1 min-w-[140px]"
          placeholder="До"
        />
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-2 w-full sm:w-auto">
        <UButton
          icon="i-heroicons-x-mark"
          label="Очистить"
          color="neutral"
          variant="outline"
          size="lg"
          @click="clearFilters"
          class="flex-1 sm:flex-none"
          :disabled="!hasActiveFilters"
        />
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import { useSalesStore } from "~/store/sales";
import type { SelectItem } from "@nuxt/ui";
import type { Period, Category } from "~/types";
const store = useSalesStore();
const { period, category, dateRange } = storeToRefs(store);

const periodOptions = ref<SelectItem[]>([
  { label: "Сегодня", value: "today" },
  { label: "Неделя", value: "week" },
  { label: "Месяц", value: "month" },
  { label: "Произвольный диапазон", value: "custom" },
  { label: "Все", value: "all" },
]);

const categories = ref<SelectItem[]>([
  { label: "Все категории", value: "all" },
  { label: "Электроника", value: "Электроника" },
  { label: "Одежда", value: "Одежда" },
  { label: "Книги", value: "Книги" },
]);
// Computed for active filters
const hasActiveFilters = computed(() => {
  return period.value !== 'all' || 
         category.value !== 'all' || 
         (dateRange.value.startDate && dateRange.value.endDate)
})
const isValidPeriod = (value: any): value is Period => {
  return ["today", "week", "month", "custom", "all"].includes(value);
};

const isValidCategory = (value: any): value is Category => {
  return ["all", "Электроника", "Одежда", "Книги"].includes(value);
};
const handlePeriodUpdate = (value: any) => {
  if (value && isValidPeriod(value)) {
    store.setPeriod(value);
  } else {
    store.setPeriod("all");
  }
};

const handleCategoriesUpdate = (value: any) => {
  if (value && isValidCategory(value)) {
    store.setCategory(value);
  } else {
    store.setCategory("all");
  }
};
const applyFilters = () => {
  // Apply filter logic here
  console.log('Applying filters...')
}

const clearFilters = () => {
  store.setPeriod('all')
  store.setCategory('all')
  dateRange.value = { startDate: '', endDate: '' }
  store.setDateRange(dateRange.value)
}
</script>
