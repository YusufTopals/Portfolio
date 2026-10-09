<template>
  <div class="min-h-screen px-4 pb-20 pt-28 sm:px-6 md:px-10 md:pt-36">
    <div class="mx-auto max-w-6xl">
      <PageHeader
          title="Projecten"
          subtitle="Een overzicht van de projecten die ik heb ontwikkeld"
      />

      <!-- Filter Buttons -->
      <div v-reveal class="mb-10 flex flex-wrap gap-2">
        <button
            v-for="filter in filters"
            :key="filter.id"
            type="button"
            @click="activeFilter = filter.id"
            :class="[
              'rounded-full px-5 py-2 text-sm font-medium transition-all duration-300',
              activeFilter === filter.id
                ? 'bg-cream text-ink'
                : 'border border-cream/15 text-cream/60 hover:border-cream/40 hover:text-cream'
            ]"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <article
            v-for="(project, index) in filteredProjects"
            :key="project.title"
            v-reveal="(index % 3) * 100"
            class="panel group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-cream/30 hover:bg-panel-2"
        >
          <div v-if="project.thumbnail" class="aspect-[16/9] overflow-hidden border-b border-cream/10 bg-ink">
            <img
                :src="project.thumbnail.src"
                :alt="project.thumbnail.alt"
                :width="project.thumbnail.width"
                :height="project.thumbnail.height"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover object-left-top transition-transform duration-700 ease-out-expo group-hover:scale-105"
            />
          </div>

          <div class="flex flex-1 flex-col p-6">
            <div v-if="project.status || project.featured" class="mb-4 flex flex-wrap gap-2">
              <span v-if="project.status" class="inline-flex items-center gap-2 rounded-full bg-clay/15 px-3 py-1 text-xs text-clay">
                <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-clay" aria-hidden="true" />
                {{ project.status }}
              </span>
              <span v-if="project.featured" class="rounded-full bg-cream px-3 py-1 text-xs font-medium text-ink">
                Featured
              </span>
            </div>

            <h3 class="text-xl font-medium tracking-tight">
              {{ project.title }}
            </h3>
            <p v-if="project.subtitle" class="mt-1 text-sm text-cream/50">{{ project.subtitle }}</p>

            <p class="mb-5 mt-3 leading-relaxed text-cream/60">
              {{ project.description }}
            </p>

            <div class="mb-6 flex flex-wrap gap-2">
              <span v-for="tech in project.technologies" :key="tech" class="tag">
                {{ tech }}
              </span>
            </div>

            <div class="mt-auto">
              <PillButton v-if="project.slug" :to="`/projects/${project.slug}`">
                {{ project.detail ? 'Lees de devlog' : 'Bekijk project' }}
              </PillButton>
              <PillButton v-else-if="project.link" :href="project.link" variant="ghost">
                Bekijk op GitLab
              </PillButton>
            </div>
          </div>
        </article>
      </div>

      <div v-if="filteredProjects.length === 0" class="py-12 text-center">
        <p class="text-lg text-cream/60">
          Geen projecten gevonden voor de geselecteerde filter.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import PillButton from '@/components/ui/PillButton.vue'
import { projects } from '@/data/projects'

const activeFilter = ref('all')

const filters = [
  { id: 'all', label: 'Alle Projecten' },
  ...[...new Set(projects.map(project => project.category))].map(category => ({ id: category, label: category })),
]

const filteredProjects = computed(() => {
  return activeFilter.value === 'all'
      ? projects
      : projects.filter(project => project.category === activeFilter.value)
})
</script>
