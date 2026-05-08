<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[rgba(13,13,24,0.3)] backdrop-blur-md border-b border-[#322D36]" style="border-radius: 0 0 15px 15px;">
    <div class="container mx-auto px-4 py-4 md:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-6 lg:space-x-8">
          <button
              @click="handleNavigate('home')"
              class="text-white hover:text-purple-200 transition-colors"
              aria-label="Ga naar home"
          >
            <span class="text-3xl font-bold leading-none">&lt;/&gt;</span>
          </button>

          <div class="hidden lg:flex items-center space-x-6">
            <button
                v-for="item in navItems"
                :key="item.id"
                @click="handleNavigate(item.id)"
                :class="[
                'text-sm transition duration-150',
                currentPage === item.id
                  ? 'text-white'
                  : 'text-gray-300 hover:text-white'
              ]"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <div class="flex items-center space-x-4 md:space-x-6">
          <button
              @click="handleNavigate('contact')"
              class="bg-[#8200DB29] hover:bg-black/50 text-white font-semibold py-2 px-5 rounded-full text-sm md:text-base border border-[#322D36] transition-colors"
              style="backdrop-filter: blur(8px);"
          >
            Neem contact op
          </button>
          <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="lg:hidden text-white p-2"
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
          class="lg:hidden bg-black/50 border-t border-gray-700/30 absolute top-full left-0 right-0 z-30 overflow-hidden transition-all duration-300 ease-in-out"
          :class="isMobileMenuOpen ? 'max-h-screen opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'"
          style="backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);"
      >
        <div class="px-4 py-6 flex flex-col space-y-4">
          <button
              v-for="item in navItems"
              :key="item.id"
              @click="handleMobileNavigate(item.id)"
              :class="[
              'text-left text-sm py-2 transition duration-150',
              currentPage === item.id
                ? 'text-white'
                : 'text-gray-300 hover:text-gray-100'
            ]"
          >
            {{ item.label }}
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
