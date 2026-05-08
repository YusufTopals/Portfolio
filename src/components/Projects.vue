<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Mijn <span class="bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">Projecten</span>
        </h1>
        <p class="text-xl text-gray-400 mb-8">
          Een overzicht van de projecten die ik heb ontwikkeld
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
            v-for="(project, index) in projects"
            :key="project.title"
            :class="[
            'group bg-black/60 rounded-2xl p-6 hover:bg-[#120018]/80 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-[#322D36] hover:border-purple-500/50',
            project.featured ? 'ring-2 ring-purple-500/30' : ''
          ]"
            :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div
              v-if="project.featured"
              class="inline-block bg-[#8200DB29] border border-[#322D36] text-white text-xs px-3 py-1 rounded-full mb-4"
          >
            ⭐ Featured
          </div>

          <h3 class="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
            {{ project.title }}
          </h3>

          <p class="text-gray-400 mb-4 leading-relaxed">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap gap-2 mb-6">
            <span
                v-for="tech in project.technologies"
                :key="tech"
                :class="['px-3 py-1 rounded-full text-xs border', getTechColor(tech)]"
            >
              {{ tech }}
            </span>
          </div>

          <a
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-[#8200DB29] hover:bg-black/50 border border-[#322D36] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            <span>Bekijk op GitLab</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Project {
  title: string
  description: string
  technologies: string[]
  link: string
  category: string
  featured?: boolean
}

const projects: Project[] = [
  {
    title: 'Dokkie',
    description: 'Een moderne Tikkie-achtige betaalapp ontwikkeld met TypeScript en object-georiënteerd programmeren.',
    technologies: ['HTML', 'CSS', 'TypeScript'],
    link: 'https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2023-2024/out-e-cs-se/PB1-topaly1.git',
    category: 'frontend',
  },
  {
    title: 'Code Exchange',
    description: 'Een volledig functioneel Q&A platform geïnspireerd door Stack Overflow.',
    technologies: ['HTML', 'CSS', 'TypeScript', 'OOP'],
    link: 'https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2023-2024/out-e-cs-se/blok-2/sooxeequulee88.git',
    category: 'frontend',
  },
  {
    title: 'The Game',
    description: 'Een interactieve game met Lit en TypeScript.',
    technologies: ['TypeScript', 'Lit', 'Game Engine', 'OOP'],
    link: 'https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2023-2024/out-e-cs-se/blok-3/riizooxoovoo10.git',
    category: 'frontend'
  },
  {
    title: 'Webshop',
    description: 'Fullstack webshop met gebruikersauthenticatie, database en beheer.',
    technologies: ['Node.js', 'Express', 'MySQL', 'TypeScript', 'Lit'],
    link: 'https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2023-2024/out-e-cs-se/blok-4/haayaazoosii78.git',
    category: 'fullstack',
  },
  {
    title: 'Elections',
    description: 'Realtime verkiezingsresultaten met Spring Boot + Vue.',
    technologies: ['Java', 'Spring Boot', 'Vue', 'TailwindCSS'],
    link: 'https://gitlab.fdmci.hva.nl/semester-3-hbo-ict/onderwijs/student-projecten/2024-2025/out-s-se-gd/semester-1/luuhiijaafee13.git',
    category: 'fullstack'
  }
]

const getTechColor = (tech: string) => {
  const colors: Record<string, string> = {
    'HTML': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'CSS': 'bg-[#8200DB29] text-purple-100 border-[#322D36]',
    'TypeScript': 'bg-[#8200DB29] text-purple-100 border-[#322D36]',
    'JavaScript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'Vue': 'bg-green-500/20 text-green-300 border-green-500/30',
    'Java': 'bg-red-500/20 text-red-300 border-red-500/30',
    'Node.js': 'bg-emerald-600/20 text-emerald-300 border-emerald-600/30',
    'Express': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    'MySQL': 'bg-[#8200DB29] text-purple-100 border-[#322D36]',
    'Spring Boot': 'bg-emerald-700/20 text-emerald-300 border-emerald-700/30',
    'TailwindCSS': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'Lit': 'bg-purple-500/10 text-purple-100 border-[#322D36]',
    'OOP': 'bg-purple-500/10 text-purple-100 border-[#322D36]',
    'Game Engine': 'bg-purple-500/10 text-purple-100 border-[#322D36]'
  }
  return colors[tech] || 'bg-[#8200DB29] text-purple-100 border-[#322D36]'
}
</script>
