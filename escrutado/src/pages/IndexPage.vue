<template>
  <q-page>
    <div class="q-pa-lg column justify-between items-center" style="width: 100%">
      <div
        class="text-h5 text-primary text-center q-mb-xl q-pa-md q-mt-lg"
        style="
          font-weight: bold;
          letter-spacing: 1px;
          border-radius: 12px;
          background: linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%);
          box-shadow: 0 2px 8px rgba(33, 150, 243, 0.08);
        "
      >
        Elecciones generales 2025
      </div>

      <q-card class="my-card q-mb-xl" style="max-width: 400px">
        <q-card-section>
          <div class="text-h5 text-primary text-center">Contador de Votos</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="flex flex-center">
          <CounterCard storageKey="contador_votos" @change="onCounterChange" />
        </q-card-section>
      </q-card>

      <div
        class="q-mt-xl text-center"
        style="
          font-size: 1.15rem;
          color: #1976d2;
          background: #e3f2fd;
          border-radius: 8px;
          padding: 10px;
          font-weight: 500;
          box-shadow: 0 1px 4px rgba(33, 150, 243, 0.07);
          max-width: 350px;
          margin: 0 auto;
        "
      >
        Ya votó el
        <span style="font-weight: bold"> {{ porcentajeVotado }}% </span>
        del padrón de tu mesa.
      </div>
    </div>

    <div class="q-mt-xl text-center flex column items-center">
      <q-btn
        class="q-ml-sm"
        flat
        color="secondary"
        icon="file_download"
        label="Descargá la app para usar 'El Escrutado' sin conexión a internet"
        to="/DescargarPage"
      />
    </div>
  </q-page>
</template>

<script setup>
import CounterCard from '../components/CountedCard.vue'
import { ref, onMounted } from 'vue'

const porcentajeVotado = ref(0)

const totalPadron = 350 // Total del padrón de la mesa
let votosEmitidos = ref(Number(localStorage.getItem('contador_votos') || 0))

const actualizarPorcentaje = (value) => {
  votosEmitidos.value = value
  porcentajeVotado.value = ((votosEmitidos.value / totalPadron) * 100).toFixed(2)
}

const onCounterChange = (value) => {
  // Se espera que CountedCard emita el nuevo total como payload del evento 'change'
  actualizarPorcentaje(value.count)
}

onMounted(() => {
  actualizarPorcentaje(votosEmitidos.value)
})
</script>
