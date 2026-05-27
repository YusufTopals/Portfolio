"use client";

import React, { Suspense, lazy, useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Code2, Menu, PlayCircle, X } from "lucide-react";

const Spline = lazy(() => import("@splinetool/react-spline"));
type PortfolioPage = "home" | "about" | "projects" | "contact";

const dispatchNavigate = (page: PortfolioPage) => {
  window.dispatchEvent(new CustomEvent("navigate", { detail: page }));
};

export function GalaxySplineBackground() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        pointerEvents: "auto",
        overflow: "hidden",
      }}
    >
      <Suspense fallback={<div className="h-screen w-full bg-black" />}>
        <Spline
          style={{
            width: "100%",
            height: "100vh",
            pointerEvents: "auto",
          }}
          scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
        />
      </Suspense>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: `
            linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent 30%, transparent 70%, rgba(0, 0, 0, 0.8)),
            linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.9))
          `,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function HeroContent({ onNavigate }: { onNavigate?: (page: PortfolioPage) => void }) {
  const navigate = (page: PortfolioPage) => {
    onNavigate?.(page);
    dispatchNavigate(page);
  };

  return (
    <div className="text-left text-white pt-16 sm:pt-24 md:pt-32 px-4 max-w-3xl">
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-wide">
        Yusuf Topal <br className="sm:hidden" />Software Engineering
        <br className="sm:hidden" /> Portfolio.
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-80 max-w-xl">
        19-jarige developer die moderne webapplicaties bouwt met TypeScript,
        Java, Vue, Node.js, MySQL en Spring Boot.
      </p>
      <div className="flex pointer-events-auto flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3">
        <button
          type="button"
          data-navigate="projects"
          onClick={() => navigate("projects")}
          className="bg-[#8200DB29] hover:bg-black/50 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 w-full sm:w-auto border border-[#322D36] text-center"
          style={{ backdropFilter: "blur(8px)" }}
        >
          Bekijk mijn projecten
        </button>
        <button
          type="button"
          data-navigate="contact"
          onClick={() => navigate("contact")}
          className="pointer-events-auto bg-[#0009] border border-gray-600 hover:border-gray-400 text-gray-200 hover:text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 flex items-center justify-center w-full sm:w-auto"
        >
          <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Neem contact op
        </button>
      </div>
    </div>
  );
}

const latestProjects = [
  {
    title: "Webshop",
    category: "Fullstack",
    description: "Fullstack webshop met gebruikersauthenticatie, database en beheer.",
    tags: ["Node.js", "Express", "MySQL"],
    href: "https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2023-2024/out-e-cs-se/blok-4/haayaazoosii78.git",
  },
  {
    title: "Elections",
    category: "Fullstack",
    description: "Realtime verkiezingsresultaten met Spring Boot + Vue.",
    tags: ["Java", "Spring Boot", "Vue"],
    href: "https://gitlab.fdmci.hva.nl/semester-3-hbo-ict/onderwijs/student-projecten/2024-2025/out-s-se-gd/semester-1/luuhiijaafee13.git",
  },
  {
    title: "Dark Tech AI Stylist Mirror",
    category: "Mobile AI App",
    description: "Mobiele AI-stylist app waarin gebruikers outfits scannen en persoonlijke stijladviezen krijgen.",
    tags: ["React Native", "Expo", "Supabase"],
    page: "ai-stylist",
  },
];

function LatestProjectsSection() {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {latestProjects.map((project) => {
        const content = (
          <>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-200">
                {project.category}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-white">{project.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-300">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#322D36] bg-[#8200DB29] px-3 py-1 text-xs text-purple-100"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-white">
              {project.page ? "Bekijk project" : "Bekijk op GitLab"}
              <ArrowRight className="h-4 w-4" />
            </div>
          </>
        );

        const className =
          "group flex min-h-[280px] flex-col gap-5 rounded-2xl border border-[#322D36] bg-black/65 p-6 text-left shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:bg-[#120018]/80";

        if (project.page) {
          return (
            <button
              key={project.title}
              type="button"
              data-navigate={project.page}
              className={className}
            >
              {content}
            </button>
          );
        }

        return (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            {content}
          </a>
        );
      })}
    </div>
  );
}

function Navbar({ onNavigate }: { onNavigate?: (page: PortfolioPage) => void }) {
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    skills: false,
    projecten: false,
    contact: false,
  });

  const handleMouseEnterNavItem = (item: string) => setHoveredNavItem(item);
  const handleMouseLeaveNavItem = () => setHoveredNavItem(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setMobileDropdowns({ skills: false, projecten: false, contact: false });
    }
  };

  const toggleMobileDropdown = (key: keyof typeof mobileDropdowns) => {
    setMobileDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navigate = (page: PortfolioPage) => {
    setIsMobileMenuOpen(false);
    setMobileDropdowns({ skills: false, projecten: false, contact: false });
    onNavigate?.(page);
    dispatchNavigate(page);
  };

  const navLinkClass = (itemName: string, extraClasses = "") => {
    const isCurrentItemHovered = hoveredNavItem === itemName;
    const isAnotherItemHovered = hoveredNavItem !== null && !isCurrentItemHovered;

    const colorClass = isCurrentItemHovered
      ? "text-white"
      : isAnotherItemHovered
        ? "text-gray-500"
        : "text-gray-300";

    return `text-sm transition duration-150 ${colorClass} ${extraClasses}`;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setMobileDropdowns({ skills: false, projecten: false, contact: false });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-20"
      style={{
        backgroundColor: "rgba(13, 13, 24, 0.3)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: "0 0 15px 15px",
      }}
    >
      <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="text-white" style={{ width: "32px", height: "32px" }}>
            <button type="button" data-navigate="home" onClick={() => navigate("home")} aria-label="Ga naar home">
              <Code2 className="h-8 w-8" />
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnterNavItem("skills")}
              onMouseLeave={handleMouseLeaveNavItem}
            >
              <button type="button" data-navigate="about" onClick={() => navigate("about")} className={navLinkClass("skills", "flex items-center")}>
                Skills
                <ChevronDown className="ml-1 w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div
                className="absolute left-0 mt-2 w-48 bg-black bg-opacity-50 rounded-md shadow-lg py-2 border border-gray-700/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30"
                style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
              >
                <button type="button" data-navigate="about" onClick={() => navigate("about")} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-gray-100 hover:bg-gray-800/30 transition duration-150">TypeScript</button>
                <button type="button" data-navigate="about" onClick={() => navigate("about")} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-gray-100 hover:bg-gray-800/30 transition duration-150">Java</button>
                <button type="button" data-navigate="about" onClick={() => navigate("about")} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-gray-100 hover:bg-gray-800/30 transition duration-150">Spring Boot</button>
              </div>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnterNavItem("projecten")}
              onMouseLeave={handleMouseLeaveNavItem}
            >
              <button type="button" data-navigate="projects" onClick={() => navigate("projects")} className={navLinkClass("projecten", "flex items-center")}>
                Projecten
                <ChevronDown className="ml-1 w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div
                className="absolute left-0 mt-2 w-48 bg-black bg-opacity-50 rounded-md shadow-lg py-2 border border-gray-700/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30"
                style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
              >
                <button type="button" data-navigate="projects" onClick={() => navigate("projects")} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-gray-100 hover:bg-gray-800/30 transition duration-150">Webapplicaties</button>
                <button type="button" data-navigate="projects" onClick={() => navigate("projects")} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-gray-100 hover:bg-gray-800/30 transition duration-150">Backend</button>
              </div>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnterNavItem("contact")}
              onMouseLeave={handleMouseLeaveNavItem}
            >
              <button type="button" data-navigate="contact" onClick={() => navigate("contact")} className={navLinkClass("contact", "flex items-center")}>
                Contact
                <ChevronDown className="ml-1 w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div
                className="absolute left-0 mt-2 w-48 bg-black bg-opacity-50 rounded-md shadow-lg py-2 border border-gray-700/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30"
                style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
              >
                <button type="button" data-navigate="contact" onClick={() => navigate("contact")} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-gray-100 hover:bg-gray-800/30 transition duration-150">Email</button>
                <button type="button" data-navigate="contact" onClick={() => navigate("contact")} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-gray-100 hover:bg-gray-800/30 transition duration-150">LinkedIn</button>
                <button type="button" data-navigate="contact" onClick={() => navigate("contact")} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-gray-100 hover:bg-gray-800/30 transition duration-150">GitHub</button>
              </div>
            </div>

            <button
              type="button"
              data-navigate="about"
              className={navLinkClass("over")}
              onClick={() => navigate("about")}
              onMouseEnter={() => handleMouseEnterNavItem("over")}
              onMouseLeave={handleMouseLeaveNavItem}
            >
              Over mij
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <button type="button" data-navigate="contact" onClick={() => navigate("contact")} className="hidden md:block text-gray-300 hover:text-white text-sm">Contact</button>
          <button type="button" data-navigate="projects" onClick={() => navigate("projects")} className="hidden sm:block text-gray-300 hover:text-white text-sm">Projecten</button>
          <button
            type="button"
            data-navigate="contact"
            onClick={() => navigate("contact")}
            className="bg-[#8200DB29] hover:bg-black/50 text-white font-semibold py-2 px-5 rounded-full text-sm md:text-base border border-[#322D36]"
            style={{ backdropFilter: "blur(8px)" }}
          >
            Neem contact op
          </button>
          <button className="lg:hidden text-white p-2" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden bg-black bg-opacity-50 border-t border-gray-700/30 absolute top-full left-0 right-0 z-30
           overflow-hidden transition-all duration-300 ease-in-out
           ${isMobileMenuOpen ? "max-h-screen opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"}
           `}
        style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      >
        <div className="px-4 py-6 flex flex-col space-y-4">
          <div className="relative">
            <button className="text-gray-300 hover:text-gray-100 flex items-center justify-between w-full text-left text-sm py-2" onClick={() => toggleMobileDropdown("skills")} aria-expanded={mobileDropdowns.skills}>
              Skills
              <ChevronDown className={`ml-2 w-3 h-3 transition-transform duration-200 ${mobileDropdowns.skills ? "rotate-180" : ""}`} />
            </button>
            <div className={`pl-4 space-y-2 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${mobileDropdowns.skills ? "max-h-[200px] opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"}`}>
              <button type="button" data-navigate="about" className="block text-gray-300 hover:text-gray-100 text-sm py-1 transition duration-150" onClick={() => navigate("about")}>TypeScript</button>
              <button type="button" data-navigate="about" className="block text-gray-300 hover:text-gray-100 text-sm py-1 transition duration-150" onClick={() => navigate("about")}>Java</button>
              <button type="button" data-navigate="about" className="block text-gray-300 hover:text-gray-100 text-sm py-1 transition duration-150" onClick={() => navigate("about")}>Spring Boot</button>
            </div>
          </div>
          <div className="relative">
            <button className="text-gray-300 hover:text-gray-100 flex items-center justify-between w-full text-left text-sm py-2" onClick={() => toggleMobileDropdown("projecten")} aria-expanded={mobileDropdowns.projecten}>
              Projecten
              <ChevronDown className={`ml-2 w-3 h-3 transition-transform duration-200 ${mobileDropdowns.projecten ? "rotate-180" : ""}`} />
            </button>
            <div className={`pl-4 space-y-2 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${mobileDropdowns.projecten ? "max-h-[200px] opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"}`}>
              <button type="button" data-navigate="projects" className="block text-gray-300 hover:text-gray-100 text-sm py-1 transition duration-150" onClick={() => navigate("projects")}>Webapplicaties</button>
              <button type="button" data-navigate="projects" className="block text-gray-300 hover:text-gray-100 text-sm py-1 transition duration-150" onClick={() => navigate("projects")}>Backend</button>
            </div>
          </div>
          <div className="relative">
            <button className="text-gray-300 hover:text-gray-100 flex items-center justify-between w-full text-left text-sm py-2" onClick={() => toggleMobileDropdown("contact")} aria-expanded={mobileDropdowns.contact}>
              Contact
              <ChevronDown className={`ml-2 w-3 h-3 transition-transform duration-200 ${mobileDropdowns.contact ? "rotate-180" : ""}`} />
            </button>
            <div className={`pl-4 space-y-2 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${mobileDropdowns.contact ? "max-h-[250px] opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"}`}>
              <button type="button" data-navigate="contact" className="block text-gray-300 hover:text-gray-100 text-sm py-1 transition duration-150" onClick={() => navigate("contact")}>Email</button>
              <button type="button" data-navigate="contact" className="block text-gray-300 hover:text-gray-100 text-sm py-1 transition duration-150" onClick={() => navigate("contact")}>LinkedIn</button>
              <button type="button" data-navigate="contact" className="block text-gray-300 hover:text-gray-100 text-sm py-1 transition duration-150" onClick={() => navigate("contact")}>GitHub</button>
            </div>
          </div>
          <button type="button" data-navigate="about" className="text-left text-gray-300 hover:text-gray-100 text-sm py-2 transition duration-150" onClick={() => navigate("about")}>Over mij</button>
          <button type="button" data-navigate="projects" className="text-left text-gray-300 hover:text-gray-100 text-sm py-2 transition duration-150" onClick={() => navigate("projects")}>Projecten</button>
          <button type="button" data-navigate="contact" className="text-left text-gray-300 hover:text-gray-100 text-sm py-2 transition duration-150" onClick={() => navigate("contact")}>Neem contact op</button>
        </div>
      </div>
    </nav>
  );
}

export const HeroSection = ({
  onNavigate,
  showNavbar = false,
}: {
  onNavigate?: (page: PortfolioPage) => void;
  showNavbar?: boolean;
}) => {
  return (
    <div className="relative">
      {showNavbar && <Navbar onNavigate={onNavigate} />}

      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <GalaxySplineBackground />
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div className="container mx-auto">
            <HeroContent onNavigate={onNavigate} />
          </div>
        </div>
      </div>

      <div className="bg-black relative z-10" style={{ marginTop: "-10vh" }}>
        <div className="container mx-auto px-4 py-16 text-white">
          <h2 className="text-4xl font-bold text-center mb-8">Mijn werk hieronder</h2>
          <LatestProjectsSection />
        </div>
      </div>
    </div>
  );
};

export function HeroSectionBasic({ onNavigate }: { onNavigate?: (page: PortfolioPage) => void }) {
  return (
    <main className="bg-black relative min-h-screen w-screen">
      <HeroSection onNavigate={onNavigate} />
    </main>
  );
}
