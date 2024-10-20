// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
  modules: [
    '@mindenit/ui/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@vee-validate/nuxt',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
  ],
  icon: {
    provider: 'iconify',
    serverBundle: {
      collections: ['ph'],
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? ['vue', '@mindenit/ui', '@internationalized/date']
        : [],
  },
});
