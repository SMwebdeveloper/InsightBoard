<template>
  <UCard 
    class="p-3 sm:p-4 md:p-6 hover:shadow-lg transition-all duration-300 metric-card"
    :ui="{ 
      body: { base: 'h-full flex flex-col justify-between' },
      rounded: 'rounded-lg sm:rounded-xl'
    }"
  >
    <div class="flex items-start justify-between h-full">
      <div class="flex-1 min-w-0">
        <!-- Title -->
        <p class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 sm:mb-2 truncate">
          {{ title }}
        </p>
        
        <!-- Value -->
        <p class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 leading-tight">
          {{ formattedValue }} 
          <span class="text-xs sm:text-sm font-normal text-gray-500">{{ subtitle }}</span>
        </p>
        
        <!-- Trend -->
        <div class="flex items-center space-x-1" v-if="trend !== undefined">
          <UIcon
            :name="trend > 0 ? 'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down'"
            class="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
            :class="trend > 0 ? 'text-green-500' : 'text-red-500'"
          />
          <span 
            class="text-xs sm:text-sm font-medium whitespace-nowrap"
            :class="trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
          >
            {{ Math.abs(trend) }}%
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400 hidden xs:inline">
            o'tgan davrga nisbatan
          </span>
        </div>
      </div>
      
      <!-- Icon -->
      <div 
        class="p-2 sm:p-3 rounded-full flex-shrink-0 ml-2 sm:ml-3"
        :class="trend > 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'"
      >
        <UIcon
          :name="icon"
          class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          :class="trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
        />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  title: string
  value: number | string
  subtitle: string
  trend?: number
  icon: string
}

const props = defineProps<Props>()

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    // Format numbers with thousands separators
    return props.value.toLocaleString('uz-UZ')
  }
  return props.value
})
</script>

<style scoped>
/* Mobile optimizations */
@media (max-width: 374px) {
  .metric-card {
    padding: 1rem !important;
  }
}

/* Hover effects only on non-touch devices */
@media (hover: hover) and (pointer: fine) {
  .metric-card:hover {
    transform: translateY(-2px);
  }
}

/* Touch device optimizations */
@media (pointer: coarse) {
  .metric-card {
    cursor: pointer;
  }
}
</style>