<script setup lang="ts">
import { navigateTo } from '#app'
// const { status, signOut, data } = useAuth()

const handleLogout = async () => {
  // await signOut({
  //   redirect: true,
  //   callbackUrl: '/'
  // })
  
}

</script>

<template>
  <main class="layout">
    <nav class="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <span class="navbar-item">Dummy Json Tests</span>
      </div>

      <div class="navbar-end">
        <!-- <p v-if="status === 'authenticated'" class="navbar-item">Bem-vindo, {{ data.username }}</p> -->
        <div class="navbar-item">
          <!-- <button class="button is-light" @click="handleLogout" v-if="status === 'authenticated'">
            Logout
          </button> -->
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