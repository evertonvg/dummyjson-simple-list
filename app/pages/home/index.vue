<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getProductsRequest } from '@/services/getProducts'
import type { ProductsResponse } from '@/types/products'

const route = useRoute()
const router = useRouter()

const limit = 12

// 1. Inicializa a página pegando o valor da URL ou 1 se não existir
const page = ref(Number(route.query.page) || 0)
const skip = computed(() => page.value * limit)

useSeoMeta({
  title: () => `Produtos - Página ${page.value} | Dummy Json tests`,
  description: 'Confira nossa lista completa de produtos exclusivos com os melhores preços.',
  ogTitle: () => `Catálogo de Produtos - Página ${page.value}`,
  ogDescription: 'Encontre o que você procura em nossa seleção de produtos.',
  ogImage: 'https://seusite.com/og-products-list.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

// Dica extra: Adicionar links canônicos para evitar conteúdo duplicado por causa das query params
useHead({
  link: [
    {
      rel: 'canonical',
      href: () => `https://seusite.com/produtos?page=${page.value}`
    }
  ]
})

// 2. O queryKey deve observar o 'page', assim o Vue Query refaz a busca automaticamente
const { data, isLoading } = useQuery<ProductsResponse>({
  queryKey: ['products', limit, page], // Note que passamos a ref 'page' aqui
  queryFn: () => getProductsRequest(limit, skip.value),
})

// 3. Função para atualizar a página e a URL
const handlePageUpdate = (newPage: number) => {
  page.value = newPage
  
  // Atualiza a URL sem recarregar a página
  router.push({
    query: {
      ...route.query,
      page: newPage.toString()
    }
  })
}

// 4. (Opcional) Se o usuário clicar no "Voltar" do navegador, a página atualiza
watch(() => route.query.page, (newVal) => {
  const p = Number(newVal) || 0
  if (p !== page.value) {
    page.value = p
  }
})
</script>

<template>
  <section class="section mt-4">
    <div class="container">
      <h1 class="title">Produtos</h1>

      <div class="container">
        <SkeletonGrid v-if="isLoading" />
        <ProductGrid v-else :products="data?.products ?? []" />
        
        <Pagination
          v-if="data"
          :current-page="page"
          :total-items="data.total"
          :per-page="limit"
          @update:page="handlePageUpdate" 
        />
      </div>
    </div>
  </section>
</template>