<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <button 
      class="pagination-previous" 
      :disabled="currentPage <= 0" 
      @click="$emit('update:page', currentPage - 1)"
    >
      Anterior
    </button>

    <ul class="pagination-list">
      <li v-for="page in pages" :key="page">
        <a 
          class="pagination-link" 
          :class="{ 'is-current': page - 1 === currentPage }"
          @click="$emit('update:page', page - 1)"
        >
          {{ page }}
        </a>
      </li>
    </ul>
    
    <button 
      class="pagination-next" 
      :disabled="(currentPage + 1) >= totalPages" 
      @click="$emit('update:page', currentPage + 1)"
    >
      Próxima
    </button>

  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalItems: number
  perPage: number
}>()

const emit = defineEmits<{
  (e: 'update:page', page: number): void
}>()

// Computa total de páginas
const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage))

// Array de páginas
const pages = computed(() => {
  const arr = []
  for (let i = 1; i <= totalPages.value; i++) {
    arr.push(i)
  }
  return arr
})
</script>