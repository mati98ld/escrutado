<template>
  <q-page>
    <div class="column items-center q-mb-xl" style="width: 100%">
      <div class="text-h5 text-primary text-center q-mb-lg q-pa-md q-mt-lg" :style="titleStyle">
        Resultados
      </div>

      <div class="text-h6">Votos emitidos: {{ totalVotes }}</div>
      <div class="text-h6">Votos escrutados: {{ votosEscrutados }}</div>

      <q-card class="q-pa-md full-width q-mt-md q-mb-md">
        <div v-if="sortedRows.length">
          <div
            v-for="row in sortedRows"
            :key="row.numero"
            class="result-row row items-center q-mb-xs"
            style="gap: 12px"
          >
            <div class="result-meta" style="width: 300px; min-width: 120px">
              <div class="text-subtitle2">{{ row.nombre }}</div>
              <div class="text-caption text-grey-6">#{{ row.numero }}</div>
            </div>

            <div class="result-chart-row row items-center" style="gap: 12px; width: 100%">
              <div class="result-bar">
                <div class="bar-track">
                  <div
                    class="bar-inner"
                    :style="{
                      width: mounted ? barWidth(row.votos) : '0%',
                      background: 'linear-gradient(90deg, #42a5f5, #1e88e5)',
                      height: '100%',
                    }"
                  ></div>
                </div>
              </div>

              <div class="result-votes">{{ row.votos }}</div>
            </div>
            <q-separator class="q-my-md"></q-separator>
          </div>
        </div>
        <div v-else class="text-caption text-grey-6">No hay datos para mostrar</div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import partidosData from '../data/partidos.js'
import LogoEscrutado from '../assets/LogoEscrutado.png'

const partidos = ref(partidosData.partidos ?? partidosData)
const totalVotes = ref(0)
const votosEscrutados = ref(0)

const titleStyle = {
  fontWeight: 700,
  letterSpacing: '1px',
  borderRadius: '12px',
  background: 'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)',
  boxShadow: '0 2px 8px rgba(33, 150, 243, 0.08)',
}

function readVotesFor(numero) {
  try {
    const key = `partido_${numero}`
    const v = localStorage.getItem(key)
    const parsed = parseInt(v, 10)
    return Number.isNaN(parsed) ? 0 : parsed
  } catch {
    return 0
  }
}

const rows = computed(() => {
  return partidos.value.map((p) => ({
    nombre: p.nombre,
    numero: p.numero,
    imagen: p.imagen || LogoEscrutado,
    votos: readVotesFor(p.numero),
  }))
})

const sortedRows = computed(() => {
  return [...rows.value].sort((a, b) => b.votos - a.votos)
})

function barWidth(votos) {
  const max = Math.max(...rows.value.map((r) => r.votos), 1)
  const pct = Math.round((votos / max) * 100)
  return pct + '%'
}

const mounted = ref(false)

onMounted(() => {
  // trigger animation after mount
  setTimeout(() => (mounted.value = true), 50)
  totalVotes.value = localStorage.getItem('contador_votos') || 0
  votosEscrutados.value = rows.value.reduce((sum, r) => sum + r.votos, 0)
})
</script>

<style scoped>
.full-width {
  width: 100%;
}

/* Default layout for chart rows (all sizes) */
.result-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.result-chart-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-width: 0;
}

.result-bar {
  flex: 1 1 auto;
  min-width: 0;
}

.bar-track {
  background: #f1f5f9;
  height: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.bar-inner {
  height: 100%;
  transition: width 700ms cubic-bezier(0.2, 0.9, 0.2, 1);
}

.result-votes {
  width: 56px;
  text-align: right;
}

/* Responsive: stack meta above bar on small screens */
@media (max-width: 600px) {
  .result-row {
    flex-direction: column !important;
    align-items: stretch;
  }

  .result-meta {
    width: 100% !important;
    min-width: 0 !important;
    margin-bottom: 6px;
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .result-votes {
    margin-top: 6px;
  }
}
</style>
