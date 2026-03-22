<script setup lang="ts">
defineProps<{
  modelValue: string
  type?: string
  placeholder?: string
  error?: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="field">
    <div class="control">
      <input
        class="input"
        :class="{ 'is-danger': error }"
        :type="type || 'text'"
        :placeholder="placeholder"
        :value="modelValue"
        @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
      />
    </div>

    <p v-if="error" class="help is-danger">
      {{ error }}
    </p>
  </div>
</template>