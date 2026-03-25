<script setup lang="ts">
import { navigateTo } from '#app'
import { toast } from 'vue-sonner'

const { user, loggedIn, clear } = useUserSession()

const handleLogout = async () => {
  await clear() // Isso deleta o cookie de sessão no servidor e limpa o estado no cliente
  toast.info('Sessão encerrada.')
  await navigateTo('/') // Redireciona para o login
}

</script>

<template>
  <main class="layout">
    <nav class="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <span class="navbar-item">Dummy Json Tests</span>
      </div>

      <div class="navbar-end">
        <p v-if="loggedIn" class="navbar-item">Bem-vindo, {{ user?.username }}</p>
        <div class="navbar-item">
          <button class="button is-light" @click="handleLogout" v-if="loggedIn">
            Logout
          </button>
        </div>
      </div>
    </nav>

    <main>
      <slot />
    </main>
    <Toaster position="bottom-right" />
  </main>
  <Footer />
</template>