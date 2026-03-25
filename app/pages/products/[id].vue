<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductRequest } from '@/services/getProduct'
import type { ProductResponse } from '@/types/product'

// definePageMeta({
//   middleware: 'auth'
// })

const route = useRoute()
const router = useRouter()
const mainImage = ref('')

// SSR: Carrega o produto antes de renderizar a página
const { data: product, pending: isLoading, refresh } = await useAsyncData<ProductResponse>(
  `product-${route.params.id}`,
  () => getProductRequest(route.params.id as string)
)

// Atualiza mainImage quando os dados chegam
watch(
  product,
  (p) => {
    if (p && p.images?.length) mainImage.value = p.images[0] || ''
  },
  { immediate: true }
)
</script>

<template>
  <section class="section mt-6" v-if="isLoading">
    <div class="container">
      <h2>Carregando...</h2>
    </div>
  </section>

  <section class="section mt-6" v-else>
    <div class="container">
      <!-- Voltar -->
      <button class="button is-light mb-4" @click="router.back()">← Voltar</button>

      <div class="columns">
        <!-- Coluna da imagem -->
        <div class="column is-half">
          <figure class="image is-4by3 mb-4">
            <img :src="mainImage" :alt="product?.title" class="product-main-image" />
          </figure>

          <!-- Miniaturas -->
          <div class="columns is-mobile is-multiline">
            <div class="column is-3" v-for="img in product?.images" :key="img">
              <figure class="image is-square">
                <img
                  :src="img"
                  :alt="product?.title"
                  class="thumbnail"
                  @click="mainImage = img"
                />
              </figure>
            </div>
          </div>
        </div>

        <!-- Coluna de informações -->
        <div class="column is-half">
          <h1 class="title is-3">{{ product?.title }}</h1>
          <h2 class="subtitle is-5">{{ product?.brand }}</h2>

          <!-- Preço -->
          <p class="is-size-4 has-text-weight-bold">
            ${{ product?.price.toFixed(2) }}
            <span
              v-if="product?.discountPercentage"
              class="tag is-danger is-light ml-2"
            >
              -{{ product?.discountPercentage.toFixed(0) }}%
            </span>
          </p>

          <!-- Avaliação -->
          <p class="mb-3">
            <span v-for="n in 5" :key="n" class="has-text-warning">
              <i class="fas" :class="n <= Math.round(product?.rating ?? 0) ? 'fa-star' : 'fa-star-o'"></i>
            </span>
            <span class="ml-2">({{ product?.reviews.length }} avaliações)</span>
          </p>

          <!-- Estoque, envio e garantia -->
          <div class="box mb-4">
            <p><strong>Status:</strong> {{ product?.availabilityStatus }}</p>
            <p><strong>Stock:</strong> {{ product?.stock }}</p>
            <p><strong>Garantia:</strong> {{ product?.warrantyInformation }}</p>
            <p><strong>Envio:</strong> {{ product?.shippingInformation }}</p>
          </div>

          <!-- Botões -->
          <div class="buttons">
            <button class="button is-primary is-large">Comprar agora</button>
            <button class="button is-warning is-large">Adicionar ao carrinho</button>
          </div>
        </div>
      </div>

      <!-- Descrição -->
      <div class="mt-6">
        <h3 class="title is-5">Descrição do Produto</h3>
        <p>{{ product?.description }}</p>
      </div>

      <!-- Reviews -->
      <div class="mt-6">
        <h3 class="title is-5">Avaliações</h3>
        <div v-for="review in product?.reviews" :key="review.reviewerEmail" class="box">
          <p>
            <strong>{{ review.reviewerName }}</strong>
            <span class="ml-2">
              <span v-for="n in 5" :key="n" class="has-text-warning">
                <i class="fas" :class="n <= review.rating ? 'fa-star' : 'fa-star-o'"></i>
              </span>
            </span>
          </p>
          <p>{{ review.comment }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-main-image {
  border: 1px solid #ccc;
  border-radius: 6px;
}

.thumbnail {
  cursor: pointer;
  border: 1px solid #eee;
  border-radius: 4px;
  transition: transform 0.15s, border-color 0.15s;
}

.thumbnail:hover {
  transform: scale(1.1);
  border-color: #999;
}

.box p {
  margin-bottom: 0.3rem;
}
</style>