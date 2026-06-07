<template>
  <div ref="reactRoot" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { HeroGeometric } from './ui/shape-landing-hero'

const emit = defineEmits<{
  navigate: [page: 'home' | 'about' | 'projects' | 'contact']
}>()

const reactRoot = ref<HTMLDivElement | null>(null)
let root: Root | null = null

onMounted(() => {
  if (!reactRoot.value) return
  root = createRoot(reactRoot.value)
  root.render(React.createElement(HeroGeometric, {
    badge: 'Portfolio',
    title1: 'Yusuf Topal',
    title2: 'Software Engineering Student',
    description: 'Ik ben 20 jaar oud en studeer Software Engineering aan de HvA. Op deze portfolio laat ik projecten zien waar ik tijdens mijn opleiding en eigen ontwikkeling aan heb gewerkt.',
    showBackground: false,
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
