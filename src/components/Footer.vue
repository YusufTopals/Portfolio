<template>
  <footer class="border-t border-white/10 bg-white/[0.025] py-10 backdrop-blur-md">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 px-5 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
      <div>
        <h3 class="mb-2 text-xl font-semibold text-white">
          Yusuf Topal
        </h3>
        <p class="text-sm text-slate-400">Software Engineering student uit Amsterdam-Noord</p>
      </div>

      <div class="flex justify-center gap-5">
        <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-slate-400 transition-colors hover:text-slate-100"
        >
          {{ link.name }}
        </a>
      </div>

      <div class="text-sm text-slate-500">
        <p>&copy; 2026 Yusuf Topal.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'LinkedIn', url: 'https://linkedin.com' },
  { name: 'GitLab', url: 'https://gitlab.com' },
]
</script>
