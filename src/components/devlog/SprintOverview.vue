<template>
  <div v-reveal class="panel p-6 md:p-8">
    <h3 class="eyebrow mb-6">Sprint-overzicht</h3>
    <div v-if="overview.question" class="mb-8">
      <p class="mb-2 text-sm font-medium text-cream">De vraag van deze sprint</p>
      <p class="text-xl leading-relaxed text-cream md:text-2xl">{{ overview.question }}</p>
    </div>
    <dl class="grid gap-x-10 gap-y-6 md:grid-cols-2">
      <div v-for="item in items" :key="item.label" :class="{ 'md:col-span-2': item.label === 'In het kort' }">
        <dt class="mb-1.5 text-sm font-medium text-cream">{{ item.label }}</dt>
        <dd class="leading-relaxed text-cream/70">{{ item.value }}</dd>
      </div>

      <!-- Wat we gebruikten (na Mijn rol) -->
      <div v-if="toolGroups.length" class="md:col-span-2">
        <dt class="mb-3 text-sm font-medium text-cream">Wat we gebruikten</dt>
        <dd class="grid gap-4 sm:grid-cols-2">
          <div v-for="group in toolGroups" :key="group.label">
            <p class="eyebrow mb-2">{{ group.label }}</p>
            <ul class="flex flex-wrap gap-2">
              <li v-for="tool in group.items" :key="tool" class="tag">{{ tool }}</li>
            </ul>
          </div>
        </dd>
      </div>

      <div v-for="item in itemsAfter" :key="item.label">
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

// Alleen velden die zijn ingevuld
const filled = (list: { label: string; value?: string }[]) =>
  list.filter((item): item is { label: string; value: string } => Boolean(item.value))

const items = computed(() => filled([
  { label: 'In het kort', value: props.overview.summary },
  { label: 'Doel', value: props.overview.goal },
  { label: 'Mijn rol', value: props.overview.role },
]))

const itemsAfter = computed(() => filled([
  { label: 'Methodes', value: props.overview.methods },
  { label: 'Resultaat', value: props.overview.result },
]))

const toolGroups = computed(() => {
  const tools = props.overview.tools
  if (!tools) return []
  return [
    { label: 'Hardware', items: tools.hardware },
    { label: 'Software', items: tools.software },
  ].filter((group) => group.items.length)
})
</script>
