// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['bulma/css/bulma.min.css'],
  pages: true,
  alias: {
    '@': fileURLToPath(new URL('./app', import.meta.url))
  }
})
