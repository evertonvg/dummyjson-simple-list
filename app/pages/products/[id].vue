<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductRequest } from '@/services/getProduct'
import type { ProductResponse } from '@/types/product'

const route = useRoute()
const router = useRouter()
const mainImage = ref('')

// 1. SSR: Busca os dados no servidor antes da página carregar
const { data: product, pending: isLoading } = await useAsyncData<ProductResponse>(
  `product-${route.params.id}`,
  () => getProductRequest(route.params.id as string)
)

// 2. Galeria: Define a imagem principal assim que o produto carrega
watch(
  product,
  (p) => {
    if (p && p.images?.length) mainImage.value = p.images[0]
  },
  { immediate: true }
)

// 3. SEO Dinâmico: Títulos e descrições reativas para Redes Sociais
useSeoMeta({
  title: () => `${product.value?.title ?? 'Carregando...'} - Dummy Json Tests`,
  description: () => product.value?.description,
  ogTitle: () => product.value?.title,
  ogDescription: () => product.value?.description,
  ogImage: () => mainImage.value || product.value?.thumbnail,
  twitterCard: 'summary_large_image',
})

// 4. JSON-LD: Dados estruturados para o Google (Rich Snippets)
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.value?.title,
        image: product.value?.images,
        description: product.value?.description,
        brand: { '@type': 'Brand', name: product.value?.brand },
        offers: {
          '@type': 'Offer',
          price: product.value?.price,
          priceCurrency: 'USD',
          availability: product.value?.stock && product.value.stock > 0 
            ? 'https://schema.org/InStock' 
            : 'https://schema.org/OutOfStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.value?.rating,
          reviewCount: product.value?.reviews?.length
        }
      }))
    }
  ]
})
</script>

<template>
  <section class="section mt-6" v-if="isLoading">
    <div class="container has-text-centered">
      <h2 class="subtitle">Carregando detalhes do produto...</h2>
    </div>
  </section>

  <section class="section mt-6" v-else-if="product">
    <div class="container">
      <nav class="breadcrumb mb-4" aria-label="breadcrumbs">
        <ul>
          <li><NuxtLink to="/home">Produtos</NuxtLink></li>
          <li class="is-active"><a href="#" aria-current="page">{{ product.title }}</a></li>
        </ul>
      </nav>

      <button class="button is-light mb-4" @click="router.back()">← Voltar</button>

      <div class="columns">
        <div class="column is-half">
          <figure class="image is-4by3 mb-4">
            <img :src="mainImage" :alt="product.title" class="product-main-image" />
          </figure>

          <div class="columns is-mobile is-multiline">
            <div class="column is-3" v-for="img in product.images" :key="img">
              <figure class="image is-square">
                <img
                  :src="img"
                  :alt="`Miniatura ${product.title}`"
                  class="thumbnail"
                  :class="{ 'is-active-thumb': mainImage === img }"
                  @click="mainImage = img"
                />
              </figure>
            </div>
          </div>
        </div>

        <div class="column is-half">
          <h1 class="title is-3">{{ product.title }}</h1>
          <p class="subtitle is-5 has-text-grey">{{ product.brand }}</p>

          <div class="is-flex is-align-items-center mb-4">
            <p class="is-size-3 has-text-weight-bold">
              ${{ product.price.toFixed(2) }}
            </p>
            <span v-if="product.discountPercentage" class="tag is-danger is-light ml-3">
              -{{ product.discountPercentage.toFixed(0) }}% OFF
            </span>
          </div>

          <div class="mb-4">
            <span v-for="n in 5" :key="n" class="has-text-warning mr-1">
              <i class="fa" :class="n <= Math.round(product.rating) ? 'fa-star' : 'fa-star-o'"></i>
            </span>
            <span class="has-text-grey">({{ product.reviews.length }} avaliações)</span>
          </div>

          <div class="notification is-light">
            <p><strong>Disponibilidade:</strong> {{ product.availabilityStatus }} ({{ product.stock }} unidades)</p>
            <p><strong>Garantia:</strong> {{ product.warrantyInformation }}</p>
          </div>

          <div class="buttons">
            <button class="button is-primary is-large is-fullwidth">Comprar agora</button>
            <button class="button is-warning is-large is-fullwidth">Adicionar ao carrinho</button>
          </div>
        </div>
      </div>

      <hr />

      <div class="content">
        <h3 class="title is-4">Descrição</h3>
        <p>{{ product.description }}</p>
      </div>

      <div class="mt-6">
        <h3 class="title is-4">O que os clientes dizem</h3>
        <div v-for="review in product.reviews" :key="review.reviewerEmail" class="box">
          <div class="is-flex is-justify-content-between">
            <strong>{{ review.reviewerName }}</strong>
            <span class="has-text-warning">
              <i v-for="n in 5" :key="n" class="fa" :class="n <= review.rating ? 'fa-star' : 'fa-star-o'"></i>
            </span>
          </div>
          <p class="is-italic mt-2">"{{ review.comment }}"</p>
          <p class="is-size-7 has-text-grey">{{ new Date(review.date).toLocaleDateString() }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-main-image {
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  object-fit: contain;
  background: #fff;
}

.thumbnail {
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: all 0.2s;
  object-fit: cover;
}

.thumbnail:hover {
  transform: translateY(-3px);
  border-color: #3273dc;
}

.is-active-thumb {
  border-color: #3273dc;
}

.breadcrumb {
  font-size: 0.9rem;
}
</style>