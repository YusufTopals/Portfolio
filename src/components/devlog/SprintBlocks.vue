<template>
  <div class="space-y-6">
    <template v-for="(block, i) in blocks" :key="i">
      <!-- Tekst -->
      <div v-if="block.type === 'text'" v-reveal class="max-w-3xl space-y-4 text-lg leading-relaxed text-cream/70">
        <p v-for="(paragraph, j) in block.paragraphs" :key="paragraph.substring(0, 40)">
          <strong v-if="block.lead && j === 0" class="font-medium text-cream">{{ block.lead }}</strong>
          {{ paragraph }}
        </p>
      </div>

      <!-- Breed overzicht, klikbaar -->
      <figure v-else-if="block.type === 'image-wide'" v-reveal>
        <button
            type="button"
            class="group relative block w-full overflow-hidden rounded-2xl border border-cream/10 bg-ink md:rounded-[2rem]"
            :aria-label="`Vergroot afbeelding: ${block.image.alt}`"
            @click="emit('open', block.image)"
        >
          <img
              :src="block.image.src"
              :alt="block.image.alt"
              :width="block.image.width"
              :height="block.image.height"
              loading="lazy"
              decoding="async"
              class="h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
          />
          <span class="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-ink/85 px-3 py-1.5 text-xs text-cream backdrop-blur transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </svg>
            Vergroten
          </span>
        </button>
      </figure>

      <!-- Twee foto's naast elkaar (desktop) / onder elkaar (mobiel) -->
      <div v-else-if="block.type === 'image-pair'" class="grid gap-4 sm:grid-cols-2">
        <button
            v-for="(image, j) in block.images"
            :key="image.src"
            v-reveal="j * 120"
            type="button"
            class="group block overflow-hidden rounded-2xl border border-cream/10 md:rounded-[2rem]"
            :aria-label="`Vergroot afbeelding: ${image.alt}`"
            @click="emit('open', image)"
        >
          <img
              :src="image.src"
              :alt="image.alt"
              :width="image.width"
              :height="image.height"
              loading="lazy"
              decoding="async"
              class="aspect-[3/4] h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
          />
        </button>
      </div>

      <!-- Feedback: wat werkte / verbeterpunten -->
      <div v-else-if="block.type === 'feedback'" class="grid gap-4 md:grid-cols-2">
        <div v-reveal class="panel border-sage/25 p-6 md:p-8">
          <h4 class="mb-5 flex items-center gap-3 text-lg font-medium">
            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-sage/15 text-sage" aria-hidden="true">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            {{ block.positive.title }}
          </h4>
          <ul class="space-y-3">
            <li v-for="item in block.positive.items" :key="item" class="flex gap-3 text-cream/75">
              <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />
              {{ item }}
            </li>
          </ul>
        </div>

        <div v-reveal="120" class="panel border-clay/25 p-6 md:p-8">
          <h4 class="mb-5 flex items-center gap-3 text-lg font-medium">
            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-clay/15 text-clay" aria-hidden="true">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v5m0 3.5v.01" />
              </svg>
            </span>
            {{ block.attention.title }}
          </h4>
          <ul class="space-y-3">
            <li v-for="item in block.attention.items" :key="item" class="flex gap-3 text-cream/75">
              <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" aria-hidden="true" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Thema's met aantal en balk -->
      <div v-else-if="block.type === 'bars'" v-reveal class="panel p-6 md:p-8">
        <div class="mb-5 flex items-baseline justify-between gap-4">
          <h4 class="text-lg font-medium">{{ block.title }}</h4>
          <span class="eyebrow shrink-0">{{ block.unit }}</span>
        </div>
        <ul class="space-y-4">
          <li v-for="item in block.items" :key="item.label">
            <div class="flex items-start justify-between gap-4 text-cream/80">
              <span>{{ item.label }}</span>
              <span class="shrink-0 font-medium tabular-nums text-cream">{{ item.count }}</span>
            </div>
            <div class="mt-2 h-1.5 w-full rounded-full bg-cream/10" aria-hidden="true">
              <div class="h-full rounded-full bg-cream/70" :style="{ width: `${(item.count / maxCount(block.items)) * 100}%` }" />
            </div>
          </li>
        </ul>
      </div>

      <!-- Kleine stat-blokjes -->
      <div v-else-if="block.type === 'stats'" v-reveal>
        <h4 v-if="block.title" class="eyebrow mb-3">{{ block.title }}</h4>
        <div class="grid gap-4 sm:grid-cols-2">
          <div v-for="stat in block.items" :key="stat.value + stat.label" class="panel p-6 md:p-8">
            <p class="display-heading text-5xl md:text-6xl">{{ stat.value }}</p>
            <p class="mt-3 text-cream/70">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <!-- Opsomming -->
      <div v-else-if="block.type === 'list'" v-reveal class="max-w-3xl">
        <h4 v-if="block.title" class="eyebrow mb-4">{{ block.title }}</h4>
        <ol class="space-y-4">
          <li v-for="(item, j) in block.items" :key="j" class="flex gap-4 text-lg leading-relaxed text-cream/70">
            <span class="shrink-0 tabular-nums text-cream/40">{{ String(j + 1).padStart(2, '0') }}</span>
            <span v-if="typeof item === 'string'">{{ item }}</span>
            <span v-else><strong class="font-medium text-cream">{{ item.lead }}</strong> {{ item.text }}</span>
          </li>
        </ol>
      </div>

      <!-- Staande afbeeldingen naast elkaar (desktop) / gestapeld (mobiel) -->
      <div
          v-else-if="block.type === 'image-row'"
          class="grid gap-4"
          :class="block.images.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'"
      >
        <button
            v-for="(image, j) in block.images"
            :key="image.src"
            v-reveal="j * 120"
            type="button"
            class="group block overflow-hidden rounded-2xl border border-cream/10 bg-white md:rounded-[1.5rem]"
            :aria-label="`Vergroot afbeelding: ${image.alt}`"
            @click="emit('open', image)"
        >
          <img
              :src="image.src"
              :alt="image.alt"
              :width="image.width"
              :height="image.height"
              loading="lazy"
              decoding="async"
              class="aspect-[6/7] h-full w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
          />
        </button>
      </div>


      <!-- Feedback-loop: vorige sprint → wat ik deed → testresultaat -->
      <div v-else-if="block.type === 'loop'" v-reveal>
        <h4 class="mb-4 text-lg font-medium">{{ block.title }}</h4>
        <div class="mb-3 hidden grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 px-6 md:grid" aria-hidden="true">
          <span class="eyebrow">{{ block.columns[0] }}</span><span class="w-4" />
          <span class="eyebrow">{{ block.columns[1] }}</span><span class="w-4" />
          <span class="eyebrow">{{ block.columns[2] }}</span>
        </div>
        <ul class="space-y-3">
          <li
              v-for="row in block.rows"
              :key="row.from"
              class="panel grid gap-4 p-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start"
          >
            <div>
              <p class="eyebrow mb-1 md:sr-only">{{ block.columns[0] }}</p>
              <p class="text-cream/70">{{ row.from }}</p>
            </div>
            <ArrowIcon />
            <div>
              <p class="eyebrow mb-1 md:sr-only">{{ block.columns[1] }}</p>
              <p class="text-cream">{{ row.did }}</p>
            </div>
            <ArrowIcon />
            <div>
              <p class="eyebrow mb-1 md:sr-only">{{ block.columns[2] }}</p>
              <p :class="row.result ? 'text-cream/80' : 'text-cream/35'">{{ row.result ?? 'Nog niet getest' }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Quote-kaarten -->
      <div v-else-if="block.type === 'quotes'" v-reveal>
        <h4 v-if="block.title" class="eyebrow mb-4">{{ block.title }}</h4>
        <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="quote in block.items" :key="quote" class="panel flex flex-col justify-between gap-6 p-6">
            <blockquote class="text-lg leading-relaxed text-cream/85">“{{ quote }}”</blockquote>
            <p class="text-sm text-cream/40">Tester</p>
          </li>
        </ul>
      </div>

      <!-- Inzicht → actie -->
      <div v-else-if="block.type === 'insights'" v-reveal>
        <h4 v-if="block.title" class="mb-4 text-lg font-medium">{{ block.title }}</h4>
        <div class="mb-3 hidden grid-cols-[1fr_auto_1fr] gap-4 px-6 md:grid" aria-hidden="true">
          <span class="eyebrow">{{ block.columns[0] }}</span><span class="w-4" />
          <span class="eyebrow">{{ block.columns[1] }}</span>
        </div>
        <ul class="space-y-3">
          <li
              v-for="row in block.rows"
              :key="row.insight"
              class="panel grid gap-4 p-6 md:grid-cols-[1fr_auto_1fr] md:items-start"
          >
            <div>
              <p class="eyebrow mb-1 md:sr-only">{{ block.columns[0] }}</p>
              <p class="text-cream/70">{{ row.insight }}</p>
            </div>
            <ArrowIcon />
            <div>
              <p class="eyebrow mb-1 md:sr-only">{{ block.columns[1] }}</p>
              <p class="font-medium text-cream">{{ row.action }}</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- Open feedbackvraag aan de lezer -->
      <div v-else-if="block.type === 'question'" v-reveal class="panel p-6 md:p-8">
        <p class="eyebrow mb-3">Jouw idee?</p>
        <p class="mb-6 text-xl leading-relaxed text-cream md:text-2xl">{{ block.question }}</p>
        <PillButton to="/contact">Laat het me weten</PillButton>
      </div>
      <!-- Tussenkopje binnen een stap, bijv. een scherm van de app -->
      <h4 v-else-if="block.type === 'heading'" v-reveal class="pt-4 text-xl font-medium tracking-tight text-cream">{{ block.text }}</h4>

      <!-- Design naast eindproduct (gestapeld op mobiel), niet bijgesneden -->
      <div v-else-if="block.type === 'compare'" class="grid gap-4 sm:grid-cols-2">
        <figure
            v-for="(item, j) in [{ label: block.labels?.[0] ?? 'Design', image: block.design }, { label: block.labels?.[1] ?? 'Eindproduct', image: block.result }]"
            :key="item.image.src"
            v-reveal="j * 120"
        >
          <figcaption class="eyebrow mb-2">{{ item.label }}</figcaption>
          <button
              type="button"
              class="group block w-full overflow-hidden rounded-2xl border border-cream/10 bg-ink md:rounded-[1.5rem]"
              :aria-label="`Vergroot afbeelding: ${item.image.alt}`"
              @click="emit('open', item.image)"
          >
            <img
                :src="item.image.src"
                :alt="item.image.alt"
                :width="item.image.width"
                :height="item.image.height"
                loading="lazy"
                decoding="async"
                class="aspect-[4/5] h-full w-full object-contain transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
            />
          </button>
        </figure>
      </div>

      <!-- Genummerde tijdlijn (bijv. de flow van de ervaring) -->
      <ProcessTimeline v-else-if="block.type === 'timeline'" :phases="block.items.map((label) => ({ label }))" vertical />
    </template>
  </div>
</template>

<script setup lang="ts">
import PillButton from '@/components/ui/PillButton.vue'
import ArrowIcon from '@/components/devlog/ArrowIcon.vue'
import ProcessTimeline from '@/components/devlog/ProcessTimeline.vue'
import type { ProjectImage, SprintBlock } from '@/data/projects'

defineProps<{ blocks: SprintBlock[] }>()
const emit = defineEmits<{ open: [image: ProjectImage] }>()

// Balkbreedte: aantal t.o.v. het hoogste aantal in dezelfde lijst
const maxCount = (items: { count: number }[]) => Math.max(...items.map((item) => item.count))
</script>
