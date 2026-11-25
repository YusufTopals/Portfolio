<template>
  <div v-reveal>
    <ul class="space-y-3">
      <li v-for="iteration in iterations" :key="iteration.label" class="panel p-6">
        <p class="mb-4 font-medium text-cream">{{ iteration.label }}</p>
        <!-- Stappen per sprint: naast elkaar op desktop, onder elkaar op mobiel -->
        <ol class="flex flex-col gap-3 md:flex-row md:items-start">
          <template v-for="(step, i) in iteration.steps" :key="step.sprint">
            <li v-if="i > 0" class="shrink-0" aria-hidden="true"><ArrowIcon /></li>
            <li class="md:flex-1">
              <p class="eyebrow mb-1">Sprint {{ step.sprint }}</p>
              <p :class="i === iteration.steps.length - 1 ? 'text-cream' : 'text-cream/60'">{{ step.text }}</p>
            </li>
          </template>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ArrowIcon from '@/components/devlog/ArrowIcon.vue'
import type { Iteration } from '@/data/projects'

defineProps<{ iterations: Iteration[] }>()
</script>
