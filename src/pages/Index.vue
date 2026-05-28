<template>
  <div class="relative min-h-screen overflow-hidden bg-background">
    <GalaxyBackground v-if="currentPage !== 'home'" />
    <div v-if="currentPage !== 'home'" class="fixed inset-0 z-0 bg-slate-950/82 pointer-events-none"></div>

    <Navbar :current-page="currentPage" @navigate="setCurrentPage" />

    <main class="relative z-10 transition-all duration-500 ease-in-out">
      <component :is="currentComponent" @navigate="setCurrentPage" />
    </main>

    <div v-if="currentPage !== 'home'" class="relative z-10">
      <Footer />
    </div>

    <!-- Loading Screen -->
    <div
        v-if="isLoading"
        class="fixed inset-0 bg-background flex items-center justify-center z-50"
    >
      <AiLoader label="Loading" />
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
import AIStylistProject from '../components/AIStylistProject.vue'
import Footer from '../components/Footer.vue'
import AiLoader from '../components/ui/AiLoader.vue'

type Page = 'home' | 'about' | 'projects' | 'contact' | 'ai-stylist'
const pages: Page[] = ['home', 'about', 'projects', 'contact', 'ai-stylist']

const currentPage = ref<Page>('home')
const isLoading = ref(true)

const currentComponent = computed(() => {
  const components = {
    home: Home,
    about: About,
    projects: Projects,
    contact: Contact,
    'ai-stylist': AIStylistProject,
  }
  return components[currentPage.value] || Home
})

const setCurrentPage = (page: Page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavigateEvent = (event: Event) => {
  const page = (event as CustomEvent<Page>).detail
  if (pages.includes(page)) {
    setCurrentPage(page)
  }
}

const handleDocumentClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement | null
  const trigger = target?.closest<HTMLElement>('[data-navigate]')
  const page = trigger?.dataset.navigate as Page | undefined

  if (page && pages.includes(page)) {
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
