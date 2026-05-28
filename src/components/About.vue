<template>
  <div class="page-shell">
    <div class="narrow-shell">
      <div class="mb-14">
        <p class="section-kicker">Over mij</p>
        <h1 class="section-title">
          Ik ben Yusuf Topal, Software Engineering student aan de HvA.
        </h1>
        <p class="section-copy mt-5">
          Ik ben 20 jaar oud, woon in Amsterdam-Noord en volg HBO-ICT Software Engineering aan de HvA.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <section class="surface-panel p-6 sm:p-7">
          <h2 class="mb-6 text-xl font-semibold text-white">Kort profiel</h2>
          <div class="space-y-4">
            <div v-for="info in personalInfo" :key="info.label" class="border-b border-white/10 pb-4 last:border-0 last:pb-0">
              <p class="text-sm text-slate-400">{{ info.label }}</p>
              <p class="mt-1 font-medium text-slate-100">{{ info.value }}</p>
            </div>
          </div>
        </section>

        <section class="surface-panel p-6 sm:p-8">
          <h2 class="mb-5 text-xl font-semibold text-white">Over mij</h2>
          <div class="space-y-5 text-base leading-8 text-slate-300">
            <p v-for="paragraph in storyParagraphs" :key="paragraph.substring(0, 50)">
              {{ paragraph }}
            </p>
          </div>
        </section>
      </div>

      <section class="mt-8 surface-panel p-6 sm:p-8">
        <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="section-kicker">Skills</p>
            <h2 class="text-2xl font-semibold text-white">Technische basis</h2>
          </div>
          <p class="max-w-lg text-sm leading-6 text-slate-400">Technologieen waar ik mee heb gewerkt tijdens mijn projecten.</p>
        </div>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="(skillList, category) in skills" :key="category" class="subtle-card p-5">
            <h3 class="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-sky-100/75">
              {{ getCategoryLabel(category) }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in skillList"
                :key="skill"
                class="pill"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
const personalInfo = [
  { label: 'Naam', value: 'Yusuf Topal' },
  { label: 'Leeftijd', value: '20 jaar' },
  { label: 'Locatie', value: 'Amsterdam-Noord' },
  { label: 'Opleiding', value: 'HBO-ICT Software Engineering, HvA' },
]

const storyParagraphs = [
  'Ik ben Yusuf, 20 jaar oud en ik woon in Amsterdam-Noord. Ik ben rustig, zelfstandig en iemand die graag anderen helpt.',
  'Ik werk graag aan duidelijke en overzichtelijke projecten, en vind het fijn als dingen logisch in elkaar zitten. Ik kan goed zelfstandig werken, maar ook goed samenwerken.',
  'Wat ik leuk vind aan development is dat je zelf iets moois en bruikbaars kunt maken. Vooral het ontwerpen en bouwen van moderne en gebruiksvriendelijke websites vind ik leuk.'
]

const skills = {
  frontend: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Vue', 'React'],
  backend: ['Java', 'Node.js', 'Express', 'Spring Boot'],
  database: ['MySQL', 'Database Design', 'Supabase'],
  mobile: ['Kotlin', 'React Native', 'Expo'],
  tools: ['Git', 'GitLab', 'OOP', 'Tailwind CSS']
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    mobile: 'Mobile',
    tools: 'Tools'
  }
  return labels[category] || category
}
</script>
