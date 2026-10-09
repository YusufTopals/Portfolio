<template>
  <span ref="root" class="inline-flex flex-wrap" :class="{ 'justify-center': center }">
    <span
        v-for="(word, i) in words"
        :key="i"
        class="relative inline-block transition-[transform,opacity] ease-out-expo motion-reduce:transition-none"
        :class="isInView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'"
        :style="{
          transitionDelay: `${i * 80}ms`,
          transitionDuration: '600ms',
          marginRight: i === words.length - 1 ? 0 : '0.25em',
        }"
    >
      {{ word }}
      <span
          v-if="showAsterisk && i === words.length - 1"
          aria-hidden="true"
          class="absolute top-[0.65em] -right-[0.3em] text-[0.31em]"
      >*</span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  showAsterisk?: boolean
  center?: boolean
}>(), {
  showAsterisk: false,
  center: false,
})

const root = ref<HTMLElement | null>(null)
const isInView = ref(false)
const words = computed(() => props.text.split(' ').filter(Boolean))

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!root.value || !('IntersectionObserver' in window)) {
    isInView.value = true
    return
  }
  observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      isInView.value = true
      observer?.disconnect()
    }
  })
  observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>
