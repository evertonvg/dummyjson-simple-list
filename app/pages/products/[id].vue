<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { getProductRequest } from '~/services/getProduct';
import type { ProductResponse } from '@/types/product';

definePageMeta({
  middleware: 'auth'
})
const route = useRoute()
const mainImage = ref('')

const { data, isLoading } = useQuery<ProductResponse>({
  queryKey: ['product', route.params.id],
  queryFn: () => getProductRequest(route.params.id as string),
})

// watch para reagir quando os dados chegarem
watch(
  data,
  () => {
    mainImage.value = data.value?.images[0] || ''
  },
  { immediate: true }
)

</script>
<template>
  <section class="section" v-if="isLoading">
    <div class="container">
      <h2>Carregando...</h2>
    </div>
  </section>
  <section class="section" else>
    <div class="container">
      <!-- Voltar -->
      <NuxtLink to="/home" class="button is-light mb-4">← Voltar</NuxtLink>

      <div class="columns">
        <!-- Coluna da imagem -->
        <div class="column is-half">
          <figure class="image is-4by3 mb-4">
            <img :src="mainImage" :alt="data?.title" class="product-main-image" />
          </figure>

          <!-- Miniaturas -->
          <div class="columns is-mobile is-multiline">
            <div class="column is-3" v-for="img in data?.images" :key="img">
              <figure class="image is-square">
                <img
                  :src="img"
                  :alt="data?.title"
                  class="thumbnail"
                  @click="mainImage = img"
                />
              </figure>
            </div>
          </div>
        </div>

        <!-- Coluna de informações -->
        <div class="column is-half">
          <h1 class="title is-3">{{ data?.title }}</h1>
          <h2 class="subtitle is-5">{{ data?.brand }}</h2>

          <!-- Preço -->
          <p class="is-size-4 has-text-weight-bold">
            ${{ data?.price.toFixed(2) }}
            <span
              v-if="data?.discountPercentage"
              class="tag is-danger is-light ml-2"
            >
              -{{ data?.discountPercentage.toFixed(0) }}%
            </span>
          </p>

          <!-- Avaliação -->
          <p class="mb-3">
            <span v-for="n in 5" :key="n" class="has-text-warning">
              <i class="fas" :class="n <= Math.round(data?.rating ?? 0) ? 'fa-star' : 'fa-star-o'"></i>
            </span>
            <span class="ml-2">({{ data?.reviews.length }} avaliações)</span>
          </p>

          <!-- Estoque, envio e garantia -->
          <div class="box mb-4">
            <p><strong>Status:</strong> {{ data?.availabilityStatus }}</p>
            <p><strong>Stock:</strong> {{ data?.stock }}</p>
            <p><strong>Garantia:</strong> {{ data?.warrantyInformation }}</p>
            <p><strong>Envio:</strong> {{ data?.shippingInformation }}</p>
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
        <p>{{ data?.description }}</p>
      </div>

      <!-- Reviews -->
      <div class="mt-6">
        <h3 class="title is-5">Avaliações</h3>
        <div v-for="review in data?.reviews" :key="review.reviewerEmail" class="box">
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