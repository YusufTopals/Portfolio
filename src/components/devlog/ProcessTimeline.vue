<template>
  <!-- Genummerde tijdlijn: verticaal op mobiel, horizontaal vanaf md (tenzij vertical) -->
  <ol v-reveal class="relative grid gap-0" :class="vertical ? 'max-w-3xl' : 'md:grid-cols-5 md:gap-4'">
    <li
        v-for="(phase, i) in phases"
        :key="phase.label"
        class="relative border-l border-cream/15 pb-6 pl-8 last:pb-0"
        :class="vertical ? '' : 'md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pr-3 md:pt-8'"
    >
      <span
          class="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-cream/25 bg-ink text-[11px] font-medium tabular-nums text-cream"
          :class="vertical ? '' : 'md:-top-3 md:left-0'"
          aria-hidden="true"
      >
        {{ i + 1 }}
      </span>
      <router-link v-if="phase.target" :to="{ hash: `#${phase.target}` }" class="group block">
        <span class="block break-words font-medium text-cream underline-offset-4 [hyphens:auto] group-hover:underline" lang="nl">{{ phase.label }}</span>
        <span v-if="phase.text" class="mt-1 block text-sm leading-snug text-cream/55">{{ phase.text }}</span>
      </router-link>
      <p v-else class="text-lg leading-relaxed text-cream/70">{{ phase.label }}</p>
    </li>
  </ol>
</template>

<script setup lang="ts">
import type { TimelinePhase } from '@/data/projects'

defineProps<{ phases: TimelinePhase[]; vertical?: boolean }>()
</script>
