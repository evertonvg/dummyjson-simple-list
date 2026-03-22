import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['bulma/css/bulma.min.css'],
  pages: true,
  alias: {
    '@': fileURLToPath(new URL('./app', import.meta.url))
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
  ],
  image: {
    // Permitir imagens externas
    domains: ['cdn.dummyjson.com'],
    // Lazy loading padrão
    presets: {
      default: {
        format: 'webp',
        quality: 80,
        modifiers: {
          loading: 'lazy'
        }
      }
    }
  }
})