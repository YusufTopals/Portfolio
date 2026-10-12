<template>
  <div class="min-h-screen px-4 pb-20 pt-28 sm:px-6 md:px-10 md:pt-36">
    <div class="mx-auto max-w-6xl">
      <router-link
          to="/projects"
          class="mb-10 inline-flex items-center gap-2 text-sm text-cream/60 transition-colors hover:text-cream"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m6-6l-6 6 6 6" />
        </svg>
        Alle projecten
      </router-link>

      <section v-reveal class="panel overflow-hidden">
        <div class="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.04fr_0.96fr] lg:p-10">
          <div class="flex flex-col justify-between gap-8">
            <div>
              <p class="eyebrow mb-3">Dark Tech · Smaakmanipulatie</p>
              <h1 class="display-heading text-5xl sm:text-6xl md:text-7xl">
                <WordsPullUp text="AI Stylist Mirror" />
              </h1>
              <div class="mt-6 space-y-4 text-base leading-8 text-cream/70">
                <p>
                  Dit project was voor mij een manier om te onderzoeken hoe onschuldig een slimme app kan lijken, terwijl je ondertussen heel bewust richting bepaalde keuzes wordt gestuurd.
                </p>
                <p>
                  Binnen de projectgroep Smaakmanipulatie bouwden we een provocatief prototype: een AI stylist-app waarin je een foto uploadt en daarna outfitadvies en kledingaanbevelingen krijgt. Het doel was niet om een perfecte webshop te maken, maar om te laten voelen hoe AI, personalisatie en digitale platformen invloed kunnen hebben op smaak en koopgedrag.
                </p>
              </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-3">
              <div v-for="item in highlights" :key="item.label" class="rounded-2xl border border-cream/10 bg-panel-2 p-4">
                <p class="eyebrow">{{ item.label }}</p>
                <p class="mt-2 text-sm font-medium leading-6 text-cream">{{ item.value }}</p>
              </div>
            </div>
          </div>

          <figure class="overflow-hidden rounded-2xl border border-cream/10 bg-panel-2">
            <img
              src="/ai-stylist/ai-stylist-home.jpg"
              alt="Algemeen startscherm van AI Stylist Mirror"
              class="h-full min-h-[420px] w-full object-cover object-top"
            />
          </figure>
        </div>
      </section>

      <section v-reveal class="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article class="panel p-6 sm:p-8">
          <p class="eyebrow mb-3">Mijn rol</p>
          <h2 class="mb-5 text-2xl font-medium tracking-tight text-cream">Wat ik zelf heb gedaan</h2>
          <div class="space-y-4 text-sm leading-7 text-cream/70">
            <p>
              Mijn bijdrage zat vooral in de schermen waar de gebruiker echt door de app beweegt. Ik heb gewerkt aan de login- en registratiepagina's, de aanbevelingsschermen, het gebruikersdashboard en het admin-dashboard.
            </p>
            <p>
              Daarbij moest ik steeds nadenken over twee kanten: de app moest strak en duidelijk werken, maar tegelijk moesten de manipulatieve keuzes zichtbaar genoeg zijn voor het onderzoek. Dat maakte het interessant, omdat een knoptekst of melding ineens veel meer betekenis kreeg dan normaal.
            </p>
          </div>
        </article>

        <article class="panel p-6 sm:p-8">
          <p class="eyebrow mb-3">Wat ik heb gebouwd</p>
          <div class="grid gap-3 sm:grid-cols-2">
            <div v-for="item in builtParts" :key="item.title" class="rounded-2xl border border-cream/10 bg-panel-2 p-5">
              <h3 class="font-medium tracking-tight text-cream">{{ item.title }}</h3>
              <p class="mt-2 text-sm leading-7 text-cream/60">{{ item.description }}</p>
            </div>
          </div>
        </article>
      </section>

      <section v-reveal class="mt-8 panel p-6 sm:p-8">
        <div class="mb-7 max-w-3xl">
          <p class="eyebrow mb-3">Bewijs uit het prototype</p>
          <h2 class="text-2xl font-medium tracking-tight text-cream">Schermen waar ik aan heb gewerkt</h2>
          <p class="mt-3 text-sm leading-7 text-cream/60">
            Deze screenshots laten de belangrijkste onderdelen zien: accountflow, persoonlijke inzichten en het admin-overzicht waarmee gebruikersgedrag kon worden bekeken.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <figure
            v-for="image in contributionImages"
            :key="image.src"
            class="group overflow-hidden rounded-2xl border border-cream/10 bg-panel-2 transition duration-200 hover:-translate-y-1 hover:border-cream/30"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              class="h-72 w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <figcaption class="border-t border-cream/10 px-4 py-3">
              <p class="text-sm font-semibold text-cream">{{ image.label }}</p>
              <p class="mt-1 text-xs leading-5 text-cream/40">{{ image.note }}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section v-reveal class="mt-8 panel p-6 sm:p-8">
        <div class="mb-7 max-w-3xl">
          <p class="eyebrow mb-3">Dark Tech technieken</p>
          <h2 class="text-2xl font-medium tracking-tight text-cream">Manipulatie expres ingebouwd</h2>
          <p class="mt-3 text-sm leading-7 text-cream/60">
            We gebruikten deze technieken bewust overdreven. Niet omdat de app mensen echt moest misleiden, maar omdat je daardoor beter ziet hoe zulke patronen werken in echte platformen.
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <article v-for="item in darkTechniques" :key="item.title" class="rounded-2xl border border-cream/10 bg-panel-2 p-5">
            <p class="text-xs uppercase tracking-[0.2em] text-clay">{{ item.label }}</p>
            <h3 class="mt-3 font-medium tracking-tight text-cream">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-7 text-cream/60">{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section v-reveal class="mt-8 grid gap-5 lg:grid-cols-2">
        <article class="panel p-6 sm:p-8">
          <p class="eyebrow mb-3">Gebruikerstesten</p>
          <h2 class="mb-5 text-2xl font-medium tracking-tight text-cream">Wat gebruikers sterk vonden</h2>
          <ul class="space-y-3">
            <li v-for="item in positiveFeedback" :key="item" class="flex gap-3 text-sm leading-7 text-cream/70">
              <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>

        <article class="panel p-6 sm:p-8">
          <p class="eyebrow mb-3">Inzichten</p>
          <h2 class="mb-5 text-2xl font-medium tracking-tight text-cream">Wat beter moest</h2>
          <ul class="space-y-3">
            <li v-for="item in improvements" :key="item" class="flex gap-3 text-sm leading-7 text-cream/70">
              <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </section>

      <section v-reveal class="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <article class="panel p-6 sm:p-8">
          <p class="eyebrow mb-3">Mijn advies</p>
          <h2 class="mb-5 text-2xl font-medium tracking-tight text-cream">Maak beïnvloeding zichtbaar</h2>
          <div class="space-y-4 text-sm leading-7 text-cream/70">
            <p>
              Mijn advies was om een transparantie-dashboard toe te voegen. Daarin kan een gebruiker terugzien welke aanbevelingen zijn getoond, welke technieken zijn gebruikt en welke data daarvoor is ingezet.
            </p>
            <p>
              Uit de testen bleek dat gebruikers vooral achteraf doorhadden hoeveel de app probeerde te sturen. Juist daarom vond ik het belangrijk om niet alleen te manipuleren in het prototype, maar ook te laten zien waar die beïnvloeding vandaan kwam.
            </p>
            <p>
              De maatschappelijke kant zit daar voor mij in: als AI en algoritmes steeds vaker keuzes voor ons voorbereiden, moeten gebruikers beter kunnen zien wanneer advies overgaat in duwen.
            </p>
          </div>
        </article>

        <aside class="panel p-6 sm:p-8">
          <p class="eyebrow mb-3">Dashboard idee</p>
          <div class="space-y-3">
            <div v-for="item in transparencyItems" :key="item" class="rounded-2xl border border-cream/10 bg-panel-2 px-4 py-3 text-sm text-cream/70">
              {{ item }}
            </div>
          </div>
        </aside>
      </section>

      <section v-reveal class="mt-8 panel p-6 sm:p-8">
        <div class="max-w-3xl">
          <p class="eyebrow mb-3">Reflectie</p>
          <h2 class="mb-5 text-2xl font-medium tracking-tight text-cream">Wat ik heb geleerd</h2>
          <div class="space-y-4 text-sm leading-7 text-cream/70">
            <p>
              Ik ben door dit project anders gaan kijken naar kleine ontwerpkeuzes. Een tekst op een knop lijkt soms onbelangrijk, maar kan precies het verschil maken tussen vrij kiezen en gestuurd worden.
            </p>
            <p>
              Als software engineer bouw je niet alleen schermen en functies. Je bouwt ook routes waar mensen doorheen lopen. In dit project zag ik hoe snel zo'n route commercieel, sociaal of emotioneel kan duwen.
            </p>
            <p>
              Het belangrijkste dat ik meeneem is dat techniek duidelijk moet zijn over haar invloed. AI kan handig zijn, maar gebruikers moeten kunnen begrijpen waarom ze iets te zien krijgen en welke belangen daarachter zitten.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import WordsPullUp from '@/components/ui/WordsPullUp.vue'

const highlights = [
  { label: 'Groep', value: 'Smaakmanipulatie' },
  { label: 'Mijn focus', value: 'Auth, aanbevelingen en dashboards' },
  { label: 'Thema', value: 'AI, dark patterns en keuzevrijheid' },
]

const builtParts = [
  {
    title: 'Login en registratie',
    description: 'Schermen voor nieuwe en terugkerende gebruikers, in dezelfde donkere look-and-feel als de rest van de app.',
  },
  {
    title: 'Aanbevelingsflow',
    description: 'Schermen waarin outfits en kledingstukken terugkomen, met bewuste druk richting bekijken en kopen.',
  },
  {
    title: 'User dashboard',
    description: 'Een overzicht waarin de gebruiker likes, exposure, voorkeuren en manipulatiescore kan terugzien.',
  },
  {
    title: 'Admin dashboard',
    description: 'Een observatie-overzicht waarmee zichtbaar werd hoe gebruikers door het prototype bewogen.',
  },
]

const contributionImages = [
  {
    src: '/ai-stylist/register.jpg',
    label: 'Registreren',
    note: 'Nieuwe gebruiker met scherpe styling en bewuste voorwaarden.',
    alt: 'Registratiescherm van AI Stylist Mirror',
  },
  {
    src: '/ai-stylist/login.jpg',
    label: 'Inloggen',
    note: 'Terugkerende gebruiker in dezelfde mobiele flow.',
    alt: 'Inlogscherm van AI Stylist Mirror',
  },
  {
    src: '/ai-stylist/dashboard-overview.jpg',
    label: 'User dashboard',
    note: 'Persoonlijke inzichten zoals exposure en likes.',
    alt: 'Dashboardoverzicht met persoonlijke inzichten',
  },
  {
    src: '/ai-stylist/admin-observation.jpg',
    label: 'Admin view',
    note: 'Gebruikersobservatie met manipulatie- en exposuredata.',
    alt: 'Admin-overzicht met gebruikersobservaties',
  },
  {
    src: '/ai-stylist/dashboard-detail.jpg',
    label: 'Detaildashboard',
    note: 'Een gebruiker verder analyseren op voorkeuren en gedrag.',
    alt: 'Detaildashboard voor een gebruiker',
  },
]

const darkTechniques = [
  {
    label: 'Microcopy',
    title: 'Confirmshaming',
    description: 'Bij weigeren kreeg de gebruiker bijvoorbeeld tekst als: "Nee, ik zie er liever saai uit". Dat voelt klein, maar zet druk op de keuze.',
  },
  {
    label: 'Commercie',
    title: 'Koopdruk',
    description: 'De app stuurde steeds richting producten bekijken en kopen, waardoor het advies minder neutraal aanvoelde.',
  },
  {
    label: 'Herhaling',
    title: 'Product exposure',
    description: 'Bepaalde kledingstukken kwamen vaker terug, zodat ze vertrouwder en aantrekkelijker gingen voelen.',
  },
  {
    label: 'Sociale druk',
    title: 'Contactmeldingen',
    description: 'Gebruikers kregen meldingen alsof mensen uit hun contacten producten hadden gekocht. Dat maakte de aanbeveling socialer en dwingender.',
  },
]

const positiveFeedback = [
  'Gebruikers vonden het design strak, simpel en overzichtelijk.',
  'De stappen op de homepagina en bij account aanmaken waren duidelijk.',
  'Animaties, laadschermen en scan-icoontjes werden positief genoemd.',
  'De camera startte snel en het was duidelijk hoe je een foto moest maken.',
  'De koppeling naar producten werkte technisch goed.',
]

const improvements = [
  'Na het scannen kwam de loginvraag te plotseling, waardoor de flow werd onderbroken.',
  'Manipulatieve teksten vielen op, vooral de confirmshaming bij het weigeren van advies.',
  'De app pushte sterk richting kopen, waardoor het advies minder onafhankelijk voelde.',
]

const transparencyItems = [
  'Welke aanbevelingen heb ik gekregen?',
  'Welke producten zijn meerdere keren getoond?',
  'Welke dark patterns zijn bij mij gebruikt?',
  'Welke data speelde mee in mijn advies?',
  'Wanneer werd ik richting aankoop gestuurd?',
]
</script>
