// middleware/guest.ts
import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore()
    console.warn(auth.isLoggedIn)

    // se estiver logado, redireciona para home
    if (auth.isLoggedIn) {
        return navigateTo('/home')
    }
})