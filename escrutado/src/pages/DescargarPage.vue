<template>
  <q-page class="q-pa-lg column justify-center items-center">
    <q-card class="my-card q-mb-xl" style="max-width: 480px; width: 100%">
      <q-card-section>
        <div class="text-h6 text-primary text-center">Descargá "El Escrutado"</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="column items-center q-pa-lg">
        <div class="count q-mb-md">
          Descargas: <strong>{{ count }}</strong>
        </div>

        <q-btn
          color="primary"
          unelevated
          :loading="loading"
          :disabled="loading"
          @click="onDownload"
        >
          Descargar APK
        </q-btn>

        <div class="note q-mt-md">
          Con la app instalada no necesitás internet para usar "El Escrutado".
        </div>

        <p v-if="error" class="error q-mt-md">{{ error }}</p>
        <div v-if="message" class="message q-mt-md">{{ message }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

/*
  Configuración:
  - APK_URL: URL pública del archivo .apk (puede ser relativa o absoluta).
  - API_GET: endpoint GET que devuelve el contador -> { value: n }
  - API_HIT: endpoint GET que incrementa y devuelve el nuevo valor -> { value: n }
*/
// APK located in public/apk/El Escrutado.apk
const APK_URL = '/apk/El Escrutado.apk'
// Remote API endpoints provided
const API_GET = 'https://abacus.jasoncameron.dev/get/elescrutado/descargas'
const API_HIT = 'https://abacus.jasoncameron.dev/hit/elescrutado/descargas'

const count = ref(0)
const loading = ref(false)
const error = ref('')

const message = ref('')

async function fetchCount() {
  error.value = ''
  try {
    const res = await fetch(API_GET, { method: 'GET' })
    if (!res.ok) throw new Error('No hay respuesta del servidor')
    const json = await res.json()
    // API returns { value: n }
    if (typeof json.value === 'number') {
      count.value = json.value
      return
    }
    throw new Error('Respuesta inválida')
  } catch (e) {
    // No usar localStorage: mostrar error al usuario
    error.value = 'No se pudo obtener el contador del servidor.'
    console.error('fetchCount error:', e.message)
  }
}

async function incrementCount() {
  try {
    const res = await fetch(API_HIT, { method: 'GET' })
    if (!res.ok) throw new Error('No se pudo actualizar contador en servidor')
    const json = await res.json()
    if (typeof json.value === 'number') {
      count.value = json.value
      return
    }
    throw new Error('Respuesta inválida del servidor')
  } catch (e) {
    error.value = 'No se pudo actualizar el contador en el servidor.'
    console.error('incrementCount error:', e.message)
  }
}

function startDownload() {
  // Si el archivo está en otro origen (cross-origin), muchos navegadores
  // ignoran el atributo `download`. Para evitar ejecutar ambas acciones
  // (a.click() + window.open) —que provoca la descarga doble— solo
  // abrimos en una nueva pestaña cuando la URL es cross-origin.
  try {
    const apkUrl = new URL(APK_URL, window.location.href)
    const isCrossOrigin = apkUrl.origin !== window.location.origin

    if (isCrossOrigin) {
      // Abrir en nueva pestaña (no hacer anchor click)
      window.open(APK_URL, '_blank', 'noopener')
      return
    }
  } catch (e) {
    // Si hay un error creando la URL, como fallback abrimos en nueva pestaña
    console.warn('startDownload: error parsing APK_URL', e)
    window.open(APK_URL, '_blank', 'noopener')
    return
  }

  // Same-origin: forzar descarga creando un enlace con atributo download
  const a = document.createElement('a')
  a.href = APK_URL
  a.setAttribute('download', '')
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

async function onDownload() {
  loading.value = true
  error.value = ''
  try {
    await incrementCount()
  } catch (e) {
    error.value = 'No se pudo actualizar el contador. ' + e.message
  } finally {
    // iniciar la descarga aunque el incremento falle
    startDownload()
    loading.value = false
    // brief success message
    message.value = 'Gracias por descargar "El Escrutado". Espero que te ayude'
  }
}

onMounted(() => {
  fetchCount()
})
</script>

<style scoped>
.wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f9fc;
  padding: 24px;
  box-sizing: border-box;
}
.card {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 28px;
  border-radius: 10px;
  box-shadow: 0 6px 24px rgba(30, 40, 60, 0.08);
  text-align: center;
}
h1 {
  margin: 0 0 12px 0;
  font-size: 1.4rem;
  color: #0f1724;
}
.count {
  margin: 8px 0 20px 0;
  color: #334155;
}
.download-btn {
  display: inline-block;
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
.download-btn[disabled] {
  opacity: 0.7;
  cursor: default;
}
.note {
  margin-top: 16px;
  font-size: 0.9rem;
  color: #64748b;
}
.error {
  margin-top: 12px;
  color: #b91c1c;
  font-size: 0.9rem;
}

.spinner {
  margin-right: 8px;
  animation: rotate 1s linear infinite;
}
.spinner .path {
  stroke: #fff;
  stroke-linecap: round;
  stroke-dasharray: 90;
  stroke-dashoffset: 0;
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
.message {
  margin-top: 10px;
  color: #065f46;
  background: #ecfdf5;
  padding: 8px 12px;
  border-radius: 8px;
  display: inline-block;
}
</style>
