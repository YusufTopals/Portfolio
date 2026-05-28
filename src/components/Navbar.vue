<template>
  <nav class="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/58 backdrop-blur-xl">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
      <div class="flex w-full items-center justify-between">
        <div class="flex items-center gap-7 lg:gap-9">
          <button
              @click="handleNavigate('home')"
              class="text-white transition-colors hover:text-sky-100"
              aria-label="Ga naar home"
          >
            <span class="text-2xl font-semibold leading-none tracking-tight">&lt;/&gt;</span>
          </button>

          <div class="hidden items-center gap-6 lg:flex">
            <button
                v-for="item in navItems"
                :key="item.id"
                @click="handleNavigate(item.id)"
                :class="[
                'text-sm font-medium transition duration-150',
                currentPage === item.id
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-100'
              ]"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <div class="flex items-center gap-3 md:gap-5">
          <button
              @click="handleNavigate('contact')"
              class="secondary-action hidden py-2 md:inline-flex"
          >
            Neem contact op
          </button>
          <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="rounded-full border border-white/10 p-2 text-white transition hover:bg-white/5 lg:hidden"
              aria-label="Toggle mobile menu"
          >
            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path v-if="isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div
          class="absolute left-0 right-0 top-full z-30 overflow-hidden border-t border-white/10 bg-slate-950/92 transition-all duration-300 ease-in-out lg:hidden"
          :class="isMobileMenuOpen ? 'max-h-screen opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'"
          style="backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);"
      >
        <div class="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6">
          <button
              v-for="item in navItems"
              :key="item.id"
              @click="handleMobileNavigate(item.id)"
              :class="[
              'text-left text-sm font-medium py-2 transition duration-150',
              currentPage === item.id
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-100'
            ]"
          >
            {{ item.label }}
          </button>
          <button
              @click="handleMobileNavigate('contact')"
              class="text-left text-sm font-medium py-2 text-slate-400 transition duration-150 hover:text-slate-100"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  currentPage: string
}

defineProps<Props>()
const emit = defineEmits<{
  navigate: [page: 'home' | 'about' | 'projects' | 'contact']
}>()

const isMobileMenuOpen = ref(false)

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Over mij' },
  { id: 'projects', label: 'Projecten' },
] as const

const handleNavigate = (page: 'home' | 'about' | 'projects' | 'contact') => {
  isMobileMenuOpen.value = false
  emit('navigate', page)
  window.dispatchEvent(new CustomEvent('navigate', { detail: page }))
}

const handleMobileNavigate = (page: 'home' | 'about' | 'projects' | 'contact') => {
  handleNavigate(page)
}
</script>
