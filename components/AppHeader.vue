<template>
  <div class="border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-slate-800 backdrop-blur-md sticky top-0 z-50 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <h3
        class="text-slate-800 dark:text-slate-200 text-lg md:text-2xl lg:text-3xl font-bold"
      >
        Insight <span class="text-red-500">Board</span>
      </h3>

      <div class="flex items-center space-x-2">
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
      </div>
    </div>
  </div>
</template>