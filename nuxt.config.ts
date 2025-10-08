// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  ssr: true,
  build: {
    transpile: ['apexcharts']
  },
  typescript: {
    typeCheck: false,
    strict: true,
  },
  css: ["@/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  nitro: {
    logLevel: 'verbose'
  },
  // color mode
  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  }
});
