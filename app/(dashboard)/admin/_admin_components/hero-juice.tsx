"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import { CTA_TEXT } from "@/lib/constants";

interface HeroJuiceProps {
  badgeText?: string;
  title?: string;
  highlightText?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  targetId?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function HeroJuice({
  badgeText = "Premium Cold-Pressed Juices",
  title = "Tingkatkan Kesehatanmu dengan",
  highlightText = "Kesegaran Alami",
  description = "Rasakan kesegaran jus cold-pressed premium dengan bahan alami terbaik untuk menemani hidup sehat setiap hari.",
  primaryButtonText = CTA_TEXT.viewProducts,
  secondaryButtonText = CTA_TEXT.orderNow,
  targetId = "products-section",
  onPrimaryClick,
  onSecondaryClick,
}: HeroJuiceProps) {
  const scrollToProducts = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute right-10 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        />
      </div>
      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-6 text-center"
        >
          {/* Badge */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-primary">
            <Zap className="h-4 w-4" />
            {badgeText}
          </div>

          {/* Title */}
          <h1 className="text-balance text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}{" "}
            <motion.span
              className="inline-block bg-linear-to-r from-primary to-accent bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {highlightText}
            </motion.span>
          </h1>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPrimaryClick ?? scrollToProducts}
              className="flex items-center gap-2 rounded-lg bg-linear-to-r from-primary to-accent px-8 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg"
            >
              {primaryButtonText}
              <ArrowRight className="h-5 w-5" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSecondaryClick ?? scrollToProducts}
              className="rounded-lg border border-border bg-background/70 px-8 py-3 font-semibold text-foreground transition-all hover:bg-muted"
            >
              {secondaryButtonText}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
