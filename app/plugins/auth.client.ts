// plugins/auth.client.ts
import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin(() => {
    const auth = useAuthStore()
    auth.loadState() // carrega o estado do localStorage ao iniciar
})