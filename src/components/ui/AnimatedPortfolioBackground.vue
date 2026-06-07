<template>
  <div ref="reactRoot" class="fixed inset-0 z-0 overflow-hidden" aria-hidden="true" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { GeometricBackground } from './shape-landing-hero'

const reactRoot = ref<HTMLDivElement | null>(null)
let root: Root | null = null

onMounted(() => {
  if (!reactRoot.value) return
  root = createRoot(reactRoot.value)
  root.render(React.createElement(GeometricBackground, {
    className: 'fixed inset-0',
  }))
})

onBeforeUnmount(() => {
  root?.unmount()
})
</script>
