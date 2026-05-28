<template>
  <div class="page-shell">
    <div class="narrow-shell">
      <div class="mb-12 max-w-2xl">
        <p class="section-kicker">Contact</p>
        <h1 class="section-title">Laten we kennismaken.</h1>
        <p class="section-copy mt-5">
          Heb je een vraag, feedback of een idee voor een project? Stuur gerust een bericht.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
        <section class="surface-panel p-6 sm:p-8">
          <h2 class="mb-6 text-xl font-semibold text-white">Stuur een bericht</h2>

          <div
            v-if="submitStatus === 'success'"
            class="mb-6 rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm text-emerald-200"
          >
            Bedankt voor je bericht. Ik neem zo snel mogelijk contact met je op.
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label for="name" class="mb-2 block text-sm font-medium text-slate-300">Naam *</label>
              <input
                id="name"
                v-model="formData.name"
                required
                placeholder="Je naam"
                class="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/50"
              />
            </div>

            <div>
              <label for="email" class="mb-2 block text-sm font-medium text-slate-300">E-mail *</label>
              <input
                id="email"
                v-model="formData.email"
                required
                type="email"
                placeholder="je@email.com"
                class="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/50"
              />
            </div>

            <div>
              <label for="message" class="mb-2 block text-sm font-medium text-slate-300">Bericht *</label>
              <textarea
                id="message"
                v-model="formData.message"
                rows="5"
                required
                placeholder="Vertel kort waar je aan denkt."
                class="w-full resize-none rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/50"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="primary-action w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              {{ isSubmitting ? 'Verzenden...' : 'Verstuur bericht' }}
            </button>
          </form>
        </section>

        <aside class="space-y-5">
          <section class="surface-panel p-6">
            <h2 class="mb-4 text-xl font-semibold text-white">Gegevens</h2>
            <div class="space-y-4 text-sm text-slate-300">
              <div v-for="item in contactInfo" :key="item.label" class="flex gap-3">
                <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-xs font-semibold text-sky-100">
                  {{ item.short }}
                </span>
                <div>
                  <p class="text-slate-500">{{ item.label }}</p>
                  <p class="mt-1 text-slate-200">{{ item.value }}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="surface-panel p-6">
            <h3 class="mb-4 text-lg font-semibold text-white">Online</h3>
            <div class="flex flex-wrap gap-3">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="secondary-action px-4 py-2"
              >
                {{ social.name }}
              </a>
            </div>
          </section>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({ name: '', email: '', message: '' })
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success'>('idle')

const contactInfo = [
  { label: 'Locatie', value: 'Amsterdam-Noord, Nederland', short: 'NL' },
  { label: 'Opleiding', value: 'HBO-ICT Software Engineering, HvA', short: 'HvA' },
]

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/YusufTopal61' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/-yusuf-topal/' },
]

const handleSubmit = async () => {
  isSubmitting.value = true
  setTimeout(() => {
    submitStatus.value = 'success'
    isSubmitting.value = false
    formData.value = { name: '', email: '', message: '' }
    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 3000)
  }, 1000)
}
</script>
