<template>
  <div v-reveal class="panel p-6 md:p-8">
    <h3 class="eyebrow mb-6">Sprint-overzicht</h3>
    <dl class="grid gap-x-10 gap-y-6 md:grid-cols-2">
      <div v-for="item in items" :key="item.label">
        <dt class="mb-1.5 text-sm font-medium text-cream">{{ item.label }}</dt>
        <dd class="leading-relaxed text-cream/70">{{ item.value }}</dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SprintOverview } from '@/data/projects'

const props = defineProps<{ overview: SprintOverview }>()

const items = computed(() => [
  { label: 'Doel', value: props.overview.goal },
  { label: 'Mijn rol', value: props.overview.role },
  { label: 'Methodes', value: props.overview.methods },
  { label: 'Resultaat', value: props.overview.result },
])
</script>
