<template>
  <div class="ai-loader-shell" role="status" :aria-label="label">
    <div class="loader-wrapper" aria-hidden="true">
      <span
        v-for="(letter, index) in letters"
        :key="`${letter}-${index}`"
        class="loader-letter"
        :style="{ animationDelay: `${index * 0.08}s` }"
      >
        {{ letter }}
      </span>

      <div class="loader"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  label?: string
}>(), {
  label: 'Generating',
})

const letters = computed(() => props.label.split(''))
</script>

