<template>
  <UHeader>
    <template #title>
      <h3
        class="text-slate-800 dark:text-slate-200 text-lg md:text-2xl lg:text-3xl"
      >
        Insight <span class="text-red-500">Board</span>
      </h3>
    </template>

    <template #right>
      <UColorModeButton />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/SMwebdeveloper/InsightBoard"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>
  </UHeader>
</template>
