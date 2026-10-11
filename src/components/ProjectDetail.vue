<template>
  <div class="min-h-screen px-4 pb-20 pt-28 sm:px-6 md:px-10 md:pt-36">
    <div v-if="project && detail" class="mx-auto max-w-6xl">
      <router-link
          to="/projects"
          class="mb-10 inline-flex items-center gap-2 text-sm text-cream/60 transition-colors hover:text-cream"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m6-6l-6 6 6 6" />
        </svg>
        Alle projecten
      </router-link>

      <!-- Header -->
      <header class="mb-12 md:mb-16">
        <div v-reveal class="mb-6 flex flex-wrap items-center gap-2">
          <span class="eyebrow mr-2">Devlog</span>
        </div>
        <h1 class="display-heading max-w-5xl text-4xl sm:text-5xl md:text-7xl">
          <WordsPullUp :text="detail.heading" />
        </h1>
        <div v-reveal="200" class="mt-6 flex flex-wrap gap-2">
          <span v-for="tech in project.technologies" :key="tech" class="tag">{{ tech }}</span>
        </div>
        <div v-reveal="300" class="mt-8 max-w-3xl space-y-4 text-lg leading-relaxed text-cream/70">
          <p v-for="paragraph in detail.intro" :key="paragraph.substring(0, 40)">{{ paragraph }}</p>
        </div>
      </header>

      <!-- Sprint-navigatie (mobiel / tablet) -->
      <nav class="-mx-4 mb-12 overflow-x-auto px-4 lg:hidden" aria-label="Sprints">
        <ol class="flex gap-2">
          <li v-for="sprint in detail.sprints" :key="sprint.number" class="shrink-0">
            <router-link
                v-if="sprint.status === 'done'"
                :to="{ hash: `#sprint-${sprint.number}` }"
                class="block rounded-full bg-cream px-4 py-2 text-sm font-medium text-ink"
            >
              Sprint {{ sprint.number }}
            </router-link>
            <span v-else class="block rounded-full border border-dashed border-cream/15 px-4 py-2 text-sm text-cream/40">
              Sprint {{ sprint.number }} · binnenkort
            </span>
          </li>
        </ol>
      </nav>

      <div class="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <!-- Inhoudsopgave (desktop) -->
        <aside class="hidden lg:block">
          <nav class="sticky top-28" aria-label="Inhoudsopgave">
            <p class="eyebrow mb-4">Inhoud</p>
            <ol class="space-y-5 border-l border-cream/10">
              <li v-for="sprint in detail.sprints" :key="sprint.number">
                <template v-if="sprint.status === 'done'">
                  <router-link
                      :to="{ hash: `#sprint-${sprint.number}` }"
                      class="-ml-px block border-l pl-4 text-sm font-medium transition-colors"
                      :class="activeId === `sprint-${sprint.number}` ? 'border-cream text-cream' : 'border-transparent text-cream/80 hover:text-cream'"
                  >
                    Sprint {{ sprint.number }}
                  </router-link>
                  <ol class="mt-2 space-y-2">
                    <li v-for="section in sprint.sections" :key="section.id">
                      <router-link
                          :to="{ hash: `#${section.id}` }"
                          class="-ml-px block border-l pl-6 text-sm leading-snug transition-colors"
                          :class="activeId === section.id ? 'border-cream text-cream' : 'border-transparent text-cream/50 hover:text-cream'"
                      >
                        {{ section.title }}
                      </router-link>
                    </li>
                  </ol>
                </template>
                <span v-else class="flex items-center gap-2 pl-4 text-sm text-cream/35">
                  Sprint {{ sprint.number }}
                  <span class="rounded-full border border-cream/10 px-2 py-0.5 text-[10px] uppercase tracking-wider">binnenkort</span>
                </span>
              </li>
            </ol>
          </nav>
        </aside>

        <!-- Sprints -->
        <div class="min-w-0 space-y-20 md:space-y-28">
          <template v-for="sprint in detail.sprints" :key="sprint.number">
            <section
                v-if="sprint.status === 'done'"
                :id="`sprint-${sprint.number}`"
                data-spy
                class="scroll-mt-28"
            >
              <h2 class="display-heading mb-8 text-5xl md:text-7xl">
                <WordsPullUp :text="`Sprint ${sprint.number}`" show-asterisk />
              </h2>

              <div v-if="sprint.goal" v-reveal class="panel relative mb-16 overflow-hidden p-6 md:p-8">
                <div class="noise-overlay pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />
                <h3 class="eyebrow relative mb-3">Doel van deze sprint</h3>
                <p class="relative text-lg leading-relaxed text-cream/90 md:text-xl">{{ sprint.goal }}</p>
              </div>

              <div class="space-y-16 md:space-y-20">
                <article
                    v-for="section in sprint.sections"
                    :id="section.id"
                    :key="section.id"
                    data-spy
                    class="scroll-mt-28"
                >
                  <h3 v-reveal class="mb-5 text-2xl font-medium tracking-tight md:text-3xl">{{ section.title }}</h3>

                  <div class="space-y-6">
                    <template v-for="(block, i) in section.blocks" :key="i">
                      <!-- Tekst -->
                      <div v-if="block.type === 'text'" v-reveal class="max-w-3xl space-y-4 text-lg leading-relaxed text-cream/70">
                        <p v-for="paragraph in block.paragraphs" :key="paragraph.substring(0, 40)">{{ paragraph }}</p>
                      </div>

                      <!-- Breed overzicht, klikbaar -->
                      <figure v-else-if="block.type === 'image-wide'" v-reveal>
                        <button
                            type="button"
                            class="group relative block w-full overflow-hidden rounded-2xl border border-cream/10 bg-ink md:rounded-[2rem]"
                            :aria-label="`Vergroot afbeelding: ${block.image.alt}`"
                            @click="lightboxImage = block.image"
                        >
                          <img
                              :src="block.image.src"
                              :alt="block.image.alt"
                              :width="block.image.width"
                              :height="block.image.height"
                              loading="lazy"
                              decoding="async"
                              class="h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
                          />
                          <span class="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-ink/85 px-3 py-1.5 text-xs text-cream backdrop-blur transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                            </svg>
                            Vergroten
                          </span>
                        </button>
                      </figure>

                      <!-- Twee foto's naast elkaar (desktop) / onder elkaar (mobiel) -->
                      <div v-else-if="block.type === 'image-pair'" class="grid gap-4 sm:grid-cols-2">
                        <button
                            v-for="(image, j) in block.images"
                            :key="image.src"
                            v-reveal="j * 120"
                            type="button"
                            class="group block overflow-hidden rounded-2xl border border-cream/10 md:rounded-[2rem]"
                            :aria-label="`Vergroot afbeelding: ${image.alt}`"
                            @click="lightboxImage = image"
                        >
                          <img
                              :src="image.src"
                              :alt="image.alt"
                              :width="image.width"
                              :height="image.height"
                              loading="lazy"
                              decoding="async"
                              class="aspect-[3/4] h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                          />
                        </button>
                      </div>

                      <!-- Feedback: wat werkte / verbeterpunten -->
                      <div v-else-if="block.type === 'feedback'" class="grid gap-4 md:grid-cols-2">
                        <div v-reveal class="panel border-sage/25 p-6 md:p-8">
                          <h4 class="mb-5 flex items-center gap-3 text-lg font-medium">
                            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-sage/15 text-sage" aria-hidden="true">
                              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            {{ block.positive.title }}
                          </h4>
                          <ul class="space-y-3">
                            <li v-for="item in block.positive.items" :key="item" class="flex gap-3 text-cream/75">
                              <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                              {{ item }}
                            </li>
                          </ul>
                        </div>

                        <div v-reveal="120" class="panel border-clay/25 p-6 md:p-8">
                          <h4 class="mb-5 flex items-center gap-3 text-lg font-medium">
                            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-clay/15 text-clay" aria-hidden="true">
                              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v5m0 3.5v.01" />
                              </svg>
                            </span>
                            {{ block.attention.title }}
                          </h4>
                          <ul class="space-y-3">
                            <li v-for="item in block.attention.items" :key="item" class="flex gap-3 text-cream/75">
                              <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" aria-hidden="true" />
                              {{ item }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </template>
                  </div>
                </article>
              </div>
            </section>

            <!-- Nog niet gepubliceerde sprint -->
            <section
                v-else
                v-reveal
                class="flex flex-col gap-2 rounded-2xl border border-dashed border-cream/15 p-6 sm:flex-row sm:items-center sm:justify-between md:rounded-[2rem] md:p-8"
            >
              <h2 class="text-2xl font-medium tracking-tight text-cream/50">Sprint {{ sprint.number }}</h2>
              <span class="eyebrow">Binnenkort</span>
            </section>
          </template>
        </div>
      </div>
    </div>

    <!-- Onbekend project -->
    <div v-else class="mx-auto max-w-6xl">
      <PageHeader title="Niet gevonden" subtitle="Dit project bestaat niet (meer)." />
      <PillButton to="/projects">Terug naar projecten</PillButton>
    </div>

    <Lightbox :image="lightboxImage" @close="lightboxImage = null" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import WordsPullUp from '@/components/ui/WordsPullUp.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import PillButton from '@/components/ui/PillButton.vue'
import Lightbox from '@/components/ui/Lightbox.vue'
import { findProject } from '@/data/projects'
import type { ProjectImage } from '@/data/projects'
import { setSeoMeta } from '@/composables/useSeoMeta'

const props = defineProps<{ slug: string }>()

const project = computed(() => findProject(props.slug))
const detail = computed(() => project.value?.detail)

const lightboxImage = ref<ProjectImage | null>(null)

watch(project, (current) => {
  if (current?.detail) {
    setSeoMeta({
      title: current.subtitle ? `${current.title}: ${current.subtitle}` : current.title,
      description: current.detail.seoDescription,
      image: current.thumbnail?.src,
    })
  } else {
    setSeoMeta({ title: 'Project niet gevonden', description: 'Dit project bestaat niet (meer).' })
  }
}, { immediate: true })

// Scroll-spy: markeer de sprint/sectie die in beeld is in de inhoudsopgave
const activeId = ref('')
let spy: IntersectionObserver | null = null

onMounted(async () => {
  await nextTick()
  const targets = document.querySelectorAll<HTMLElement>('[data-spy]')
  if (!targets.length || !('IntersectionObserver' in window)) return

  spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) activeId.value = entry.target.id
    })
  }, { rootMargin: '-20% 0px -70% 0px' })
  targets.forEach((target) => spy?.observe(target))
})

onBeforeUnmount(() => spy?.disconnect())
</script>
