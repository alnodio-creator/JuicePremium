"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Info, Apple, Heart, Target } from "lucide-react";
import { Product } from "@/lib/types";
import { CTA_TEXT } from "@/lib/constants";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  index?: number;
}

export default function ProductCardDashboard({
  product,
  onViewDetails,
  index = 0,
}: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const cardVariants = {
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
      },
    }),
    hover: {
      y: -6,
      transition: {
        duration: 0.3,
      },
    },
  };

  const ingredients = product.ingredients ?? [];
  const benefits = product.benefits ?? [];
  const healthGoals = product.healthGoals ?? [];

  const rating = product.rating ?? 0;
  const reviews = product.reviews ?? 0;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="h-full"
    >
      <div className="glass flex h-full flex-col overflow-hidden rounded-3xl border border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
        {/* IMAGE */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 sm:h-52">
          <motion.img
            src={product.image}
            alt={product.name}
            onLoad={() => setIsImageLoaded(true)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {!isImageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-muted" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* CATEGORY */}
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-lg">
              {product.category}
            </span>
          </div>

          {/* RATING */}
          <div className="absolute right-3 top-3">
            <div className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 shadow-lg dark:bg-black/60">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />

              <span className="text-xs font-semibold text-foreground">
                {rating > 0 ? rating.toFixed(1) : "New"}
              </span>

              {reviews > 0 && (
                <span className="text-[10px] text-muted-foreground">
                  ({reviews})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex grow flex-col p-4">
          {/* NAME */}
          <h3 className="mb-1 line-clamp-2 text-lg font-bold text-foreground">
            {product.name}
          </h3>

          {/* DESCRIPTION */}
          {product.description && (
            <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}

          {/* INGREDIENTS */}
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-1.5">
              <Apple className="h-4 w-4 text-green-600" />

              <span className="text-xs font-semibold text-foreground">
                Ingredients
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {ingredients.slice(0, 4).map((ingredient) => (
                <span
                  key={ingredient}
                  className="rounded-full bg-green-500/10 px-2.5 py-1 text-[10px] font-medium text-green-700 dark:text-green-400"
                >
                  {ingredient}
                </span>
              ))}

              {ingredients.length > 4 && (
                <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] text-muted-foreground">
                  +{ingredients.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* BENEFITS */}
          {benefits.length > 0 && (
            <div className="mb-4 rounded-2xl bg-rose-500/5 p-3">
              <div className="mb-2 flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-rose-500" />

                <span className="text-xs font-semibold text-foreground">
                  Benefits
                </span>
              </div>

              <div className="space-y-1.5">
                {benefits.slice(0, 3).map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-500/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    </span>

                    <span className="line-clamp-1">{benefit}</span>
                  </div>
                ))}

                {benefits.length > 3 && (
                  <span className="ml-6 text-[10px] font-medium text-rose-500">
                    +{benefits.length - 3} manfaat lainnya
                  </span>
                )}
              </div>
            </div>
          )}

          {/* HEALTH GOALS */}
          {healthGoals.length > 0 && (
            <div className="mb-4 rounded-2xl bg-blue-500/5 p-3">
              <div className="mb-2 flex items-center gap-1.5">
                <Target className="h-4 w-4 text-blue-500" />

                <span className="text-xs font-semibold text-foreground">
                  Health Goals
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {healthGoals.slice(0, 4).map((goal) => (
                  <span
                    key={goal}
                    className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1.5 text-[10px] font-medium text-blue-600 dark:text-blue-400"
                  >
                    🎯 {goal}
                  </span>
                ))}

                {healthGoals.length > 4 && (
                  <span className="rounded-full bg-muted px-2.5 py-1.5 text-[10px] text-muted-foreground">
                    +{healthGoals.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* PRICE + ACTION */}
          <div className="mt-auto space-y-3 border-t border-border/50 pt-4">
            <div>
              <p className="text-[10px] text-muted-foreground">Price</p>

              <p className="text-2xl font-bold text-primary">
                Rp{product.price.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="flex gap-2">
              {/* ORDER */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  window.open(
                    "https://wa.me/628563376913?text=Halo%20saya%20ingin%20memesan%20juice",
                    "_blank",
                  );
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                <ShoppingCart className="h-4 w-4" />

                <span>{CTA_TEXT.addToCart}</span>
              </motion.button>

              {/* DETAIL */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewDetails(product)}
                className="rounded-xl bg-secondary/20 px-3 py-2.5 text-secondary transition-colors hover:bg-secondary/30"
                title="View details"
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
