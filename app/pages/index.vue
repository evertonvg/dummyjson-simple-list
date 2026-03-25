<script setup lang="ts">
import { ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { navigateTo } from '#app'

import { useAuthService } from '@/services/auth'

useSeoMeta({
  title: 'Entrar - Dummy Json tests',
  description: 'Acesse sua conta para gerenciar seus pedidos e favoritos.',
  ogTitle: 'Login | Dummy Json tests',
  ogDescription: 'Acesse sua conta com segurança.',
  ogImage: 'https://seusite.com/og-login.png',
  twitterCard: 'summary_large_image',
  // Impede que o Google indexe a página de login se você desejar:
  robots: 'noindex, nofollow'
})

const { loginRequest } = useAuthService()


const { fetch: refreshSession } = useUserSession()
  
// 🔐 Schema de validação
const loginSchema = z.object({
  username: z.string().min(3, 'Usuário deve ter no mínimo 3 caracteres'),
  password: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres')
})

// 🧠 State
const username = ref('')
const password = ref('')
const errors = ref<{ username?: string; password?: string }>({})
const isLoading = ref(false)


// 🧹 Limpa erros ao digitar
watch(username, () => (errors.value.username = ''))
watch(password, () => (errors.value.password = ''))

// ✅ Validação
const validate = () => {
  const result = loginSchema.safeParse({
    username: username.value,
    password: password.value
  })

  if (!result.success) {
    const fieldErrors: any = {}
    result.error.issues.forEach((err) => {
      const field = err.path[0] as string
      fieldErrors[field] = err.message
    })
    errors.value = fieldErrors
    return false
  }

  errors.value = {}
  return true
}

const handleLogin = async () => {
  if (!validate()) return

  try {
    isLoading.value = true
    await loginRequest(username.value,password.value)
    await refreshSession()
    toast.success('Login realizado com sucesso! 🎉')
    navigateTo('/home')

  } catch (err: any) {
    const msg = err.data?.message || 'Erro desconhecido'
    toast.error('Erro ao fazer login: ' + msg)
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="section is-fullheight is-flex is-align-items-center mt-4">
    <div class="container">
      <form @submit.prevent="handleLogin">
        <div class="columns is-centered">
          <div class="column is-4">

            <div class="box">
              <h1 class="title has-text-centered">Login</h1>

              <!-- USERNAME -->
              <AppInput
                v-model="username"
                placeholder="Usuário"
                :error="errors.username"
              />

              <!-- PASSWORD -->
              <AppInput
                v-model="password"
                type="password"
                placeholder="Senha"
                :error="errors.password"
              />

              <!-- BUTTON -->
              <AppButton
                :loading="isLoading"
                @click="handleLogin"
              >
                Entrar
              </AppButton>

            </div>

          </div>
        </div>
      </form>
    </div>
  </section>
</template>