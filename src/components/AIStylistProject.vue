<template>
  <div class="min-h-screen px-4 py-24">
    <div class="max-w-5xl mx-auto">
      <button
          @click="$emit('navigate', 'projects')"
          class="mb-8 inline-flex items-center gap-2 rounded-full border border-[#1E4E7A] bg-sky-500/15 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-950/60"
      >
        Terug naar projecten
      </button>

      <section class="rounded-2xl border border-[#1E4E7A] bg-black/65 p-6 md:p-10 backdrop-blur-sm">
        <div class="mb-8">
          <p class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
            Mobile AI App
          </p>
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-5">
            Dark Tech <span class="text-gradient">AI Stylist Mirror</span>
          </h1>
          <p class="max-w-3xl text-lg leading-relaxed text-gray-300">
            AI Stylist Mirror is een mobiele app waarin gebruikers hun outfit kunnen scannen met de camera en daarna persoonlijke stijladviezen krijgen.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-3 mb-10">
          <div
              v-for="item in highlights"
              :key="item.label"
              class="rounded-xl border border-[#1E4E7A] bg-black/50 p-5"
          >
            <p class="text-sm text-gray-400">{{ item.label }}</p>
            <p class="mt-2 font-semibold text-white">{{ item.value }}</p>
          </div>
        </div>

        <div class="space-y-8 text-gray-300">
          <section>
            <h2 class="text-2xl font-bold text-white mb-3">Projectbeschrijving</h2>
            <p class="leading-relaxed">
              Ik heb gewerkt aan een mobiele applicatie met React Native en Expo. De app werkt als een AI-stylist: gebruikers kunnen een foto maken of uploaden van hun outfit, waarna de app stijladviezen geeft. Ook kunnen gebruikers hun favoriete suggesties opslaan, hun stijlprofiel invullen en eerdere outfits bekijken in een digitale garderobe.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-white mb-3">Mijn bijdrage</h2>
            <p class="leading-relaxed">
              Binnen dit project heb ik vooral gewerkt aan de inlog- en registratiefunctionaliteit en aan het dashboard. Voor authenticatie en gebruikerssessies is Supabase gebruikt. In het dashboard wordt zichtbaar hoe likes, suggesties en beinvloeding werken binnen de app.
            </p>
            <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <figure
                  v-for="image in contributionImages"
                  :key="image.src"
                  class="overflow-hidden rounded-xl border border-[#1E4E7A] bg-black/50"
              >
                <img
                    :src="image.src"
                    :alt="image.alt"
                    class="h-80 w-full object-cover object-top"
                    loading="lazy"
                />
                <figcaption class="border-t border-[#1E4E7A] px-4 py-3 text-sm font-semibold text-white">
                  {{ image.label }}
                </figcaption>
              </figure>
            </div>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-white mb-3">Functionaliteiten</h2>
            <div class="grid gap-3 md:grid-cols-2">
              <div
                  v-for="feature in features"
                  :key="feature"
                  class="rounded-lg border border-[#1E4E7A] bg-sky-500/10 px-4 py-3 text-sm"
              >
                {{ feature }}
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-white mb-3">Onderzoeksdeel</h2>
            <p class="leading-relaxed">
              In het project zijn bewust deceptive patterns en dark patterns toegevoegd, zoals confirmshaming, nep-social-proof en misleidende pop-ups. Dit onderdeel is bedoeld om te laten zien hoe UX-design gebruikerskeuzes kan beinvloeden.
            </p>
          </section>
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
  { label: 'Authenticatie', value: 'Supabase login en sessies' },
  { label: 'Focus', value: 'Dashboard en gebruikersflow' },
]

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
    label: 'Admin view',
    alt: 'Admin-overzicht met gebruikersobservaties',
  },
  {
    src: '/ai-stylist/dashboard-detail.png',
    label: 'Gebruikersdetail',
    alt: 'Detaildashboard voor een gebruiker',
  },
]

const features = [
  'Home, camera, profiel, garderobe, login/register, swipe-scherm en dashboard',
  'Camera-functie waarmee gebruikers hun outfit kunnen scannen',
  'AI-logica die outfits analyseert en stijlsuggesties teruggeeft',
  'Swipe-systeem waarmee gebruikers suggesties kunnen liken of afwijzen',
  'Opslag voor voorkeuren, outfits en scanlimieten',
  'Dashboard voor likes, suggesties en beinvloeding',
]
</script>
