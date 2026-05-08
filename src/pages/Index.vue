<template>
  <div class="relative min-h-screen overflow-hidden bg-black">
    <GalaxyBackground v-if="currentPage !== 'home'" />
    <div v-if="currentPage !== 'home'" class="fixed inset-0 z-0 bg-black/70 pointer-events-none"></div>

    <Navbar v-if="currentPage !== 'home'" :current-page="currentPage" @navigate="setCurrentPage" />

    <main class="relative z-10 transition-all duration-500 ease-in-out">
      <component :is="currentComponent" @navigate="setCurrentPage" />
    </main>

    <div v-if="currentPage !== 'home'" class="relative z-10">
      <Footer />
    </div>

    <!-- Loading Screen -->
    <div
        v-if="isLoading"
        class="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center z-50"
    >
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-white text-lg font-medium">Portfolio wordt geladen...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import GalaxyBackground from '../components/GalaxyBackground.vue'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Projects from '../components/Projects.vue'
import Contact from '../components/Contact.vue'
import Footer from '../components/Footer.vue'

type Page = 'home' | 'about' | 'projects' | 'contact'

const currentPage = ref<Page>('home')
const isLoading = ref(true)

const currentComponent = computed(() => {
  const components = {
    home: Home,
    about: About,
    projects: Projects,
    contact: Contact,
  }
  return components[currentPage.value] || Home
})

const setCurrentPage = (page: Page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavigateEvent = (event: Event) => {
  const page = (event as CustomEvent<Page>).detail
  if (['home', 'about', 'projects', 'contact'].includes(page)) {
    setCurrentPage(page)
  }
}

const handleDocumentClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement | null
  const trigger = target?.closest<HTMLElement>('[data-navigate]')
  const page = trigger?.dataset.navigate as Page | undefined

  if (page && ['home', 'about', 'projects', 'contact'].includes(page)) {
    setCurrentPage(page)
  }
}

onMounted(() => {
  window.addEventListener('navigate', handleNavigateEvent)
  document.addEventListener('click', handleDocumentClick)
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

onBeforeUnmount(() => {
  window.removeEventListener('navigate', handleNavigateEvent)
  document.removeEventListener('click', handleDocumentClick)
})
</script>
