<template>
  <div ref="reactRoot" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { OrbitalLoader } from './orbital-loader'

const props = withDefaults(defineProps<{
  message?: string
  messagePlacement?: 'top' | 'bottom' | 'left' | 'right'
}>(), {
  message: undefined,
  messagePlacement: 'bottom',
})

const reactRoot = ref<HTMLDivElement | null>(null)
let root: Root | null = null

const renderLoader = () => {
  root?.render(React.createElement(OrbitalLoader, {
    message: props.message,
    messagePlacement: props.messagePlacement,
    className: 'text-sky-100 drop-shadow-[0_0_18px_rgba(125,211,252,0.35)]',
  }))
}

onMounted(() => {
  if (!reactRoot.value) return
  root = createRoot(reactRoot.value)
  renderLoader()
})

watch(() => [props.message, props.messagePlacement], renderLoader)

onBeforeUnmount(() => {
  root?.unmount()
})
</script>
