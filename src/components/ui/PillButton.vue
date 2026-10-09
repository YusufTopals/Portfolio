<template>
  <component
      :is="tag"
      v-bind="linkAttrs"
      class="group inline-flex items-center gap-2 self-start rounded-full py-1 pl-5 pr-1 text-sm font-medium transition-all duration-300 hover:gap-3 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
      :class="variant === 'solid'
        ? 'bg-cream text-ink'
        : 'border border-cream/25 text-cream hover:border-cream/60'"
  >
    <slot />
    <span
        class="flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10"
        :class="variant === 'solid' ? 'bg-ink text-cream' : 'bg-cream text-ink'"
    >
      <slot name="icon">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(defineProps<{
  /** Interne route (router-link) */
  to?: string
  /** Externe link */
  href?: string
  type?: 'button' | 'submit'
  variant?: 'solid' | 'ghost'
}>(), {
  type: 'button',
  variant: 'solid',
})

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))

const linkAttrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
  return { type: props.type }
})
</script>
