"use client";

import { motion } from "framer-motion";
import { ArrowRight, Circle, Code2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type PortfolioPage = "home" | "about" | "projects" | "contact";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "border-2 border-white/[0.14] backdrop-blur-[2px]",
            "shadow-[0_8px_32px_0_rgba(125,211,252,0.12)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.18),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function HeroGeometric({
  badge = "Portfolio",
  title1 = "Yusuf Topal",
  title2 = "Software Engineering Student",
  description = "Ik ben 20 jaar oud en studeer Software Engineering aan de HvA. Op deze portfolio laat ik projecten zien waar ik tijdens mijn opleiding en eigen ontwikkeling aan heb gewerkt.",
  onNavigate,
  showBackground = true,
}: {
  badge?: string;
  title1?: string;
  title2?: string;
  description?: string;
  onNavigate?: (page: PortfolioPage) => void;
  showBackground?: boolean;
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const navigate = (page: PortfolioPage) => {
    onNavigate?.(page);
    window.dispatchEvent(new CustomEvent("navigate", { detail: page }));
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {showBackground && <GeometricBackground />}

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-28 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-left">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-200/15 bg-white/[0.04] px-3 py-1 md:mb-10"
          >
            <Circle className="h-2 w-2 fill-sky-300/80 text-sky-300/80" />
            <span className="text-sm text-sky-100/70">{badge}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="mb-6 text-4xl font-semibold leading-[1.05] tracking-normal sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-b from-white to-slate-200 bg-clip-text text-transparent">
                {title1}
              </span>
              <br />
              <span className="bg-gradient-to-r from-sky-200 via-white to-cyan-200 bg-clip-text text-transparent">
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="max-w-2xl text-base font-light leading-8 text-slate-300 sm:text-lg md:text-xl">
              {description}
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-col items-start gap-3 sm:flex-row"
          >
            <button type="button" onClick={() => navigate("projects")} className="primary-action w-full gap-2 sm:w-auto">
              <Code2 className="h-4 w-4" />
              Bekijk projecten
              <ArrowRight className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => navigate("contact")} className="secondary-action w-full gap-2 sm:w-auto">
              <Mail className="h-4 w-4" />
              Contact
            </button>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-[#050914]/80" />
    </div>
  );
}

function GeometricBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400/[0.08] via-transparent to-emerald-300/[0.04] blur-3xl" />
      <ElegantShape
        delay={0.3}
        width={620}
        height={140}
        rotate={12}
        gradient="from-sky-400/[0.18]"
        className="left-[-36%] top-[14%] sm:left-[-18%] md:left-[-7%] md:top-[18%]"
      />
      <ElegantShape
        delay={0.5}
        width={500}
        height={120}
        rotate={-15}
        gradient="from-blue-500/[0.16]"
        className="right-[-38%] top-[69%] sm:right-[-16%] md:right-[0%] md:top-[74%]"
      />
      <ElegantShape
        delay={0.4}
        width={320}
        height={82}
        rotate={-8}
        gradient="from-cyan-300/[0.14]"
        className="bottom-[6%] left-[2%] md:left-[9%] md:bottom-[10%]"
      />
      <ElegantShape
        delay={0.6}
        width={220}
        height={64}
        rotate={20}
        gradient="from-emerald-300/[0.12]"
        className="right-[10%] top-[10%] md:right-[18%] md:top-[14%]"
      />
      <ElegantShape
        delay={0.7}
        width={170}
        height={44}
        rotate={-25}
        gradient="from-white/[0.12]"
        className="left-[18%] top-[7%] md:left-[25%] md:top-[10%]"
      />
    </div>
  );
}

export { GeometricBackground, HeroGeometric };
