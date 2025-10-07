<template>
  <q-card class="count-card q-pa-sm flex items-center justify-center h-full w-full">
    <div class="row items-center justify-between full-width">
      <q-btn
        dense
        round
        color="negative"
        icon="remove"
        aria-label="Restar"
        :disable="count <= 0"
        @click="decrement"
      />

      <div class="count-value text-h5 text-bold text-primary q-mx-sm" aria-live="polite">
        <transition name="count-fade" mode="out-in">
          <span :key="count">{{ count }}</span>
        </transition>
      </div>

      <q-btn dense round color="positive" icon="add" aria-label="Sumar" @click="increment" />
    </div>
  </q-card>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

// --- Props ---
const props = defineProps({
  storageKey: {
    type: String,
    required: true,
  },
  defaultValue: {
    type: Number,
    default: 0,
  },
})

// --- State ---
const count = ref(props.defaultValue)

// --- Load from localStorage ---
onMounted(() => {
  const saved = localStorage.getItem(props.storageKey)
  if (saved !== null) {
    const parsed = parseInt(saved, 10)
    if (!Number.isNaN(parsed)) {
      count.value = parsed
    }
  }
})

// --- Watch for changes and save ---
watch(count, (newVal) => {
  // store as string for consistency
  localStorage.setItem(props.storageKey, String(newVal))
})

// --- Methods ---
const increment = () => {
  count.value++
}

const decrement = () => {
  if (count.value > 0) {
    count.value--
  }
}
</script>

<style scoped>
.count-card {
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  background: linear-gradient(180deg, #ffffff, #fbfbff);
}

.count-value {
  min-width: 48px;
  text-align: center;
  color: var(--q-primary);
}

.count-fade-enter-active,
.count-fade-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}
.count-fade-enter-from,
.count-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
