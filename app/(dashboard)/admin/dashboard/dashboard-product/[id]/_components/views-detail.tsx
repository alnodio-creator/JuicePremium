"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  ShoppingCart,
  Info,
  Apple,
  Heart,
  Target,
  X,
  Flame,
  Droplets,
  Zap,
  CalendarDays,
} from "lucide-react";
import { Product } from "@/lib/types";
import { CTA_TEXT } from "@/lib/constants";

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  index?: number;
}

export default function ProductCardDashboard2({
  product,
  onViewDetails,
  index = 0,
}: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.35,
      },
    }),
    hover: {
      y: -4,
      transition: {
        duration: 0.25,
      },
    },
  };

  const ingredients = product.ingredients ?? [];
  const benefits = product.benefits ?? [];

  // Pastikan interface Product menggunakan healthGoals.
  // Jika data langsung dari Supabase menggunakan health_goals,
  // mapping dilakukan di query/API.
  const healthGoals = product.healthGoals ?? [];

  const rating = product.rating ?? 0;
  const reviews = product.reviews ?? 0;

  const openDetail = () => {
    setIsDetailOpen(true);
    onViewDetails?.(product);
  };

  const handleOrder = () => {
    const message = encodeURIComponent(
      `Halo, saya ingin memesan ${product.name}.`,
    );

    window.open(`https://wa.me/628563376913?text=${message}`, "_blank");
  };

  return (
    <>
      {/* ================================================= */}
      {/* PRODUCT CARD */}
      {/* ================================================= */}

      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="h-full"
      >
        <div className="glass flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
          {/* IMAGE */}
          <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 sm:h-44">
            <motion.img
              src={product.image}
              alt={product.name}
              onLoad={() => setIsImageLoaded(true)}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.35 }}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />

            {!isImageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-muted" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* CATEGORY */}
            <div className="absolute left-3 top-3">
              <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-white shadow-md">
                {product.category}
              </span>
            </div>

            {/* RATING */}
            <div className="absolute right-3 top-3">
              <div className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-md dark:bg-black/60">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />

                <span className="text-[10px] font-semibold text-foreground">
                  {rating > 0 ? rating.toFixed(1) : "New"}
                </span>

                {reviews > 0 && (
                  <span className="text-[9px] text-muted-foreground">
                    ({reviews})
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex grow flex-col p-3.5">
            {/* NAME */}
            <h3 className="line-clamp-1 text-base font-bold text-foreground">
              {product.name}
            </h3>

            {/* DESCRIPTION */}
            {product.description && (
              <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            {/* INGREDIENTS */}
            {ingredients.length > 0 && (
              <div className="mt-3">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <Apple className="h-3.5 w-3.5 text-green-600" />

                  <span className="text-[11px] font-semibold">Ingredients</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {ingredients.slice(0, 3).map((ingredient) => (
                    <span
                      key={ingredient}
                      className="rounded-full bg-green-500/10 px-2 py-1 text-[9px] font-medium text-green-700 dark:text-green-400"
                    >
                      {ingredient}
                    </span>
                  ))}

                  {ingredients.length > 3 && (
                    <span className="rounded-full bg-muted px-2 py-1 text-[9px] text-muted-foreground">
                      +{ingredients.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* BENEFITS */}
            {benefits.length > 0 && (
              <div className="mt-3 rounded-xl bg-rose-500/5 p-2.5">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 text-rose-500" />

                  <span className="text-[11px] font-semibold">Benefits</span>
                </div>

                <div className="space-y-1">
                  {benefits.slice(0, 2).map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-1.5 text-[10px] text-muted-foreground"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />

                      <span className="line-clamp-1">{benefit}</span>
                    </div>
                  ))}

                  {benefits.length > 2 && (
                    <span className="text-[9px] font-medium text-rose-500">
                      +{benefits.length - 2} manfaat lainnya
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* HEALTH GOALS */}
            {healthGoals.length > 0 && (
              <div className="mt-3">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-blue-500" />

                  <span className="text-[11px] font-semibold">
                    Health Goals
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {healthGoals.slice(0, 2).map((goal) => (
                    <span
                      key={goal}
                      className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-[9px] font-medium text-blue-600 dark:text-blue-400"
                    >
                      🎯 {goal}
                    </span>
                  ))}

                  {healthGoals.length > 2 && (
                    <span className="rounded-full bg-muted px-2 py-1 text-[9px] text-muted-foreground">
                      +{healthGoals.length - 2}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* PRICE + ACTION */}
            <div className="mt-auto pt-4">
              <div className="mb-2.5 flex items-end justify-between">
                <div>
                  <p className="text-[9px] text-muted-foreground">Price</p>

                  <p className="text-xl font-bold text-primary">
                    Rp{product.price.toLocaleString("id-ID")}
                  </p>
                </div>

                {product.servingSize && (
                  <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                    <Droplets className="h-3 w-3" />
                    {product.servingSize} ml
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {/* ORDER */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOrder}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-primary/90"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />

                  {CTA_TEXT.addToCart}
                </motion.button>

                {/* DETAIL */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openDetail}
                  className="rounded-lg bg-secondary/20 px-3 py-2 text-secondary transition-colors hover:bg-secondary/30"
                  title="View details"
                >
                  <Info className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================================================= */}
      {/* DETAIL DIALOG */}
      {/* ================================================= */}

      {isDetailOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setIsDetailOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-background shadow-2xl"
          >
            {/* CLOSE */}
            <button
              onClick={() => setIsDetailOpen(false)}
              className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="max-h-[88vh] overflow-y-auto">
              {/* HERO */}
              <div className="relative h-52 overflow-hidden sm:h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-white">
                      {product.category}
                    </span>

                    {product.sugar && (
                      <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] text-white backdrop-blur-md">
                        {product.sugar}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {product.name}
                  </h2>
                </div>
              </div>

              {/* ARTICLE */}
              <article className="p-5 sm:p-6">
                {/* DESCRIPTION / NARASI */}
                {product.description && (
                  <section className="mb-6 rounded-2xl border border-primary/10 bg-primary/5 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />

                      <h3 className="text-sm font-bold">Tentang Produk</h3>
                    </div>

                    <p className="text-sm leading-7 text-muted-foreground">
                      {product.description}
                    </p>
                  </section>
                )}

                {/* META */}
                <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border pb-4 text-[10px] text-muted-foreground">
                  {product.created_at && (
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />

                      {new Date(product.created_at).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </div>
                  )}

                  {product.servingSize && (
                    <div className="flex items-center gap-1.5">
                      <Droplets className="h-3.5 w-3.5" />
                      {product.servingSize} ml / serving
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />

                    {rating > 0
                      ? `${rating.toFixed(1)} (${reviews} reviews)`
                      : "Belum ada rating"}
                  </div>
                </div>

                {/* PRICE */}
                <div className="mb-6 flex items-center justify-between rounded-2xl bg-primary/5 p-4">
                  <div>
                    <p className="text-[10px] text-muted-foreground">
                      Harga Produk
                    </p>

                    <p className="text-2xl font-bold text-primary">
                      Rp{product.price.toLocaleString("id-ID")}
                    </p>
                  </div>

                  {product.sugar && (
                    <div className="flex items-center gap-2 rounded-xl bg-background px-3 py-2">
                      <Zap className="h-4 w-4 text-primary" />

                      <div>
                        <p className="text-[9px] text-muted-foreground">
                          Sugar Level
                        </p>

                        <p className="text-xs font-semibold">{product.sugar}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* INGREDIENTS */}
                {ingredients.length > 0 && (
                  <section className="mb-6">
                    <div className="mb-3 flex items-center gap-2">
                      <Apple className="h-4 w-4 text-green-600" />

                      <div>
                        <h3 className="text-base font-bold">Ingredients</h3>

                        <p className="text-[10px] text-muted-foreground">
                          Bahan yang digunakan
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {ingredients.map((ingredient) => (
                        <span
                          key={ingredient}
                          className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-[11px] font-medium text-green-700 dark:text-green-400"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* BENEFITS */}
                {benefits.length > 0 && (
                  <section className="mb-6">
                    <div className="mb-3 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-rose-500" />

                      <div>
                        <h3 className="text-base font-bold">Benefits</h3>

                        <p className="text-[10px] text-muted-foreground">
                          Manfaat yang tersedia
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {benefits.map((benefit, index) => (
                        <div
                          key={benefit}
                          className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-muted/30 p-3"
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-[10px] font-bold text-rose-500">
                            {index + 1}
                          </div>

                          <span className="text-xs font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* HEALTH GOALS */}
                {healthGoals.length > 0 && (
                  <section className="mb-6">
                    <div className="mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-500" />

                      <div>
                        <h3 className="text-base font-bold">Health Goals</h3>

                        <p className="text-[10px] text-muted-foreground">
                          Tujuan kesehatan yang didukung
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {healthGoals.map((goal) => (
                        <div
                          key={goal}
                          className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-3"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10 text-xs">
                              🎯
                            </span>

                            <span className="text-xs font-medium text-blue-700 dark:text-blue-400">
                              {goal}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* NUTRITION */}
                <section className="mb-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Flame className="h-4 w-4 text-orange-500" />

                    <div>
                      <h3 className="text-base font-bold">
                        Nutrition Information
                      </h3>

                      <p className="text-[10px] text-muted-foreground">
                        Informasi nutrisi per serving
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <div className="rounded-xl border bg-muted/30 p-3">
                      <p className="text-[9px] text-muted-foreground">
                        Calories
                      </p>

                      <p className="mt-1 text-base font-bold">
                        {product.caloriesPerServing ?? "-"}
                      </p>

                      <p className="text-[9px] text-muted-foreground">kcal</p>
                    </div>

                    <div className="rounded-xl border bg-muted/30 p-3">
                      <p className="text-[9px] text-muted-foreground">
                        Vitamin C
                      </p>

                      <p className="mt-1 text-base font-bold">
                        {product.vitaminC ?? "-"}
                      </p>

                      <p className="text-[9px] text-muted-foreground">mg</p>
                    </div>

                    <div className="rounded-xl border bg-muted/30 p-3">
                      <p className="text-[9px] text-muted-foreground">
                        Potassium
                      </p>

                      <p className="mt-1 text-base font-bold">
                        {product.potassium ?? "-"}
                      </p>

                      <p className="text-[9px] text-muted-foreground">mg</p>
                    </div>

                    <div className="rounded-xl border bg-muted/30 p-3">
                      <p className="text-[9px] text-muted-foreground">
                        Serving
                      </p>

                      <p className="mt-1 text-base font-bold">
                        {product.servingSize ?? "-"}
                      </p>

                      <p className="text-[9px] text-muted-foreground">ml</p>
                    </div>
                  </div>
                </section>

                {/* CTA */}
                <div className="border-t border-border pt-5">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      onClick={handleOrder}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-primary/90"
                    >
                      <ShoppingCart className="h-4 w-4" />

                      {CTA_TEXT.addToCart}
                    </button>

                    <button
                      onClick={() => setIsDetailOpen(false)}
                      className="rounded-xl border border-border px-5 py-2.5 text-xs font-medium transition hover:bg-muted"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
