// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@mindenit/ui/nuxt',
    '@nuxtjs/strapi',
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
  strapi: {
    cookie: {
      path: '/',
      maxAge: 14 * 24 * 60 * 60,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
    },
  },
  build: {
    transpile: process.env.NODE_ENV === 'production' ? ['vue', '@mindenit/ui', '@internationalized/date'] : [],
  },
});
