<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Mijn <span class="bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">Projecten</span>
        </h1>
        <p class="text-xl text-gray-400 mb-8">
          Een overzicht van de projecten die ik heb ontwikkeld
        </p>
      </div>

      <div ref="reactRoot" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { ProjectCardsGrid } from './ProjectCardsGrid'

const reactRoot = ref<HTMLDivElement | null>(null)
let root: Root | null = null

onMounted(() => {
  if (!reactRoot.value) return
  root = createRoot(reactRoot.value)
  root.render(React.createElement(ProjectCardsGrid))
})

onBeforeUnmount(() => {
  root?.unmount()
})
</script>
