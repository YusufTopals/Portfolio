<template>
  <div class="page-shell">
    <div class="content-shell">
      <button
        @click="$emit('navigate', 'projects')"
        class="secondary-action mb-8 px-4 py-2"
      >
        Terug naar projecten
      </button>

      <section class="surface-panel overflow-hidden">
        <div class="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div>
            <p class="section-kicker">Case study</p>
            <h1 class="section-title">AI Stylist Mirror</h1>
            <p class="section-copy mt-5">
              Een mobiele app waarin gebruikers outfits kunnen scannen, stijlvoorkeuren bijhouden en persoonlijke suggesties krijgen. Mijn focus lag op authenticatie, dashboard-ervaring en het zichtbaar maken van UX-beinvloeding.
            </p>
          </div>

          <div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div v-for="item in highlights" :key="item.label" class="subtle-card p-4">
              <p class="text-sm text-slate-500">{{ item.label }}</p>
              <p class="mt-1 font-medium text-slate-100">{{ item.value }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-8 grid gap-5 lg:grid-cols-3">
        <div v-for="item in overview" :key="item.title" class="surface-panel p-6">
          <h2 class="mb-3 text-lg font-semibold text-white">{{ item.title }}</h2>
          <p class="text-sm leading-7 text-slate-300">{{ item.description }}</p>
        </div>
      </section>

      <section class="mt-8 surface-panel p-6 sm:p-8">
        <div class="mb-7 max-w-2xl">
          <p class="section-kicker">Screenshots</p>
          <h2 class="text-2xl font-semibold text-white">Screenshots</h2>
          <p class="mt-3 text-sm leading-7 text-slate-400">
            Screens uit de login, registratie en dashboardflow. Deze sectie blijft bewust rustig zodat de app-schermen centraal staan.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <figure
            v-for="image in contributionImages"
            :key="image.src"
            class="overflow-hidden rounded-xl border border-white/10 bg-white/[0.035]"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              class="h-72 w-full object-cover object-top"
              loading="lazy"
            />
            <figcaption class="border-t border-white/10 px-4 py-3 text-sm font-medium text-slate-100">
              {{ image.label }}
            </figcaption>
          </figure>
        </div>
      </section>

      <section class="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div class="surface-panel p-6 sm:p-8">
          <p class="section-kicker">Technologie</p>
          <h2 class="mb-5 text-2xl font-semibold text-white">Technologie</h2>
          <div class="flex flex-wrap gap-2">
            <span v-for="tech in technologies" :key="tech" class="pill">{{ tech }}</span>
          </div>
        </div>

        <div class="surface-panel p-6 sm:p-8">
          <p class="section-kicker">Features</p>
          <h2 class="mb-5 text-2xl font-semibold text-white">Features</h2>
          <div class="grid gap-3 sm:grid-cols-2">
            <div
              v-for="feature in features"
              :key="feature"
              class="subtle-card p-4 text-sm leading-6 text-slate-300"
            >
              {{ feature }}
            </div>
          </div>
        </div>
      </section>

      <section class="mt-8 surface-panel p-6 sm:p-8">
        <p class="section-kicker">Onderzoek</p>
        <h2 class="mb-5 text-2xl font-semibold text-white">Dark patterns en deceptive design</h2>
        <div class="grid gap-5 lg:grid-cols-3">
          <article v-for="item in research" :key="item.title" class="subtle-card p-5">
            <h3 class="mb-2 font-semibold text-white">{{ item.title }}</h3>
            <p class="text-sm leading-7 text-slate-400">{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="mt-8 grid gap-5 lg:grid-cols-2">
        <div class="surface-panel p-6 sm:p-8">
          <p class="section-kicker">Proces</p>
          <h2 class="mb-5 text-2xl font-semibold text-white">Proces</h2>
          <ol class="space-y-4">
            <li v-for="step in process" :key="step.title" class="flex gap-4">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-200/80"></span>
              <div>
                <p class="font-medium text-slate-100">{{ step.title }}</p>
                <p class="mt-1 text-sm leading-6 text-slate-400">{{ step.description }}</p>
              </div>
            </li>
          </ol>
        </div>

        <div class="surface-panel p-6 sm:p-8">
          <p class="section-kicker">Reflectie</p>
          <h2 class="mb-5 text-2xl font-semibold text-white">Reflectie</h2>
          <div class="space-y-4 text-sm leading-7 text-slate-300">
            <p>
              Dit project liet goed zien hoe snel een interface gebruikers kan sturen. Daardoor ben ik bewuster gaan kijken naar microcopy, defaults en feedbackmomenten.
            </p>
            <p>
              Technisch heb ik vooral geleerd hoe belangrijk een duidelijke sessieflow en dashboardstructuur zijn wanneer een app meerdere gebruikersacties moet combineren.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  navigate: [page: 'projects']
}>()

const highlights = [
  { label: 'Platform', value: 'React Native + Expo' },
  { label: 'Rol', value: 'Login, registratie en dashboard' },
  { label: 'Thema', value: 'AI styling en UX-beinvloeding' },
]

const overview = [
  {
    title: 'Project uitleg',
    description: 'AI Stylist Mirror helpt gebruikers outfits vastleggen en suggesties beoordelen. De app combineert persoonlijke voorkeuren, scanmomenten en dashboardinzichten.',
  },
  {
    title: 'Mijn rol',
    description: 'Ik werkte aan de authenticatieflow, de dashboardopbouw en de manier waarop gebruikersgedrag zichtbaar werd gemaakt voor onderzoek.',
  },
  {
    title: 'UX keuzes',
    description: 'De interface gebruikt korte stappen, herkenbare schermen en duidelijke feedback zodat de flow begrijpelijk blijft op mobiel.',
  },
]

const technologies = ['React Native', 'Expo', 'Supabase', 'TypeScript', 'Dashboard UI', 'UX research']

const contributionImages = [
  {
    src: '/ai-stylist/register.png',
    label: 'Registreren',
    alt: 'Registratiescherm van AI Stylist Mirror',
  },
  {
    src: '/ai-stylist/login.png',
    label: 'Inloggen',
    alt: 'Inlogscherm van AI Stylist Mirror',
  },
  {
    src: '/ai-stylist/dashboard-overview.png',
    label: 'Dashboard',
    alt: 'Dashboardoverzicht met persoonlijke inzichten',
  },
  {
    src: '/ai-stylist/admin-observation.png',
    label: 'Observatie',
    alt: 'Admin-overzicht met gebruikersobservaties',
  },
  {
    src: '/ai-stylist/dashboard-detail.png',
    label: 'Gebruikersdetail',
    alt: 'Detaildashboard voor een gebruiker',
  },
]

const features = [
  'Login en registratie met Supabase',
  'Dashboard met likes, suggesties en gebruikersgedrag',
  'Outfit-scan flow met camera of upload',
  'Swipe-systeem voor suggesties',
  'Stijlprofiel en voorkeuren',
  'Onderzoeksflow rond beinvloeding en keuzes',
]

const research = [
  {
    title: 'Confirmshaming',
    description: 'Onderzocht hoe afwijzende tekst gebruikers kan sturen en waarom zulke patronen ethisch problematisch zijn.',
  },
  {
    title: 'Social proof',
    description: 'Bekeken hoe neppe populariteit vertrouwen kan beinvloeden en hoe je dat zichtbaar kunt maken in een testomgeving.',
  },
  {
    title: 'Misleidende pop-ups',
    description: 'Geanalyseerd hoe timing, contrast en knoppen invloed hebben op keuzes binnen een mobiele interface.',
  },
]

const process = [
  {
    title: 'Flow schetsen',
    description: 'Eerst de belangrijkste schermen en gebruikersacties bepalen.',
  },
  {
    title: 'Authenticatie bouwen',
    description: 'Login, registratie en sessies koppelen aan Supabase.',
  },
  {
    title: 'Dashboard structureren',
    description: 'Gebruikersacties vertalen naar duidelijke data en overzichtelijke kaarten.',
  },
  {
    title: 'Onderzoek reflecteren',
    description: 'Dark patterns niet alleen toepassen, maar ook uitleggen waarom ze werken.',
  },
]
</script>
