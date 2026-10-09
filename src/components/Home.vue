<template>
  <div>
    <!-- Hero -->
    <section class="h-svh w-full p-2 sm:p-3">
      <div class="relative h-full w-full overflow-hidden rounded-2xl bg-panel md:rounded-[2rem]">
        <!-- Achtergrond: zachte, bewegende kleurvlakken -->
        <div class="pointer-events-none absolute inset-0" aria-hidden="true">
          <div class="animate-float absolute -left-[20%] -top-[30%] h-[90%] w-[80%] rounded-full bg-sage/25 blur-[120px]" />
          <div class="animate-float-slow absolute -bottom-[30%] right-[-10%] h-[90%] w-[70%] rounded-full bg-clay/25 blur-[140px]" />
          <div class="animate-float absolute left-[30%] top-[20%] h-[50%] w-[40%] rounded-full bg-cream/10 blur-[100px]" />
        </div>

        <!-- Noise overlay -->
        <div class="noise-overlay pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay" />

        <!-- Gradient overlay -->
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <!-- Hero content -->
        <div class="absolute bottom-0 left-0 right-0 px-4 pb-2 sm:px-6 md:px-10">
          <div class="grid grid-cols-12 items-end gap-4">
            <div class="col-span-12 lg:col-span-8">
              <h1 class="display-heading text-[26vw] leading-[0.85] tracking-[-0.07em] sm:text-[24vw] md:text-[22vw] lg:text-[19vw]">
                <span class="sr-only">Yusuf Topal – Software Engineering Student</span>
                <WordsPullUp text="Yusuf" show-asterisk aria-hidden="true" />
              </h1>
            </div>

            <div class="col-span-12 flex flex-col gap-5 pb-6 lg:col-span-4 lg:pb-10">
              <p v-reveal="300" class="eyebrow">Software Engineering Student · Amsterdam-Noord</p>
              <p v-reveal="500" class="text-sm leading-snug text-cream/70 sm:text-base md:text-lg">
                Ik ben 20 jaar oud en studeer Software Engineering aan de HvA. Op deze portfolio
                laat ik projecten zien waar ik tijdens mijn opleiding en eigen ontwikkeling aan heb gewerkt.
              </p>
              <div v-reveal="700" class="flex flex-wrap gap-3">
                <PillButton to="/projects">Bekijk mijn projecten</PillButton>
                <PillButton to="/contact" variant="ghost">Neem contact op</PillButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech stack -->
    <section class="px-4 py-20 sm:px-6 md:px-10">
      <div class="mx-auto max-w-6xl">
        <p v-reveal class="eyebrow mb-6">Stack</p>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          <div
              v-for="(tech, index) in techStack"
              :key="tech.name"
              v-reveal="index * 80"
              class="panel flex flex-col items-start gap-6 p-5 transition-colors duration-300 hover:bg-panel-2"
          >
            <span class="text-2xl" aria-hidden="true">{{ tech.icon }}</span>
            <span class="text-sm text-cream/80">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import WordsPullUp from '@/components/ui/WordsPullUp.vue'
import PillButton from '@/components/ui/PillButton.vue'

const techStack = [
  { name: 'TypeScript', icon: '🚀' },
  { name: 'Java', icon: '☕' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Vue', icon: '💚' },
  { name: 'MySQL', icon: '🗄️' },
  { name: 'Spring Boot', icon: '🍃' },
  { name: 'React', icon: '⚛️' },
]
</script>
