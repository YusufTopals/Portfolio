import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PlaceCardProps {
  images: string[];
  tags: string[];
  rating: number;
  title: string;
  dateRange: string;
  hostType: string;
  isTopRated?: boolean;
  description: string;
  pricePerNight?: number;
  actionLabel?: string;
  actionHref?: string;
  actionPage?: string;
  className?: string;
}

export const PlaceCard = ({
  images,
  tags,
  rating,
  title,
  dateRange,
  hostType,
  isTopRated = false,
  description,
  pricePerNight,
  actionLabel = "Bekijk project",
  actionHref,
  actionPage,
  className,
}: PlaceCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const changeImage = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return images.length - 1;
      if (nextIndex >= images.length) return 0;
      return nextIndex;
    });
  };

  const carouselVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const navigateToPage = () => {
    if (!actionPage) return;
    window.dispatchEvent(new CustomEvent("navigate", { detail: actionPage }));
  };

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!actionPage) return;

    const target = event.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) return;
    navigateToPage();
  };

  const action = (
    <Button
      className="group bg-sky-500/15 hover:bg-blue-950/60 border border-[#1E4E7A] text-white"
      data-navigate={actionPage}
      onClick={navigateToPage}
    >
      {actionLabel}
      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
    </Button>
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      variants={contentVariants}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 10px 30px -5px rgba(56, 189, 248, 0.3)",
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-[#1E4E7A] bg-black/65 text-card-foreground shadow-lg cursor-pointer backdrop-blur-sm",
        className
      )}
      data-navigate={actionPage}
      onClick={handleCardClick}
    >
      <div className="relative group h-64">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={title}
            custom={direction}
            variants={carouselVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45" />

        <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 text-white" onClick={() => changeImage(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 text-white" onClick={() => changeImage(1)}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute top-3 left-3 flex flex-wrap gap-2 pr-16">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-black/60 border border-[#1E4E7A] text-sky-50 backdrop-blur-sm">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="flex items-center gap-1 bg-black/60 border border-[#1E4E7A] text-white backdrop-blur-sm">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> {rating}
          </Badge>
        </div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all",
                currentIndex === index ? "w-4 bg-white" : "bg-white/50"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <motion.div variants={contentVariants} className="p-5 space-y-4">
        <motion.div variants={itemVariants} className="flex justify-between items-start gap-3">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {isTopRated && <Badge variant="outline" className="border-[#1E4E7A] text-sky-50">Featured</Badge>}
        </motion.div>

        <motion.div variants={itemVariants} className="text-sm text-muted-foreground">
          <span>{dateRange}</span> &bull; <span>{hostType}</span>
        </motion.div>

        <motion.p variants={itemVariants} className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </motion.p>

        <motion.div variants={itemVariants} className="flex justify-between items-center pt-2">
          {typeof pricePerNight === "number" ? (
            <p className="font-semibold">
              ${pricePerNight}{" "}
              <span className="text-sm font-normal text-muted-foreground">/ night</span>
            </p>
          ) : (
            <p className="font-semibold text-sky-50">Portfolio project</p>
          )}
          {actionHref ? (
            <a href={actionHref} target="_blank" rel="noopener noreferrer">
              {action}
            </a>
          ) : (
            action
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
