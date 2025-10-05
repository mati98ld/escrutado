<template>
  <q-card class="q-pa-md flex flex-center column items-center" style="width: 250px">
    <div class="flex items-center justify-between full-width">
      <q-btn round color="negative" icon="remove" @click="decrement" />

      <div class="text-h3 text-bold text-primary q-mx-md">
        {{ count }}
      </div>

      <q-btn round color="positive" icon="add" @click="increment" />
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
    count.value = parseInt(saved)
  }
})

// --- Watch for changes and save ---
watch(count, (newVal) => {
  localStorage.setItem(props.storageKey, newVal)
})

// --- Methods ---
const increment = () => count.value++
const decrement = () => {
  if (count.value > 0) count.value--
}
</script>

<style scoped></style>
