<template>
  <div>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>

    <!-- Global Loading Overlay -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center"
    >
      <div class="text-center">
        <UIcon name="i-lucide-loader-2" class="animate-spin w-[30px] h-[30px]" />
        <p class="mt-4 text-gray-600 dark:text-gray-400">Загрузка...</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const isLoading = ref(true);

onMounted(() => {
  // Sahifa to'liq yuklangach loading ni o'chir
  isLoading.value = false;
});

// Agar navigation bo'lsa
const router = useRouter();
router.beforeEach(() => {
  isLoading.value = true;
});

router.afterEach(() => {
  isLoading.value = false;
});
</script>
