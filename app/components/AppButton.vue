<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="button is-primary is-fullwidth"
    :class="{ 'is-loading': loading }"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>