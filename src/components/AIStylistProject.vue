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
        <div class="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.04fr_0.96fr] lg:p-10">
          <div class="flex flex-col justify-between gap-8">
            <div>
              <p class="section-kicker">Dark Tech · Smaakmanipulatie</p>
              <h1 class="section-title">AI Stylist Mirror</h1>
              <div class="mt-6 space-y-4 text-base leading-8 text-slate-300">
                <p>
                  Dit project was voor mij een manier om te onderzoeken hoe onschuldig een slimme app kan lijken, terwijl je ondertussen heel bewust richting bepaalde keuzes wordt gestuurd.
                </p>
                <p>
                  Binnen de projectgroep Smaakmanipulatie bouwden we een provocatief prototype: een AI stylist-app waarin je een foto uploadt en daarna outfitadvies en kledingaanbevelingen krijgt. Het doel was niet om een perfecte webshop te maken, maar om te laten voelen hoe AI, personalisatie en digitale platformen invloed kunnen hebben op smaak en koopgedrag.
                </p>
              </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-3">
              <div v-for="item in highlights" :key="item.label" class="subtle-card p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-sky-200/70">{{ item.label }}</p>
                <p class="mt-2 text-sm font-medium leading-6 text-slate-100">{{ item.value }}</p>
              </div>
            </div>
          </div>

          <figure class="overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
            <img
              src="/ai-stylist/ai-stylist-home.png"
              alt="Algemeen startscherm van AI Stylist Mirror"
              class="h-full min-h-[420px] w-full object-cover object-top"
            />
          </figure>
        </div>
      </section>

      <section class="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article class="surface-panel p-6 sm:p-8">
          <p class="section-kicker">Mijn rol</p>
          <h2 class="mb-5 text-2xl font-semibold text-white">Wat ik zelf heb gedaan</h2>
          <div class="space-y-4 text-sm leading-7 text-slate-300">
            <p>
              Mijn bijdrage zat vooral in de schermen waar de gebruiker echt door de app beweegt. Ik heb gewerkt aan de login- en registratiepagina's, de aanbevelingsschermen, het gebruikersdashboard en het admin-dashboard.
            </p>
            <p>
              Daarbij moest ik steeds nadenken over twee kanten: de app moest strak en duidelijk werken, maar tegelijk moesten de manipulatieve keuzes zichtbaar genoeg zijn voor het onderzoek. Dat maakte het interessant, omdat een knoptekst of melding ineens veel meer betekenis kreeg dan normaal.
            </p>
          </div>
        </article>

        <article class="surface-panel p-6 sm:p-8">
          <p class="section-kicker">Wat ik heb gebouwd</p>
          <div class="grid gap-3 sm:grid-cols-2">
            <div v-for="item in builtParts" :key="item.title" class="subtle-card p-5">
              <h3 class="font-semibold text-white">{{ item.title }}</h3>
              <p class="mt-2 text-sm leading-7 text-slate-400">{{ item.description }}</p>
            </div>
          </div>
        </article>
      </section>

      <section class="mt-8 surface-panel p-6 sm:p-8">
        <div class="mb-7 max-w-3xl">
          <p class="section-kicker">Bewijs uit het prototype</p>
          <h2 class="text-2xl font-semibold text-white">Schermen waar ik aan heb gewerkt</h2>
          <p class="mt-3 text-sm leading-7 text-slate-400">
            Deze screenshots laten de belangrijkste onderdelen zien: accountflow, persoonlijke inzichten en het admin-overzicht waarmee gebruikersgedrag kon worden bekeken.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <figure
            v-for="image in contributionImages"
            :key="image.src"
            class="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] transition duration-200 hover:-translate-y-1 hover:border-sky-200/25 hover:bg-white/[0.055]"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              class="h-72 w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <figcaption class="border-t border-white/10 px-4 py-3">
              <p class="text-sm font-semibold text-slate-100">{{ image.label }}</p>
              <p class="mt-1 text-xs leading-5 text-slate-500">{{ image.note }}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section class="mt-8 surface-panel p-6 sm:p-8">
        <div class="mb-7 max-w-3xl">
          <p class="section-kicker">Dark Tech technieken</p>
          <h2 class="text-2xl font-semibold text-white">Manipulatie expres ingebouwd</h2>
          <p class="mt-3 text-sm leading-7 text-slate-400">
            We gebruikten deze technieken bewust overdreven. Niet omdat de app mensen echt moest misleiden, maar omdat je daardoor beter ziet hoe zulke patronen werken in echte platformen.
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <article v-for="item in darkTechniques" :key="item.title" class="subtle-card p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-red-300/80">{{ item.label }}</p>
            <h3 class="mt-3 font-semibold text-white">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-7 text-slate-400">{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="mt-8 grid gap-5 lg:grid-cols-2">
        <article class="surface-panel p-6 sm:p-8">
          <p class="section-kicker">Gebruikerstesten</p>
          <h2 class="mb-5 text-2xl font-semibold text-white">Wat gebruikers sterk vonden</h2>
          <ul class="space-y-3">
            <li v-for="item in positiveFeedback" :key="item" class="flex gap-3 text-sm leading-7 text-slate-300">
              <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-200"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>

        <article class="surface-panel p-6 sm:p-8">
          <p class="section-kicker">Inzichten</p>
          <h2 class="mb-5 text-2xl font-semibold text-white">Wat beter moest</h2>
          <ul class="space-y-3">
            <li v-for="item in improvements" :key="item" class="flex gap-3 text-sm leading-7 text-slate-300">
              <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-300"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </section>

      <section class="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <article class="surface-panel p-6 sm:p-8">
          <p class="section-kicker">Mijn advies</p>
          <h2 class="mb-5 text-2xl font-semibold text-white">Maak beïnvloeding zichtbaar</h2>
          <div class="space-y-4 text-sm leading-7 text-slate-300">
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

        <aside class="surface-panel p-6 sm:p-8">
          <p class="section-kicker">Dashboard idee</p>
          <div class="space-y-3">
            <div v-for="item in transparencyItems" :key="item" class="subtle-card px-4 py-3 text-sm text-slate-300">
              {{ item }}
            </div>
          </div>
        </aside>
      </section>

      <section class="mt-8 surface-panel p-6 sm:p-8">
        <div class="max-w-3xl">
          <p class="section-kicker">Reflectie</p>
          <h2 class="mb-5 text-2xl font-semibold text-white">Wat ik heb geleerd</h2>
          <div class="space-y-4 text-sm leading-7 text-slate-300">
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
defineEmits<{
  navigate: [page: 'projects']
}>()

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
    src: '/ai-stylist/register.png',
    label: 'Registreren',
    note: 'Nieuwe gebruiker met scherpe styling en bewuste voorwaarden.',
    alt: 'Registratiescherm van AI Stylist Mirror',
  },
  {
    src: '/ai-stylist/login.png',
    label: 'Inloggen',
    note: 'Terugkerende gebruiker in dezelfde mobiele flow.',
    alt: 'Inlogscherm van AI Stylist Mirror',
  },
  {
    src: '/ai-stylist/dashboard-overview.png',
    label: 'User dashboard',
    note: 'Persoonlijke inzichten zoals exposure en likes.',
    alt: 'Dashboardoverzicht met persoonlijke inzichten',
  },
  {
    src: '/ai-stylist/admin-observation.png',
    label: 'Admin view',
    note: 'Gebruikersobservatie met manipulatie- en exposuredata.',
    alt: 'Admin-overzicht met gebruikersobservaties',
  },
  {
    src: '/ai-stylist/dashboard-detail.png',
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
