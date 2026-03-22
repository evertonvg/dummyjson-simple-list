<script setup lang="ts">
interface Product {
  id: number
  title: string
  price: number
  rating: number
  brand: string
  thumbnail: string
}
defineProps<{
  product: Product
}>()

</script>
<template>
    <NuxtLink :to="`/products/${product.id}`">
    <div class="card" style="cursor:pointer;">
    <div class="card-image">
      <figure class="image is-4by3">
        <NuxtImage :src="product.thumbnail" :alt="product.title" />      
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-6">{{ product.title }}</p>
          <p class="subtitle is-7">{{ product.brand }}</p>
        </div>
      </div>
      <div class="content">
        <strong>${{ product.price.toFixed(2) }}</strong>
        <br />
        Rating: {{ product.rating }} ⭐
      </div>
    </div>
  </div>
  </NuxtLink>
</template>



<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
</style>