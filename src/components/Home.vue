<template>
  <div>
    <!-- Hero -->
    <section class="h-svh w-full p-2 sm:p-3">
      <div class="relative h-full w-full overflow-hidden rounded-2xl bg-panel md:rounded-[2rem]">
        <!-- Achtergrond: statische blauwe gloed -->
        <div
            class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,#2e2e2e_0%,transparent_55%),radial-gradient(ellipse_at_85%_90%,#222222_0%,transparent_50%)]"
            aria-hidden="true"
        />

        <!-- Gradient overlay -->
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <!-- Hero content -->
        <div class="absolute bottom-0 left-0 right-0 px-4 pb-2 sm:px-6 md:px-10">
          <div class="grid grid-cols-12 items-end gap-4">
            <div class="col-span-12 lg:col-span-8">
              <h1 class="display-heading text-[26vw] leading-[0.85] tracking-[-0.05em] sm:text-[24vw] md:text-[22vw] lg:text-[19vw]">
                <span class="sr-only">Yusuf Topal – Software Engineering Student</span>
                <WordsPullUp text="Yusuf" aria-hidden="true" />
              </h1>
            </div>

            <div class="col-span-12 flex flex-col gap-5 pb-6 lg:col-span-4 lg:pb-10">
              <p v-reveal="100" class="eyebrow">Software Engineering Student · Amsterdam-Noord</p>
              <p v-reveal="150" class="text-sm leading-snug text-cream/70 sm:text-base md:text-lg">
                Ik ben 20 jaar oud en studeer Software Engineering aan de HvA. Op deze portfolio
                laat ik projecten zien waar ik tijdens mijn opleiding en eigen ontwikkeling aan heb gewerkt.
              </p>
              <div v-reveal="200" class="flex flex-wrap gap-3">
                <PillButton to="/projects">Bekijk mijn projecten</PillButton>
                <PillButton to="/contact" variant="ghost">Neem contact op</PillButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stack-band -->
    <section class="overflow-hidden border-b border-cream/10 py-8 md:py-10" aria-label="Technieken">
      <ul class="sr-only">
        <li v-for="tech in techStack" :key="tech">{{ tech }}</li>
      </ul>
      <div class="flex w-max animate-marquee" aria-hidden="true">
        <div v-for="copy in 2" :key="copy" class="flex shrink-0 items-center">
          <span
              v-for="tech in techStack"
              :key="tech"
              class="flex items-center whitespace-nowrap text-3xl font-medium tracking-[-0.04em] text-cream/80 md:text-5xl"
          >
            {{ tech }}
            <span class="mx-6 h-6 w-px bg-cream/15 md:mx-10" aria-hidden="true" />
          </span>
        </div>
      </div>
    </section>

    <!-- Intro -->
    <section class="px-4 py-24 sm:px-6 md:px-10 md:py-32">
      <div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <p v-reveal class="eyebrow lg:col-span-3">Over mij</p>
        <div class="lg:col-span-9">
          <h2 class="display-heading text-3xl leading-[1.05] sm:text-4xl md:text-6xl">
            <WordsPullUp text="Ik ontwerp en bouw moderne, gebruiksvriendelijke websites en apps – van eerste schets tot werkende code." />
          </h2>

          <dl class="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 md:grid-cols-4">
            <div
                v-for="(fact, index) in facts"
                :key="fact.label"
                v-reveal="index * 80"
                class="bg-ink p-5 md:p-6"
            >
              <dt class="eyebrow mb-3">{{ fact.label }}</dt>
              <dd class="text-lg font-medium tracking-tight md:text-xl">{{ fact.value }}</dd>
            </div>
          </dl>

          <div v-reveal class="mt-10">
            <PillButton to="/about" variant="ghost">Meer over mij</PillButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Uitgelicht werk -->
    <section class="px-4 pb-24 sm:px-6 md:px-10 md:pb-32">
      <div class="mx-auto max-w-6xl">
        <div class="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p v-reveal class="eyebrow mb-4">Uitgelicht werk</p>
            <h2 class="display-heading text-4xl sm:text-5xl md:text-7xl">
              <WordsPullUp text="Recente projecten" />
            </h2>
          </div>
          <div v-reveal>
            <PillButton to="/projects" variant="ghost">Alle projecten</PillButton>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <router-link
              v-for="(project, index) in highlighted"
              :key="project.slug"
              v-reveal="index * 120"
              :to="`/projects/${project.slug}`"
              class="panel group flex flex-col overflow-hidden transition-colors duration-300 hover:border-cream/30"
          >
            <div v-if="project.thumbnail" class="aspect-[16/10] overflow-hidden border-b border-cream/10 bg-ink">
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
            <div class="flex flex-1 items-start justify-between gap-6 p-6 md:p-8">
              <div>
                <p class="eyebrow mb-3">{{ String(index + 1).padStart(2, '0') }} · {{ project.category }}</p>
                <h3 class="text-2xl font-medium tracking-tight md:text-3xl">{{ project.title }}</h3>
                <p class="mt-3 max-w-md leading-relaxed text-cream/60">{{ project.description }}</p>
              </div>
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-ink transition-transform duration-300 group-hover:-rotate-45">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Wat ik doe -->
    <section class="border-t border-cream/10 px-4 py-24 sm:px-6 md:px-10 md:py-32">
      <div class="mx-auto max-w-6xl">
        <p v-reveal class="eyebrow mb-4">Wat ik doe</p>
        <h2 class="display-heading mb-14 text-4xl sm:text-5xl md:text-7xl">
          <WordsPullUp text="Focusgebieden" />
        </h2>

        <div class="grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-4 md:rounded-[2rem]">
          <article
              v-for="(area, index) in focusAreas"
              :key="area.title"
              v-reveal="index * 100"
              class="flex flex-col bg-ink p-6 transition-colors duration-300 hover:bg-panel md:p-8"
          >
            <span class="mb-10 text-sm text-cream/40">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="mb-3 text-xl font-medium tracking-tight">{{ area.title }}</h3>
            <p class="mb-6 leading-relaxed text-cream/60">{{ area.description }}</p>
            <div class="mt-auto flex flex-wrap gap-2">
              <span v-for="tool in area.tools" :key="tool" class="tag">{{ tool }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Call to action -->
    <section class="px-2 pb-2 sm:px-3 sm:pb-3">
      <div class="panel relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
        <div class="pointer-events-none absolute inset-0" aria-hidden="true">
          <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_0%,#2e2e2e_0%,transparent_60%)]" />
        </div>

        <div class="relative mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p v-reveal class="eyebrow mb-4">Contact</p>
            <h2 class="display-heading text-5xl sm:text-6xl md:text-8xl">
              <WordsPullUp text="Laten we kennismaken" />
            </h2>
          </div>
          <div v-reveal="200" class="flex max-w-sm flex-col gap-6">
            <p class="text-lg leading-relaxed text-cream/70">
              Heb je een vraag, feedback of een idee voor een project? Stuur gerust een bericht.
            </p>
            <PillButton to="/contact">Stuur een bericht</PillButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import WordsPullUp from '@/components/ui/WordsPullUp.vue'
import PillButton from '@/components/ui/PillButton.vue'
import { projects } from '@/data/projects'

const techStack = [
  'TypeScript', 'JavaScript', 'Vue', 'React', 'Java', 'Spring Boot',
  'Node.js', 'Express', 'MySQL', 'Supabase', 'React Native', 'Kotlin', 'Tailwind CSS',
]

const facts = [
  { label: 'Leeftijd', value: '20 jaar' },
  { label: 'Opleiding', value: 'HBO-ICT SE, HvA' },
  { label: 'Locatie', value: 'Amsterdam-Noord' },
  { label: 'Projecten', value: `${projects.length} projecten` },
]

// Projecten met een eigen pagina komen op de homepagina
const highlighted = projects.filter((project) => project.slug).slice(0, 2)

const focusAreas = [
  {
    title: 'Frontend',
    description: 'Overzichtelijke interfaces met een logische structuur en een prettige gebruikservaring.',
    tools: ['Vue', 'React', 'TypeScript'],
  },
  {
    title: 'Backend & data',
    description: 'API\'s, authenticatie en databasekoppelingen voor fullstack applicaties.',
    tools: ['Spring Boot', 'Node.js', 'MySQL'],
  },
  {
    title: 'Mobile',
    description: 'Mobiele apps met een duidelijke flow, van account aanmaken tot dashboard.',
    tools: ['React Native', 'Expo', 'Supabase'],
  },
  {
    title: 'UX & prototyping',
    description: 'Van eerste design en fysiek prototype tot gebruikerstest en verbeterde versie.',
    tools: ['UX/UI Design', 'User Testing'],
  },
]
</script>
