import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['bulma/css/bulma.min.css'],
  pages: true,
  alias: {
    '@': fileURLToPath(new URL('./app', import.meta.url)),
    '~': fileURLToPath(new URL('./', import.meta.url))
  },
  modules: ['@pinia/nuxt',
    '@nuxt/image', '@vueuse/nuxt', 'nuxt-auth-utils'],
  // auth: {
  //   baseURL: 'http://localhost:3000',

  //   provider: {
  //     type: 'local',

  //     endpoints: {
  //       signIn: { path: '/api/auth/login', method: 'post' },
  //       signOut: { path: '/api/auth/logout', method: 'post' },
  //       getSession: { path: '/api/auth/me', method: 'get' }
  //     },

  //     token: {
  //       // caminho dentro da resposta do login para pegar o token
  //       signInResponseTokenPointer: '/accessToken'
  //     }
  //   }
  // },
  image: {
    // Permitir imagens externas
    domains: ['cdn.dummyjson.com'],
    // Lazy loading padrão
    // presets: {
    //   default: {
    //     format: 'webp',
    //     quality: 80,
    //     modifiers: {
    //       loading: 'lazy'
    //     }
    //   }
    // }
  }
})