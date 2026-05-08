<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-[#322D36]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-shrink-0">
          <button
              @click="$emit('navigate', 'home')"
              class="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
          >
            YT
          </button>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <button
                v-for="item in navItems"
                :key="item.id"
                @click="$emit('navigate', item.id)"
                :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                currentPage === item.id
                  ? 'bg-[#8200DB29] text-white border border-[#322D36]'
                  : 'text-gray-300 hover:bg-[#8200DB29] hover:text-white'
              ]"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#8200DB29] transition-colors"
          >
            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path v-if="isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="isMobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/80 border border-[#322D36] rounded-lg mt-2">
          <button
              v-for="item in navItems"
              :key="item.id"
              @click="handleMobileNavigate(item.id)"
              :class="[
              'block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200',
              currentPage === item.id
                ? 'bg-[#8200DB29] text-white border border-[#322D36]'
                : 'text-gray-300 hover:bg-[#8200DB29] hover:text-white'
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
defineEmits<{
  navigate: [page: 'home' | 'about' | 'projects' | 'contact']
}>()

const isMobileMenuOpen = ref(false)

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Over mij' },
  { id: 'projects', label: 'Projecten' },
  { id: 'contact', label: 'Contact' },
]

const handleMobileNavigate = (page: 'home' | 'about' | 'projects' | 'contact') => {
  isMobileMenuOpen.value = false
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }))
  }, 0)
}
</script>
