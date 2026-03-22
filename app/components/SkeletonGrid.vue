<script setup lang="ts">
  import SkeletonCard from './SkeletonCard.vue'
  defineProps<{ count?: number }>()
  const count = 12
</script>

<template>
  <div class="columns is-multiline">
    <div class="column is-one-quarter" v-for="n in count" :key="n">
      <SkeletonCard />
    </div>
  </div>
</template>
