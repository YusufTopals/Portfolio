<template>
  <div ref="reactRoot" class="fixed inset-0 z-0 bg-black" aria-hidden="true" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { GalaxySplineBackground } from './ui/galaxy-interactive-hero-section'

const reactRoot = ref<HTMLDivElement | null>(null)
let root: Root | null = null

onMounted(() => {
  if (!reactRoot.value) return
  root = createRoot(reactRoot.value)
  root.render(React.createElement(GalaxySplineBackground))
})

onBeforeUnmount(() => {
  root?.unmount()
})
</script>
