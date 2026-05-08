<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Neem <span class="bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">Contact</span> op
        </h1>
        <p class="text-xl text-gray-400">
          Heb je een vraag of wil je samenwerken? Ik hoor graag van je!
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-black/60 border border-[#322D36] rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-white mb-6">Stuur een bericht</h2>

          <div
              v-if="submitStatus === 'success'"
              class="bg-green-500/20 border border-green-500/30 text-green-300 p-4 rounded-lg mb-6"
          >
            Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="name" class="block text-gray-300 font-medium mb-2">Naam *</label>
              <input
                  id="name"
                  v-model="formData.name"
                  required
                  placeholder="Je naam"
                  class="w-full bg-black/50 border border-[#322D36] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label for="email" class="block text-gray-300 font-medium mb-2">E-mail *</label>
              <input
                  id="email"
                  v-model="formData.email"
                  required
                  type="email"
                  placeholder="je@email.com"
                  class="w-full bg-black/50 border border-[#322D36] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label for="message" class="block text-gray-300 font-medium mb-2">Bericht *</label>
              <textarea
                  id="message"
                  v-model="formData.message"
                  rows="5"
                  required
                  placeholder="Vertel me over je project of stel je vraag..."
                  class="w-full bg-black/50 border border-[#322D36] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-purple-400 resize-none"
              ></textarea>
            </div>

            <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-[#8200DB29] hover:bg-black/50 border border-[#322D36] text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? 'Verzenden...' : 'Verstuur bericht' }}
            </button>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="space-y-8">
          <div class="bg-black/60 border border-[#322D36] rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-white mb-6">Laten we verbinden</h2>
            <p class="text-gray-400 mb-6">
              Ik sta altijd open voor samenwerkingen of nieuwe projecten. Neem gerust contact op!
            </p>

            <div class="space-y-4">
              <div class="flex items-center gap-3 text-gray-300">
                <div class="w-8 h-8 bg-[#8200DB29] border border-[#322D36] rounded-lg flex items-center justify-center">📍</div>
                <span>Amsterdam-Noord, Nederland</span>
              </div>
              <div class="flex items-center gap-3 text-gray-300">
                <div class="w-8 h-8 bg-[#8200DB29] border border-[#322D36] rounded-lg flex items-center justify-center">🎓</div>
                <span>HBO-ICT Software Engineering (HvA)</span>
              </div>
            </div>
          </div>

          <!-- Socials -->
          <div class="bg-black/60 border border-[#322D36] rounded-2xl p-8">
            <h3 class="text-xl font-bold text-white mb-4">Volg me online</h3>
            <div class="flex gap-4">
              <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-12 h-12 bg-[#8200DB29] hover:bg-black/50 border border-[#322D36] text-purple-200 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  v-html="social.icon"
              />
            </div>
          </div>

          <!-- CV Download -->
          <div class="bg-[#8200DB29] border border-[#322D36] rounded-2xl p-8">
            <h3 class="text-xl font-bold text-white mb-4">Mijn CV</h3>
            <p class="text-gray-400 mb-4">Download mijn CV voor een volledig overzicht van mijn ervaring en skills.</p>
            <button class="bg-black/40 hover:bg-black/60 border border-[#322D36] text-white px-6 py-3 rounded-lg font-semibold transition-transform duration-300 hover:scale-105 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({ name: '', email: '', message: '' })
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success'>('idle')

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/YusufTopal61',
    icon: `
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M12 0.5C5.65 0.5 0.5 5.65 0.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.8-1.4-3.8-1.4-.6-1.4-1.5-1.8-1.5-1.8-1.2-.8.1-.8.1-.8 1.3.1 2 1.4 2 1.4 1.1 2 2.9 1.4 3.6 1.1.1-.8.4-1.4.7-1.8-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.2 1.8-.4 2.8-.4s1.9.1 2.8.4c2.1-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.9 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.4 5.9.4.3.8 1 .8 2v3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z"
        />
      </svg>
    `
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/-yusuf-topal/',
    icon: `
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 448 512">
      <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340C24.28 108 0 83.72 0 53.64A53.64 53.64 0 01106.56 53.6c0 30.08-24.28 54.36-54.72 54.36zM447.9 448h-92.4V302.4c0-34.7-12.4-58.4-43.4-58.4-23.6 0-37.6 15.8-43.8 31.1-2.2 5.3-2.8 12.7-2.8 20.2V448h-92.5s1.2-261.6 0-288.9h92.4v40.9c12.3-19 34.3-46 83.6-46 61 0 106.8 39.8 106.8 125.2V448z"/>
    </svg>
  `
  }
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
