<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getProductsRequest } from '@/services/getProducts'
import type { ProductsResponse } from '@/types/products'
import ProductGrid from '@/components/ProductGrid.vue'
import SkeletonGrid from '@/components/SkeletonGrid.vue'

// definePageMeta({ 
//   middleware: 'auth'
// }) 
 
const limit = 12
const skip = ref(0)
const page = ref(0)
// const { token } = useAuth()

const { data, isLoading, refetch  } = useQuery<ProductsResponse>({
  queryKey: computed((token) =>['products',limit,skip.value]),
  queryFn: () => getProductsRequest(limit, skip.value),
})
</script>

<template>
  <section class="section mt-4">
    <div class="container">
      <h1 class="title">Produtos</h1>

      <div class="container">
        <!-- Skeleton enquanto carrega -->
        <SkeletonGrid v-if="isLoading" />

        <!-- Grid de produtos quando carregou -->
        <ProductGrid v-else :products="data?.products ?? []" />
        
        <!-- Paginação -->
        <Pagination
          v-if="data"
          :current-page="page"
          :total-items="data.total"
          :per-page="limit"
          @update:page="(val) => {
            page = val
            skip = val * limit
            refetch()
          }"
        />
      </div>


    </div>
  </section>
</template>