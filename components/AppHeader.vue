<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Home",
    to: "/",
    active: route.path === "/", // Faqat asosiy sahifa uchun
    class: route.path === "/" ? "custom-active" : "", // Maxsus sinf faqat asosiy sahifa uchun
    
  },{
    label: "Settings",
    to: "/settings",
    active: route.path.startsWith("/settings"), // Settings va uning ost sahifalari uchun
    class: route.path.startsWith("/settings") ? "custom-active" : "", // Maxsus sinf Settings va uning ost sahifalari uchun
  },
]);
</script>

<template>
  <UHeader>
    <template #title>
      <h3
        class="text-slate-800 dark:text-slate-200 text-lg md:text-2xl lg:text-3xl"
      >
        Insight <span class="text-red-500">Board</span>
      </h3>
    </template>

    <UNavigationMenu :items="items" class="flex items-center justify-cener gap-2"/>

    <template #right>
      <UColorModeButton />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>

<style scoped>

</style>