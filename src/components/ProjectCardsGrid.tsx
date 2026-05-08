import * as React from "react";
import { PlaceCard } from "@/components/ui/card-22";

const projects = [
  {
    title: "Dokkie",
    description: "Een moderne Tikkie-achtige betaalapp ontwikkeld met TypeScript en object-georienteerd programmeren.",
    technologies: ["HTML", "CSS", "TypeScript"],
    link: "https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2023-2024/out-e-cs-se/PB1-topaly1.git",
    category: "Frontend",
    featured: false,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    title: "Code Exchange",
    description: "Een volledig functioneel Q&A platform geinspireerd door Stack Overflow.",
    technologies: ["HTML", "CSS", "TypeScript", "OOP"],
    link: "https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2023-2024/out-e-cs-se/blok-2/sooxeequulee88.git",
    category: "Frontend",
    featured: true,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    title: "The Game",
    description: "Een interactieve game met Lit en TypeScript.",
    technologies: ["TypeScript", "Lit", "Game Engine", "OOP"],
    link: "https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2023-2024/out-e-cs-se/blok-3/riizooxoovoo10.git",
    category: "Game",
    featured: false,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    title: "Webshop",
    description: "Fullstack webshop met gebruikersauthenticatie, database en beheer.",
    technologies: ["Node.js", "Express", "MySQL", "TypeScript", "Lit"],
    link: "https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2023-2024/out-e-cs-se/blok-4/haayaazoosii78.git",
    category: "Fullstack",
    featured: true,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    title: "Elections",
    description: "Realtime verkiezingsresultaten met Spring Boot + Vue.",
    technologies: ["Java", "Spring Boot", "Vue", "TailwindCSS"],
    link: "https://gitlab.fdmci.hva.nl/semester-3-hbo-ict/onderwijs/student-projecten/2024-2025/out-s-se-gd/semester-1/luuhiijaafee13.git",
    category: "Fullstack",
    featured: false,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    title: "Dark Tech AI Stylist Mirror",
    description: "Mobiele AI-stylist app waarin gebruikers outfits scannen en persoonlijke stijladviezen krijgen.",
    technologies: ["React Native", "Expo", "Supabase", "AI", "Dashboard"],
    link: "",
    page: "ai-stylist",
    category: "Mobile AI App",
    featured: true,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];

export function ProjectCardsGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <PlaceCard
          key={project.title}
          images={project.images}
          tags={project.technologies.slice(0, 2)}
          rating={project.rating}
          title={project.title}
          dateRange={project.category}
          hostType={project.technologies.join(" / ")}
          isTopRated={project.featured}
          description={project.description}
          actionLabel={project.link ? "Bekijk op GitLab" : "Bekijk project"}
          actionHref={project.link || undefined}
          actionPage={project.page}
        />
      ))}
    </div>
  );
}
