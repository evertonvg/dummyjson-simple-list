// stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<string | null>(null)
    const token = ref<string | null>(null)

    // Carrega estado do localStorage no client
    const loadState = () => {
        if (process.client) {
            const saved = localStorage.getItem('auth')
            if (saved) {
                try {
                    const parsed = JSON.parse(saved)
                    user.value = parsed.user
                    token.value = parsed.token
                } catch (err) {
                    console.error('Erro ao carregar auth do localStorage', err)
                }
            }
        }
    }

    // Salva estado no localStorage
    const saveState = () => {
        if (process.client) {
            localStorage.setItem('auth', JSON.stringify({ user: user.value, token: token.value }))
        }
    }

    // Ações
    const login = (newUser: string, newToken: string) => {
        user.value = newUser
        token.value = newToken
        saveState()
    }

    const logout = () => {
        user.value = null
        token.value = null
        saveState()
    }

    // Getter equivalente ao antigo
    const isLoggedIn = computed(() => !!user.value && !!token.value)

    return { user, token, login, logout, loadState, isLoggedIn }
})