<script setup lang="ts">
import { ref , computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2) 

function increment() {
  count.value++
}

function decrement() {
  count.value--
}
</script>

<template>
  <div>
    <h1>Counter</h1>
    <p>Zählerstand: {{ count }}</p>
    <p>Doppelt so viel: {{ doubleCount }}</p>
    <button @click="increment">Hochzählen</button>
    <button @click="decrement">Runterzählen</button>
  </div>
</template>