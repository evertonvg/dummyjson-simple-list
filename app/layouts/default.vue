<script setup lang="ts">
import { navigateTo } from '#app'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()


const logout = () => {
  if (process.client) {
    auth.logout()
    navigateTo('/')
  }
}
</script>

<template>
  <main class="layout">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <span class="navbar-item">Dummy Json Tests</span>
      </div>

      <div class="navbar-end">
        <p v-if="auth.isLoggedIn" class="navbar-item">Bem-vindo, {{ auth.user }}</p>
        <div class="navbar-item">
          <button class="button is-light" @click="logout" v-if="auth.isLoggedIn">
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