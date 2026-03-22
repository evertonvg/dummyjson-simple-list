<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { api } from '~/services/api'

definePageMeta({
  middleware: 'auth'
})

const { data, isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: () => api('/products')
})
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Produtos</h1>

      <p v-if="isLoading">Carregando...</p>

      <section v-else  class="section">
      <div class="container">
        <h1 class="title">Produtos</h1>
        <ProductGrid :products="data?.products" />
      </div>
    </section>


    </div>
  </section>
</template>