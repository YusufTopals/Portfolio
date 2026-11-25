<template>
  <div class="min-h-screen px-4 pb-20 pt-28 sm:px-6 md:px-10 md:pt-36">
    <div v-if="project && detail" class="mx-auto max-w-5xl">
      <router-link
          to="/projects"
          class="mb-10 inline-flex items-center gap-2 text-sm text-cream/60 transition-colors hover:text-cream"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m6-6l-6 6 6 6" />
        </svg>
        Alle projecten
      </router-link>

      <!-- 1. Projectsamenvatting -->
      <header class="mb-20 md:mb-28">
        <div v-reveal class="mb-6 flex flex-wrap items-center gap-2">
          <span class="eyebrow mr-2">Devlog</span>
        </div>
        <h1 class="display-heading max-w-5xl text-4xl sm:text-5xl md:text-7xl">
          <WordsPullUp :text="detail.heading" />
        </h1>
        <template v-if="detail.summary">
          <p v-reveal="150" class="mt-6 max-w-3xl text-xl leading-relaxed text-cream md:text-2xl">{{ detail.summary.tagline }}</p>
          <div v-reveal="200" class="mt-6 flex flex-wrap items-center gap-2">
            <span v-for="tag in detail.summary.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </template>
        <div v-else v-reveal="200" class="mt-6 flex flex-wrap gap-2">
          <span v-for="tech in project.technologies" :key="tech" class="tag">{{ tech }}</span>
        </div>

        <!-- Infokaart -->
        <dl v-if="detail.info?.length" v-reveal="250" class="panel mt-10 grid grid-cols-2 gap-6 p-6 md:grid-cols-4 md:p-8">
          <div v-for="item in detail.info" :key="item.label">
            <dt class="eyebrow mb-1.5">{{ item.label }}</dt>
            <dd class="leading-snug text-cream">{{ item.value }}</dd>
          </div>
        </dl>

        <!-- Beste beelden -->
        <ul v-if="detail.highlights?.length" v-reveal="300" class="mt-4 grid grid-cols-3 gap-3 md:grid-cols-6">
          <li v-for="image in detail.highlights" :key="image.src">
            <button
                type="button"
                class="group block w-full overflow-hidden rounded-xl border border-cream/10 bg-ink md:rounded-2xl"
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
                  class="aspect-square w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-105"
              />
            </button>
          </li>
        </ul>

        <video
            v-if="detail.summary?.video"
            v-reveal
            :src="detail.summary.video.src"
            :poster="detail.summary.video.poster"
            class="mt-10 w-full rounded-2xl border border-cream/10 bg-ink md:rounded-[2rem]"
            controls
            playsinline
            preload="metadata"
        />
      </header>

      <div class="space-y-20 md:space-y-28">
        <!-- 2. Over het project -->
        <section id="over-het-project" class="scroll-mt-28">
          <h2 v-reveal class="mb-6 text-3xl font-medium tracking-tight md:text-4xl">Over het project</h2>
          <div v-reveal class="max-w-3xl space-y-4 text-lg leading-relaxed text-cream/70">
            <p v-for="paragraph in detail.intro" :key="paragraph.substring(0, 40)">{{ paragraph }}</p>
          </div>
        </section>

        <!-- 3. Mijn rol -->
        <section v-if="detail.role" id="mijn-rol" class="scroll-mt-28">
          <h2 v-reveal class="mb-6 text-3xl font-medium tracking-tight md:text-4xl">Mijn rol</h2>
          <p v-reveal class="max-w-3xl text-lg leading-relaxed text-cream/70">{{ detail.role }}</p>
        </section>

        <!-- 4. Wat we gebruikten -->
        <section v-if="toolGroups.length" id="wat-we-gebruikten" class="scroll-mt-28">
          <h2 v-reveal class="mb-6 text-3xl font-medium tracking-tight md:text-4xl">Wat we gebruikten</h2>
          <div v-reveal class="panel grid gap-6 p-6 sm:grid-cols-2 md:p-8">
            <div v-for="group in toolGroups" :key="group.label">
              <p class="eyebrow mb-3">{{ group.label }}</p>
              <ul class="flex flex-wrap gap-2">
                <li v-for="tool in group.items" :key="tool" class="tag">{{ tool }}</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 5. Hoe het project zich ontwikkelde -->
        <section id="ontwikkeling" class="scroll-mt-28">
          <h2 v-reveal class="mb-6 text-3xl font-medium tracking-tight md:text-4xl">Hoe het project zich ontwikkelde</h2>
          <ol class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <li v-for="(sprint, i) in detail.sprints" :key="sprint.number" v-reveal="i * 80">
              <router-link
                  v-if="sprint.status === 'done'"
                  :to="{ hash: `#sprint-${sprint.number}` }"
                  class="panel group flex h-full overflow-hidden transition-colors hover:border-cream/25 sm:flex-col"
              >
                <img
                    v-if="cardFor(sprint.number)?.image"
                    :src="cardFor(sprint.number)?.image?.src"
                    :alt="cardFor(sprint.number)?.image?.alt"
                    :width="cardFor(sprint.number)?.image?.width"
                    :height="cardFor(sprint.number)?.image?.height"
                    loading="lazy"
                    decoding="async"
                    class="w-28 shrink-0 border-r border-cream/10 object-cover object-top sm:aspect-[4/3] sm:w-full sm:border-b sm:border-r-0"
                />
                <div class="flex flex-1 flex-col p-5">
                  <p class="eyebrow mb-2">Sprint {{ sprint.number }}</p>
                  <p class="flex-1 leading-snug text-cream">{{ cardFor(sprint.number)?.text ?? sprint.title }}</p>
                  <span class="mt-4 text-sm text-cream/50 transition-colors group-hover:text-cream">Naar sprint {{ sprint.number }} →</span>
                </div>
              </router-link>
              <div v-else class="flex h-full flex-col justify-between gap-2 rounded-2xl border border-dashed border-cream/15 p-5">
                <p class="eyebrow">Sprint {{ sprint.number }}</p>
                <p class="text-cream/40">Binnenkort</p>
              </div>
            </li>
          </ol>
          <div v-if="detail.iterations?.length" class="mt-10">
            <IterationBlock :iterations="detail.iterations" />
          </div>
        </section>

        <!-- 6. De sprints, met sticky sprint-navigatie -->
        <div>
          <nav
              class="sticky top-0 z-40 -mx-4 mb-12 bg-ink/90 px-4 pb-3 pt-12 backdrop-blur sm:-mx-6 sm:px-6 md:-mx-10 md:px-10 md:pt-16"
              aria-label="Sprints"
          >
            <ol class="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <li v-for="sprint in detail.sprints" :key="sprint.number" class="shrink-0">
                <router-link
                    v-if="sprint.status === 'done'"
                    :to="{ hash: `#sprint-${sprint.number}` }"
                    class="block rounded-full px-4 py-2 text-sm font-medium transition-colors"
                    :class="activeSprint === sprint.number ? 'bg-cream text-ink' : 'border border-cream/15 text-cream/70 hover:text-cream'"
                    :aria-current="activeSprint === sprint.number ? 'true' : undefined"
                >
                  Sprint {{ sprint.number }}
                </router-link>
                <span v-else class="block rounded-full border border-dashed border-cream/15 px-4 py-2 text-sm text-cream/40">
                  Sprint {{ sprint.number }} · binnenkort
                </span>
              </li>
            </ol>
          </nav>

          <div class="space-y-24 md:space-y-32">
            <template v-for="sprint in detail.sprints" :key="sprint.number">
              <section
                  v-if="sprint.status === 'done'"
                  :id="`sprint-${sprint.number}`"
                  data-spy
                  :data-sprint="sprint.number"
                  class="scroll-mt-28"
              >
                <!-- a. Titel + inleiding -->
                <h2 class="display-heading mb-4 text-5xl md:text-7xl">
                  <WordsPullUp :text="`Sprint ${sprint.number}`" />
                </h2>
                <p v-if="sprint.title" v-reveal class="mb-6 text-xl text-cream md:text-2xl">{{ sprint.title }}</p>
                <p v-if="sprint.intro" v-reveal class="max-w-3xl text-lg leading-relaxed text-cream/70">{{ sprint.intro }}</p>

                <!-- b. Genummerde stappen -->
                <div class="mt-14 space-y-16 md:mt-16 md:space-y-20">
                  <article
                      v-for="(section, i) in sprint.sections"
                      :id="section.id"
                      :key="section.id"
                      class="scroll-mt-28"
                  >
                    <p v-reveal class="eyebrow mb-2">Stap {{ sprint.number }}.{{ i + 1 }}</p>
                    <h3 v-reveal class="mb-6 text-2xl font-medium tracking-tight md:text-3xl">{{ section.title }}</h3>
                    <SprintBlocks :blocks="section.blocks" @open="lightboxImage = $event" />
                  </article>
                </div>

                <!-- c. Terugblik -->
                <div
                    v-if="sprint.review?.length"
                    :id="`sprint-${sprint.number}-terugblik`"
                    class="mt-16 scroll-mt-28 border-t border-cream/10 pt-12 md:mt-20 md:pt-16"
                >
                  <h3 v-reveal class="mb-8 text-2xl font-medium tracking-tight md:text-3xl">Terugblik op sprint {{ sprint.number }}</h3>
                  <div class="space-y-12">
                    <div v-for="(part, i) in sprint.review" :key="part.title ?? i">
                      <h4 v-if="part.title" v-reveal class="mb-5 text-xl font-medium tracking-tight">{{ part.title }}</h4>
                      <SprintBlocks :blocks="part.blocks" @open="lightboxImage = $event" />
                    </div>
                  </div>
                </div>

                <!-- d. Fotogalerij: alle beelden van deze sprint -->
                <div v-if="sprint.gallery !== false && sprintImages(sprint).length > 1" v-reveal class="mt-16 md:mt-20">
                  <h3 class="eyebrow mb-4">Alle beelden van sprint {{ sprint.number }}</h3>
                  <ul class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    <li v-for="image in sprintImages(sprint)" :key="image.src">
                      <button
                          type="button"
                          class="group block w-full overflow-hidden rounded-xl border border-cream/10 bg-ink md:rounded-2xl"
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
                            class="aspect-[4/3] w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-105"
                        />
                      </button>
                    </li>
                  </ul>
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

        <!-- 7. Eindresultaat · Wat ik heb geleerd · Wat ik volgende keer anders zou doen -->
        <section v-for="item in detail.closing" :id="item.id" :key="item.id" class="scroll-mt-28">
          <h2 v-reveal class="mb-6 text-3xl font-medium tracking-tight md:text-4xl">{{ item.title }}</h2>
          <p v-reveal class="max-w-3xl text-lg leading-relaxed text-cream/50">{{ item.text }}</p>
        </section>
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
import IterationBlock from '@/components/devlog/IterationBlock.vue'
import SprintBlocks from '@/components/devlog/SprintBlocks.vue'
import { findProject } from '@/data/projects'
import type { ProjectImage, Sprint, SprintBlock } from '@/data/projects'
import { setSeoMeta } from '@/composables/useSeoMeta'

const props = defineProps<{ slug: string }>()

const project = computed(() => findProject(props.slug))
const detail = computed(() => project.value?.detail)

const lightboxImage = ref<ProjectImage | null>(null)

const toolGroups = computed(() => {
  const tools = detail.value?.tools
  if (!tools) return []
  return [
    { label: 'Hardware', items: tools.hardware },
    { label: 'Software', items: tools.software },
  ].filter((group) => group.items.length)
})

const cardFor = (number: number) => detail.value?.cards?.find((card) => card.sprint === number)

// Alle beelden uit de stappen en de terugblik van een sprint, zonder dubbele
const blockImages = (block: SprintBlock): ProjectImage[] => {
  if (block.type === 'image-wide') return [block.image]
  if (block.type === 'image-pair' || block.type === 'image-row') return block.images
  if (block.type === 'compare') return [block.design, block.result]
  return []
}
const sprintImages = (sprint: Sprint): ProjectImage[] => {
  const blocks = [...(sprint.sections ?? []), ...(sprint.review ?? [])].flatMap((part) => part.blocks)
  const images = blocks.flatMap(blockImages)
  return images.filter((image, i) => images.findIndex((other) => other.src === image.src) === i)
}

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

// Scroll-spy: markeer de sprint die in beeld is in de sticky navigatie
const activeSprint = ref(0)
let spy: IntersectionObserver | null = null

onMounted(async () => {
  await nextTick()
  const targets = document.querySelectorAll<HTMLElement>('[data-spy]')
  if (!targets.length || !('IntersectionObserver' in window)) return

  spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) activeSprint.value = Number((entry.target as HTMLElement).dataset.sprint)
    })
  }, { rootMargin: '-30% 0px -60% 0px' })
  targets.forEach((target) => spy?.observe(target))
})

onBeforeUnmount(() => spy?.disconnect())
</script>
