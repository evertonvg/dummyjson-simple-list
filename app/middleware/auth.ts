// middleware/auth.ts
import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore()
    console.warn(auth.isLoggedIn)

    // se não estiver logado, redireciona para login
    if (!auth.isLoggedIn) {
        return navigateTo('/')
    }
})