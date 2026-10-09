<template>
  <!-- Zwarte "tab" bovenaan in het midden -->
  <nav class="fixed left-1/2 top-0 z-50 -translate-x-1/2" aria-label="Hoofdnavigatie">
    <div class="flex items-center gap-4 rounded-b-2xl bg-black px-4 py-2.5 shadow-lg shadow-black/40 sm:gap-6 md:gap-10 md:rounded-b-3xl md:px-8 md:py-3 lg:gap-12">
      <router-link
          v-for="item in navItems"
          :key="item.id"
          :to="item.to"
          class="relative whitespace-nowrap text-xs transition-colors duration-200 sm:text-sm"
          :class="isActive(item.to) ? 'text-cream' : 'text-cream/60 hover:text-cream'"
          :aria-current="isActive(item.to) ? 'page' : undefined"
      >
        {{ item.label }}
        <span
            class="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cream transition-opacity duration-200"
            :class="isActive(item.to) ? 'opacity-100' : 'opacity-0'"
            aria-hidden="true"
        />
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

// define your nav items here
const navItems = [
  { id: 'home',     label: 'Home',       to: '/'        },
  { id: 'about',    label: 'Over mij',   to: '/about'  },
  { id: 'projects', label: 'Projecten',  to: '/projects' },
  { id: 'contact',  label: 'Contact',    to: '/contact' },
]

// helper to check active route (projectdetail telt als "Projecten")
const isActive = (path: string) => {
  return path === '/' ? route.path === '/' : route.path.startsWith(path)
}
</script>
