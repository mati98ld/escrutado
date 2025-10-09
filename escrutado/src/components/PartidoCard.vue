<template>
  <q-card class="partido-card q-pa-md q-mb-xs" style="width: 100%">
    <div class="row items-center no-wrap">
      <!-- Imagen del partido ocupa toda la parte izquierda -->
      <div class="col-1 q-ml-sm" style="display: flex; align-items: center; width: 80px">
        <q-img :src="src" :alt="`Logo de ${nombre}`" style="width: 100%; height: 100%"> </q-img>
      </div>

      <!-- Información y contador a la derecha, centrados -->
      <div class="col">
        <div class="column items-center">
          <div class="text-h7 text-weight-bold text-center">{{ nombre }}</div>
          <div class="text-subtitle1 text-grey-7 q-mt-xs text-center">
            Partido #{{ numeroPartido }}
          </div>

          <div class="q-mt-md row items-center justify-center">
            <CountedCard :storage-key="storageKey" :default-value="defaultCount" />
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'
import CountedCard from './CountedCard.vue'

// --- Props ---
const props = defineProps({
  imagen: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  numeroPartido: {
    type: [String, Number],
    required: true,
  },
  defaultCount: {
    type: Number,
    default: 0,
  },
})

// --- Computed ---
const storageKey = computed(() => {
  // Crear una key única combinando nombre y número de partido
  return `partido_${props.numeroPartido}`
})

// Normalizar la prop de imagen y mostrar en consola para depuración
const src = computed(() => {
  if (!props.imagen) return ''
  try {
    return String(props.imagen)
  } catch {
    return ''
  }
})
</script>

<style scoped>
.partido-card {
  border-radius: 12px;
  transition: all 0.3s ease;
}
</style>
