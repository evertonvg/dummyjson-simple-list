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

      <div v-else class="columns is-multiline">
        <div
          v-for="product in data?.products"
          :key="product.id"
          class="column is-4"
        >
          <div class="box">
            <strong>{{ product.title }}</strong>
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>