"use client";

import React, { Suspense, lazy, useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Code2, Mail, Menu, X } from "lucide-react";

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
            filter: "hue-rotate(-58deg) saturate(0.78) brightness(0.82) contrast(0.95)",
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
            radial-gradient(circle at 72% 38%, rgba(255, 255, 255, 0.22), transparent 24%),
            radial-gradient(circle at 64% 45%, rgba(56, 189, 248, 0.16), transparent 34%),
            linear-gradient(to right, rgba(2, 6, 15, 0.9), rgba(2, 6, 15, 0.28) 48%, rgba(2, 6, 15, 0.72)),
            linear-gradient(to bottom, rgba(2, 6, 15, 0.12), rgba(2, 6, 15, 0.9) 82%, rgba(2, 6, 15, 1))
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
    <div className="px-5 pt-20 text-left text-white sm:px-6 sm:pt-24 lg:px-8">
      <div className="max-w-2xl">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100/75">
        Portfolio
      </p>
      <h1 className="mb-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
        Yusuf Topal Software Engineering Student
      </h1>
      <p className="max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
        Ik ben 20 jaar oud en studeer Software Engineering aan de HvA. Op deze portfolio laat ik projecten zien waar ik tijdens mijn opleiding en eigen ontwikkeling aan heb gewerkt.
      </p>
      <div className="pointer-events-auto mt-8 flex flex-col items-start gap-3 sm:flex-row">
        <button
          type="button"
          data-navigate="projects"
          onClick={() => navigate("projects")}
          className="primary-action w-full sm:w-auto"
        >
          Bekijk projecten
        </button>
        <button
          type="button"
          data-navigate="contact"
          onClick={() => navigate("contact")}
          className="secondary-action w-full gap-2 sm:w-auto"
        >
          <Mail className="h-4 w-4" />
          Contact
        </button>
      </div>
      </div>
    </div>
  );
}

const latestProjects = [
  {
    title: "Webshop",
    category: "Fullstack",
    description: "Een webshop met authenticatie, databasekoppeling en beheerfunctionaliteit.",
    tags: ["Node.js", "Express", "MySQL"],
    href: "https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2023-2024/out-e-cs-se/blok-4/haayaazoosii78.git",
  },
  {
    title: "Elections",
    category: "Fullstack",
    description: "Een applicatie voor verkiezingsdata met Spring Boot en Vue.",
    tags: ["Java", "Spring Boot", "Vue"],
    href: "https://gitlab.fdmci.hva.nl/semester-3-hbo-ict/onderwijs/student-projecten/2024-2025/out-s-se-gd/semester-1/luuhiijaafee13.git",
  },
  {
    title: "AI Stylist Mirror",
    category: "Mobile AI App",
    description: "Een Dark Tech case rond AI-styling, smaakmanipulatie en keuzevrijheid.",
    tags: ["React Native", "Expo", "Supabase"],
    page: "ai-stylist",
  },
];

function LatestProjectsSection() {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-3">
      {latestProjects.map((project) => {
        const content = (
          <>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-100/70">
                {project.category}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
            </div>
            <p className="text-sm leading-7 text-slate-300">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="pill"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-slate-100">
              {project.page ? "Bekijk project" : "Bekijk op GitLab"}
              <ArrowRight className="h-4 w-4" />
            </div>
          </>
        );

        const className =
          "group flex min-h-[260px] flex-col gap-5 rounded-lg border border-white/10 bg-slate-950/55 p-6 text-left shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-sky-200/25 hover:bg-white/[0.045]";

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
        backgroundColor: "rgba(4, 16, 36, 0.42)",
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
            className="bg-sky-500/15 hover:bg-blue-950/60 text-white font-semibold py-2 px-5 rounded-full text-sm md:text-base border border-[#1E4E7A]"
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

      <div className="relative min-h-[92vh]">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <GalaxySplineBackground />
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            minHeight: "92vh",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div className="mx-auto w-full max-w-6xl">
            <HeroContent onNavigate={onNavigate} />
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-background">
        <div className="mx-auto max-w-6xl px-5 py-20 text-white sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="section-kicker">Selectie</p>
            <h2 className="section-title">Projecten waar ik van heb geleerd</h2>
            <p className="section-copy mt-4">
              Een compacte selectie van studieprojecten waarin frontend, backend, data en UX samenkomen.
            </p>
          </div>
          <LatestProjectsSection />
        </div>
      </div>
    </div>
  );
};

export function HeroSectionBasic({ onNavigate }: { onNavigate?: (page: PortfolioPage) => void }) {
  return (
    <main className="relative min-h-screen w-screen bg-background">
      <HeroSection onNavigate={onNavigate} />
    </main>
  );
}
