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

      <!-- Intro -->
      <section v-reveal class="panel overflow-hidden">
        <div class="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
          <div class="flex flex-col justify-between gap-8">
            <div>
              <p class="eyebrow mb-3">Website · Template</p>
              <h1 class="display-heading text-5xl sm:text-6xl md:text-7xl">
                <WordsPullUp text="Kapper Template" />
              </h1>
              <div class="mt-6 space-y-4 text-base leading-8 text-cream/70">
                <p>
                  Een herbruikbare website-template voor barbershops: een rustige, strakke site waarop bezoekers
                  de diensten en prijzen zien, de sfeer van de zaak proeven en direct een afspraak kunnen plannen.
                </p>
                <p>
                  De diensten en openingstijden staan centraal in één databestand, zodat de site snel aan te passen
                  is voor een nieuwe kapper: eigen naam, prijzen en gegevens invullen en de rest volgt.
                </p>
              </div>
            </div>

            <div class="flex flex-col gap-6">
              <div class="grid gap-3 sm:grid-cols-3">
                <div v-for="item in highlights" :key="item.label" class="rounded-2xl border border-cream/10 bg-panel-2 p-4">
                  <p class="eyebrow">{{ item.label }}</p>
                  <p class="mt-2 text-sm font-medium leading-6 text-cream">{{ item.value }}</p>
                </div>
              </div>
              <PillButton v-if="repoUrl" :href="repoUrl">Bekijk op GitHub</PillButton>
            </div>
          </div>

          <button
              type="button"
              class="group overflow-hidden rounded-2xl border border-cream/10 bg-white text-left"
              aria-label="Vergroot afbeelding: homepagina van de Kapper Template"
              @click="lightboxImage = heroImage"
          >
            <img
                :src="heroImage.src"
                :alt="heroImage.alt"
                width="1440"
                height="940"
                class="h-full w-full object-cover object-left-top"
            />
          </button>
        </div>
      </section>

      <!-- Onderdelen -->
      <section v-reveal class="mt-8 panel p-6 sm:p-8">
        <div class="mb-7 max-w-3xl">
          <p class="eyebrow mb-3">Opbouw</p>
          <h2 class="text-2xl font-medium tracking-tight text-cream">Wat er op de site staat</h2>
          <p class="mt-3 text-sm leading-7 text-cream/60">
            De homepagina leidt de bezoeker in één keer langs alles wat hij nodig heeft, van eerste indruk tot afspraak.
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(part, index) in sections" :key="part.title" class="rounded-2xl border border-cream/10 bg-panel-2 p-5">
            <p class="text-sm text-cream/40">{{ String(index + 1).padStart(2, '0') }}</p>
            <h3 class="mt-3 font-medium tracking-tight text-cream">{{ part.title }}</h3>
            <p class="mt-2 text-sm leading-7 text-cream/60">{{ part.description }}</p>
          </div>
        </div>
      </section>

      <!-- Screenshots -->
      <section v-reveal class="mt-8 panel p-6 sm:p-8">
        <div class="mb-7 max-w-3xl">
          <p class="eyebrow mb-3">Schermen</p>
          <h2 class="text-2xl font-medium tracking-tight text-cream">Een kijkje in de template</h2>
          <p class="mt-3 text-sm leading-7 text-cream/60">
            Klik op een afbeelding om hem groter te bekijken. De teksten zoals prijzen en adres zijn nog voorbeeldwaarden.
          </p>
        </div>

        <div class="space-y-6">
          <figure v-for="shot in screenshots" :key="shot.src">
            <button
                type="button"
                class="block w-full overflow-hidden rounded-2xl border border-cream/10 bg-white"
                :aria-label="`Vergroot afbeelding: ${shot.alt}`"
                @click="lightboxImage = shot"
            >
              <img :src="shot.src" :alt="shot.alt" :width="shot.width" :height="shot.height" loading="lazy" decoding="async" class="h-auto w-full" />
            </button>
            <figcaption class="mt-3 text-sm text-cream/60">
              <span class="font-medium text-cream">{{ shot.label }}</span> · {{ shot.note }}
            </figcaption>
          </figure>
        </div>
      </section>

      <!-- Techniek -->
      <section v-reveal class="mt-8 grid gap-5 lg:grid-cols-2">
        <article class="panel p-6 sm:p-8">
          <p class="eyebrow mb-3">Techniek</p>
          <h2 class="mb-5 text-2xl font-medium tracking-tight text-cream">Waarmee het gebouwd is</h2>
          <ul class="space-y-3">
            <li v-for="item in techniques" :key="item.name" class="flex gap-3 text-sm leading-7 text-cream/70">
              <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" aria-hidden="true" />
              <span><span class="font-medium text-cream">{{ item.name }}</span> – {{ item.description }}</span>
            </li>
          </ul>
        </article>

        <article class="panel p-6 sm:p-8">
          <p class="eyebrow mb-3">Status</p>
          <h2 class="mb-5 text-2xl font-medium tracking-tight text-cream">Klaar om in te vullen</h2>
          <div class="space-y-4 text-sm leading-7 text-cream/70">
            <p>
              De template is volledig opgemaakt en responsive, maar bevat nog voorbeeldgegevens: prijzen,
              adres, telefoonnummer en de galerijbeelden zijn plaatshouders die per kapper worden ingevuld.
            </p>
            <p>
              De afspraakflow werkt in drie stappen in de browser, maar slaat keuzes nog niet op. Per klant kan
              daar een agenda of database aan gekoppeld worden.
            </p>
          </div>
        </article>
      </section>
    </div>

    <Lightbox :image="lightboxImage" @close="lightboxImage = null" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WordsPullUp from '@/components/ui/WordsPullUp.vue'
import PillButton from '@/components/ui/PillButton.vue'
import Lightbox from '@/components/ui/Lightbox.vue'
import { findProject } from '@/data/projects'

const repoUrl = findProject('kapper-template')?.link

const lightboxImage = ref<{ src: string; alt: string } | null>(null)

const heroImage = {
  src: '/projects/kapper-template/hero.jpg',
  alt: 'Homepagina van de Kapper Template met de kop "Scherp geknipt. Rustig afgewerkt." en een afspraakzoeker',
}

const highlights = [
  { label: 'Type', value: 'Website-template' },
  { label: 'Stack', value: 'React · TanStack Start' },
  { label: 'Status', value: 'Met voorbeeldgegevens' },
]

const sections = [
  { title: 'Hero', description: 'Korte, sterke kop met een afspraakzoeker waarin je direct een behandeling kiest.' },
  { title: 'Diensten', description: 'Knippen, knippen + baard en baard, elk met prijs, duur en wat erbij hoort.' },
  { title: 'Over ons & galerij', description: 'Het verhaal van de zaak en een beeldgalerij voor de sfeer.' },
  { title: 'Afspraak & contact', description: 'Afspraak plannen in drie stappen, reviews, adres en openingstijden.' },
]

const screenshots = [
  {
    src: '/projects/kapper-template/diensten.jpg',
    alt: 'Dienstensectie met drie kaarten: Knippen, Knippen + Baard en Baard',
    width: 1440,
    height: 700,
    label: 'Diensten',
    note: 'Drie behandelingen met prijs, duur en een directe reserveerlink.',
  },
  {
    src: '/projects/kapper-template/boeken.jpg',
    alt: 'Afspraakmodule met de stappen Dienst, Datum & tijd en Gegevens',
    width: 1440,
    height: 680,
    label: 'Afspraak plannen',
    note: 'Een flow in drie stappen: dienst, datum en tijd, gegevens.',
  },
  {
    src: '/projects/kapper-template/contact.jpg',
    alt: 'Contactsectie met adres, contactgegevens en openingstijden',
    width: 1440,
    height: 470,
    label: 'Contact',
    note: 'Adres, contactgegevens, openingstijden en socials op één plek.',
  },
]

const techniques = [
  { name: 'React 19', description: 'componenten voor alle onderdelen van de site.' },
  { name: 'TanStack Start', description: 'routing en server-side rendering.' },
  { name: 'TypeScript', description: 'getypeerde data voor diensten en openingstijden.' },
  { name: 'Tailwind CSS', description: 'de volledige opmaak en het responsive gedrag.' },
  { name: 'Motion', description: 'rustige scroll- en overgangsanimaties.' },
]
</script>
