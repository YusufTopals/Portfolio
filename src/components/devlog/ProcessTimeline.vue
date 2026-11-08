<template>
  <nav v-reveal aria-label="Procestijdlijn">
    <h3 class="eyebrow mb-5">Proces</h3>
    <!-- Verticaal op mobiel, horizontaal vanaf md -->
    <ol class="relative grid gap-0 md:grid-cols-5 md:gap-4">
      <li
          v-for="(phase, i) in phases"
          :key="phase.target"
          class="relative border-l border-cream/15 pb-6 pl-8 last:pb-0 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pr-3 md:pt-8"
      >
        <span
            class="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-cream/25 bg-ink text-[11px] font-medium tabular-nums text-cream md:-top-3 md:left-0"
            aria-hidden="true"
        >
          {{ i + 1 }}
        </span>
        <router-link
            :to="{ hash: `#${phase.target}` }"
            class="group block"
        >
          <span class="block break-words font-medium text-cream underline-offset-4 [hyphens:auto] group-hover:underline" lang="nl">{{ phase.label }}</span>
          <span class="mt-1 block text-sm leading-snug text-cream/55">{{ phase.text }}</span>
        </router-link>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import type { TimelinePhase } from '@/data/projects'

defineProps<{ phases: TimelinePhase[] }>()
</script>
