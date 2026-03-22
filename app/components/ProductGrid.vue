<template>
  <div class="columns is-multiline">
    <div class="column is-one-quarter" v-for="product in products" :key="product.id">
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue'

interface Product {
  id: number
  title: string
  price: number
  rating: number
  brand: string
  thumbnail: string
}

defineProps<{
  products: Product[]
}>()
</script>