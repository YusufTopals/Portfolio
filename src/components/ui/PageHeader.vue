<template>
  <header class="mb-12 md:mb-16">
    <p v-if="eyebrow" v-reveal class="eyebrow mb-4">{{ eyebrow }}</p>
    <h1 class="display-heading text-5xl sm:text-6xl md:text-8xl">
      <WordsPullUp :text="title" show-asterisk />
    </h1>
    <p v-if="subtitle" v-reveal="250" class="mt-6 max-w-2xl text-lg text-cream/60 md:text-xl">
      {{ subtitle }}
    </p>
  </header>
</template>

<script setup lang="ts">
import WordsPullUp from '@/components/ui/WordsPullUp.vue'

defineProps<{
  title: string
  eyebrow?: string
  subtitle?: string
}>()
</script>
