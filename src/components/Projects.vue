<template>
  <div class="page-shell">
    <div class="content-shell">
      <div class="mb-12 max-w-2xl">
        <p class="section-kicker">Projecten</p>
        <h1 class="section-title">
          Projecten die ik heb gemaakt of waar ik een bijdrage in heb geleverd.
        </h1>
        <p class="section-copy mt-5">
          Een selectie van studieprojecten en eigen werk. Elk project laat een ander onderdeel van mijn ontwikkeling zien: frontend, backend, data, mobile en UX.
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
