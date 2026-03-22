<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { loginRequest } from '@/services/auth'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { navigateTo } from '#app'

definePageMeta({
  middleware: 'guest'
})

// 🔐 Schema
const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Usuário deve ter no mínimo 3 caracteres'),

  password: z
    .string()
    .min(4, 'Senha deve ter no mínimo 4 caracteres')
})

// 🧠 State
const username = ref('')
const password = ref('')
const errors = ref<{ username?: string; password?: string }>({})

const token = useCookie('token')

// 🧹 Limpa erro ao digitar
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

// 🚀 Mutation
const { mutate, isPending } = useMutation({
  mutationFn: loginRequest,

  onSuccess(data: any) {
    localStorage.setItem('token', data.token)
    token.value = data.token

    toast.success('Login realizado com sucesso! 🎉')

    navigateTo('/home')
  },

  onError() {
    toast.error('Falha no login. Por favor, tente novamente.')
  }
})

// 🔥 Handler
const handleLogin = () => {
  if (!validate()) return

  mutate({
    username: username.value,
    password: password.value
  })
}
</script>

<template>
  <section class="section">
    <div class="container">
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
              :loading="isPending"
              @click="handleLogin"
            >
              Entrar
            </AppButton>

          </div>

        </div>
      </div>
    </div>
  </section>
</template>