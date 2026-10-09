<template>
  <div class="min-h-screen px-4 pb-20 pt-28 sm:px-6 md:px-10 md:pt-36">
    <div class="mx-auto max-w-6xl">
      <PageHeader
          title="Over mij"
          subtitle="Ik ben 20 jaar oud, woon in Amsterdam-Noord en volg HBO-ICT Software Engineering aan de HvA."
      />

      <div class="mb-16 grid items-start gap-6 md:grid-cols-5 md:gap-12">
        <div v-reveal class="panel relative overflow-hidden p-8 md:col-span-2">
          <div class="noise-overlay pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />
          <h2 class="relative mb-6 text-2xl font-medium tracking-tight">Kort profiel</h2>
          <dl class="relative space-y-4">
            <div v-for="info in personalInfo" :key="info.label" class="border-b border-cream/10 pb-3 last:border-0">
              <dt class="eyebrow mb-1">{{ info.label }}</dt>
              <dd class="text-cream/90">{{ info.value }}</dd>
            </div>
          </dl>
        </div>

        <div v-reveal="150" class="md:col-span-3">
          <h2 class="mb-6 text-2xl font-medium tracking-tight">Over mij</h2>
          <div class="space-y-4 text-lg leading-relaxed text-cream/70">
            <p v-for="paragraph in storyParagraphs" :key="paragraph.substring(0, 50)">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>

      <!-- Skills Section -->
      <section>
        <h2 v-reveal class="mb-8 text-2xl font-medium tracking-tight">Technische basis</h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
              v-for="(skillList, category, index) in skills"
              :key="category"
              v-reveal="index * 80"
              class="panel p-6"
          >
            <h3 class="eyebrow mb-4">
              {{ getCategoryLabel(category) }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in skillList" :key="skill" class="tag">
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
import PageHeader from '@/components/ui/PageHeader.vue'

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

const skills: Record<string, string[]> = {
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
