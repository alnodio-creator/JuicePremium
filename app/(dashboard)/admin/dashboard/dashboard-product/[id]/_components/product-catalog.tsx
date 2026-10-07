"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Star,
  ShoppingCart,
  Info,
  HeartPulse,
  Droplets,
  Leaf,
} from "lucide-react";
import { Product } from "@/lib/types";
import { CTA_TEXT } from "@/lib/constants";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  index?: number;
}

export default function ProductCard({
  product,
  onViewDetails,
  index = 0,
}: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },

    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut",
      },
    }),

    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Format harga
  const formatPrice = (price: number | null | undefined) => {
    if (!price) return "Rp0";

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Data nullable
  const rating = product.rating ?? 0;
  const reviews = product.reviews ?? 0;

  // Support camelCase maupun snake_case
  const servingSize =
    product.servingSize ?? (product as any).serving_size ?? "500 ml";

  const ingredients = product.ingredients ?? [];
  const benefits = product.benefits ?? [];
  const healthGoals =
    product.healthGoals ?? (product as any).health_goals ?? [];

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="h-full"
    >
      <div className="group relative h-full overflow-hidden rounded-2xl border border-white/20 bg-white/70 shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 dark:bg-black/30">
        {/* =========================
            IMAGE
        ========================== */}
        <div className="relative h-52 overflow-hidden sm:h-60">
          {/* Background */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-accent/10 to-secondary/10" />

          <motion.img
            src={product.image}
            alt={product.name}
            onLoad={() => setIsImageLoaded(true)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
            className={`relative z-10 h-full w-full object-cover transition-opacity duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Loading shimmer */}
          {!isImageLoaded && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent shimmer" />
            </div>
          )}

          {/* Gradient bottom */}
          <div className="absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Category */}
          <div className="absolute left-3 top-3 z-30">
            <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-primary shadow-lg backdrop-blur-md dark:bg-black/60">
              {product.category}
            </span>
          </div>

          {/* Sugar */}
          {product.sugar && (
            <div className="absolute right-3 top-3 z-30">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/90 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                <Droplets className="h-3 w-3" />
                {product.sugar}
              </span>
            </div>
          )}

          {/* Product name over image */}
          <div className="absolute bottom-3 left-4 right-4 z-30">
            <p className="mb-1 text-xs font-medium text-white/80">
              {product.category}
            </p>

            <h3 className="line-clamp-1 text-xl font-bold text-white drop-shadow-md">
              {product.name}
            </h3>
          </div>
        </div>

        {/* =========================
            CONTENT
        ========================== */}
        <div className="flex flex-col p-4">
          {/* Description */}
          <p className="mb-4 line-clamp-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
            {product.description || "Jus segar dengan bahan pilihan."}
          </p>

          {/* =========================
              BENEFITS
          ========================== */}
          {benefits.length > 0 && (
            <div className="mb-4">
              <div className="mb-2 flex items-center gap-2">
                <HeartPulse className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold text-foreground">
                  Manfaat
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {benefits.slice(0, 2).map((benefit: string) => (
                  <motion.span
                    key={benefit}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="rounded-lg bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
                  >
                    {benefit}
                  </motion.span>
                ))}

                {benefits.length > 2 && (
                  <span className="rounded-lg bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                    +{benefits.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* =========================
              INGREDIENTS
          ========================== */}
          {ingredients.length > 0 && (
            <div className="mb-4">
              <div className="mb-2 flex items-center gap-2">
                <Leaf className="h-4 w-4 text-green-500" />
                <span className="text-xs font-semibold text-foreground">
                  Ingredients
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {ingredients.map((ingredient: string) => (
                  <span
                    key={ingredient}
                    className="rounded-full border border-border/50 bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* =========================
              HEALTH GOALS
          ========================== */}
          {healthGoals.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">
                  🎯 Health Goals
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {healthGoals.slice(0, 2).map((goal: string) => (
                  <span
                    key={goal}
                    className="rounded-md bg-accent/10 px-2 py-1 text-[11px] font-medium text-accent-foreground"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* =========================
              PRICE
          ========================== */}
          <div className="mt-auto border-t border-border/50 pt-4">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <p className="mb-0.5 text-[11px] text-muted-foreground">
                  Harga
                </p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-2xl font-bold tracking-tight text-primary"
                >
                  {formatPrice(product.price)}
                </motion.p>
              </div>

              <div className="text-right">
                <p className="text-[11px] text-muted-foreground">Serving</p>

                <p className="text-xs font-medium text-foreground">
                  {servingSize}
                </p>
              </div>
            </div>

            {/* =========================
                RATING
            ========================== */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star
                  className={`h-4 w-4 ${
                    rating > 0
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />

                <span className="text-xs font-semibold">
                  {rating > 0 ? rating.toFixed(1) : "Belum ada rating"}
                </span>
              </div>

              <span className="text-[11px] text-muted-foreground">
                {reviews > 0 ? `${reviews} reviews` : "Belum ada review"}
              </span>
            </div>

            {/* =========================
                ACTION
            ========================== */}
            <div className="flex gap-2">
              {/* WhatsApp */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const message = encodeURIComponent(
                    `Halo, saya ingin memesan ${product.name} dengan harga ${formatPrice(
                      product.price,
                    )}.`,
                  );

                  window.open(
                    `https://wa.me/628563376913?text=${message}`,
                    "_blank",
                  );
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
              >
                <ShoppingCart className="h-4 w-4" />

                <span className="hidden sm:inline">{CTA_TEXT.addToCart}</span>

                <span className="sm:hidden">Pesan</span>
              </motion.button>

              {/* Details */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onViewDetails(product)}
                aria-label={`Lihat detail ${product.name}`}
                className="flex items-center justify-center rounded-xl border border-border/50 bg-secondary/10 px-3 text-secondary transition-all hover:bg-secondary/20"
              >
                <Info className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
