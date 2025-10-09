<template>
  <q-page class="q-pa-md q-mb-xl">
    <div class="column items-center q-mb-xl" style="width: 100%">
      <div
        class="text-h4 text-primary text-center q-mb-xl q-pa-md q-mt-lg"
        style="
          font-weight: bold;
          letter-spacing: 1px;
          border-radius: 12px;
          background: linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%);
          box-shadow: 0 2px 8px rgba(33, 150, 243, 0.08);
        "
      >
        Escrutinio de votos
      </div>

      <div class="column" style="width: 100%">
        <div v-for="partido in partidos" :key="partido.numero" class="full-width q-mb-md">
          <PartidoCard
            :imagen="partido.imagen || LogoEscrutado"
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
import partidosData from '../data/partidos.js'
import LogoEscrutado from '../assets/LogoEscrutado.png'

// `partidosData` may export an object like { partidos: [...] }
const partidos = ref(partidosData.partidos ?? partidosData)
</script>
