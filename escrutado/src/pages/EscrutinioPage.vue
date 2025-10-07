<template>
  <q-page class="q-pa-md flex items-center justify-center">
    <div class="column items-center" style="width: 100%; max-width: 640px">
      <div class="text-h5 q-mb-lg q-pa-md">Escrutinio de Partidos</div>

      <div class="column q-gutter-md items-stretch" style="width: 100%">
        <div v-for="partido in partidos" :key="partido.id" class="full-width">
          <PartidoCard
            :imagen="partido.imagen"
            :nombre="partido.nombre"
            :numero-partido="partido.numero"
            :default-count="partido.votosIniciales || 0"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import PartidoCard from '../components/PartidoCard.vue'

// Importa imágenes desde assets (ruta relativa) para que el bundler las resuelva
import LogoEscrutado from '../assets/LogoEscrutado.png'

// Datos de ejemplo de los partidos
const partidos = ref([
  {
    id: 1,
    nombre: 'Partido Democrático',
    numero: 101,
    imagen: LogoEscrutado,
    votosIniciales: 0,
  },
  {
    id: 2,
    nombre: 'Unión Liberal',
    numero: 102,
    imagen: LogoEscrutado,
    votosIniciales: 0,
  },
  {
    id: 3,
    nombre: 'Frente Popular',
    numero: 103,
    imagen: LogoEscrutado,
    votosIniciales: 0,
  },
])
</script>
