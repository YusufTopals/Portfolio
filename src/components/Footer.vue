<template>
  <footer class="px-2 pb-2 sm:px-3 sm:pb-3">
    <div class="panel relative overflow-hidden px-6 py-10 md:px-10">

      <div class="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="display-heading text-5xl md:text-7xl">
            Yusuf Topal
          </p>
          <p class="mt-3 text-cream/60">Software Engineering student uit Amsterdam-Noord</p>
        </div>

        <div class="flex gap-6">
          <a
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-cream/60 transition-colors hover:text-cream"
          >
            {{ link.name }}
          </a>
        </div>
      </div>

      <div class="relative mt-10 flex flex-col gap-1 border-t border-cream/10 pt-6 text-sm text-cream/40 sm:flex-row sm:justify-between">
        <p>&copy; {{ year }} Yusuf Topal. Alle rechten voorbehouden.</p>
        <p>Gebouwd met TypeScript, Vue en Tailwind CSS</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/YusufTopal61' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/-yusuf-topal/' },
  { name: 'GitLab', url: 'https://gitlab.com' },
]
</script>
