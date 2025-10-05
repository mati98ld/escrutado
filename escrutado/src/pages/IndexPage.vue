<template>
  <div class="q-pa-lg column q-gutter-md items-center">
    <CounterCard storageKey="contador_productos" />
    <CounterCard storageKey="contador_votos" />
  </div>
</template>

<script setup>
import CounterCard from '../components/CountedCard.vue'
</script>
