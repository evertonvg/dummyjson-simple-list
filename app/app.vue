<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem); /* Adiciona um desfoque leve para ficar mais sofisticado */
  transform: translateY(10px); /* Leve movimento de subida/descida */
}
</style>