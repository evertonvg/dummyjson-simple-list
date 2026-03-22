<script setup lang="ts">
import { navigateTo } from '#app'
import { ref, onMounted } from 'vue'

const isLogged = ref(false)

onMounted(() => {
  isLogged.value = !!localStorage.getItem('token')
})

const logout = () => {
  if (process.client) {
    localStorage.removeItem('token')
    navigateTo('/')
  }
}
</script>

<template>
  <div>
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <span class="navbar-item">Dummy Json Tests</span>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <button class="button is-light" @click="logout" v-if="isLogged">
            Logout
          </button>
        </div>
      </div>
    </nav>

    <main>
      <slot />
    </main>
    <Toaster position="bottom-right" />
  </div>
</template>