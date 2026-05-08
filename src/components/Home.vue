<template>
  <div ref="reactRoot" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { HeroSectionBasic } from './ui/galaxy-interactive-hero-section'

const emit = defineEmits<{
  navigate: [page: 'home' | 'about' | 'projects' | 'contact']
}>()

const reactRoot = ref<HTMLDivElement | null>(null)
let root: Root | null = null

onMounted(() => {
  if (!reactRoot.value) return
  root = createRoot(reactRoot.value)
  root.render(React.createElement(HeroSectionBasic, {
    onNavigate: (page: 'home' | 'about' | 'projects' | 'contact') => {
      emit('navigate', page)
      window.dispatchEvent(new CustomEvent('navigate', { detail: page }))
    },
  }))
})

onBeforeUnmount(() => {
  root?.unmount()
})
</script>
