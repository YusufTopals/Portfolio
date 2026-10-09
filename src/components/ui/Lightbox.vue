<template>
  <Teleport to="body">
    <Transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
    >
      <div
          v-if="image"
          class="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          :aria-label="image.alt"
          @click.self="emit('close')"
      >
        <div class="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a
              :href="image.src"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-cream/70 underline-offset-4 hover:text-cream hover:underline"
          >
            Open in nieuw tabblad
          </a>
          <button
              ref="closeButton"
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink transition-transform hover:scale-110"
              aria-label="Sluiten"
              @click="emit('close')"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Op mobiel horizontaal scrollbaar zodat brede overzichten leesbaar blijven -->
        <div class="flex-1 overflow-auto px-4 pb-6 sm:px-6" @click.self="emit('close')">
          <img
              :src="image.src"
              :alt="image.alt"
              class="mx-auto h-[75vh] w-auto max-w-none rounded-xl md:h-auto md:max-h-[85vh] md:max-w-full"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{
  image: { src: string; alt: string } | null
}>()

const emit = defineEmits<{ close: [] }>()

const closeButton = ref<HTMLButtonElement | null>(null)

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

watch(() => props.image, async (image) => {
  if (image) {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeydown)
    await nextTick()
    closeButton.value?.focus()
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKeydown)
  }
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>
