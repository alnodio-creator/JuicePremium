"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Info } from "lucide-react";
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
      },
    }),
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="h-full"
    >
      <div className="glass rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-linear-to-br from-primary/10 to-accent/10">
          <motion.img
            src={product.image}
            alt={product.name}
            onLoad={() => setIsImageLoaded(true)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent shimmer" />
          )}

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-3 left-3"
          >
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white shadow-lg">
              {product.category}
            </span>
          </motion.div>

          {/* Rating Badge */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-black/50 px-2.5 py-1 rounded-full shadow-lg"
          >
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-foreground">
              {product.rating}
            </span>
          </motion.div>
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col grow">
          {/* Title */}
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-bold text-lg text-foreground line-clamp-2 mb-1 text-balance"
          >
            {product.name}
          </motion.h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3 grow">
            {product.description}
          </p>

          {/* Key Benefits */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {product.benefits.slice(0, 2).map((benefit) => (
                <motion.span
                  key={benefit}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs bg-primary/15 text-primary px-2 py-1 rounded-md whitespace-nowrap"
                >
                  {benefit}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Price and Actions */}
          <div className="space-y-3 mt-auto pt-3 border-t border-white/10">
            <div className="flex items-baseline justify-between">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="flex flex-col"
              >
                <span className="text-2xl font-bold text-primary">
                  Rp{(product.price / 1000).toFixed(0)}K
                </span>
                <span className="text-xs text-muted-foreground">
                  {product.servingSize}
                </span>
              </motion.div>
              <span className="text-xs text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.open(
                    "https://wa.me/628563376913?text=Halo%20saya%20ingin%20memesan%20juice",
                    "_blank",
                  );
                }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium text-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">{CTA_TEXT.addToCart}</span>
                <span className="sm:hidden">Add</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewDetails(product)}
                className="px-3 py-2 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/30 transition-colors"
              >
                <Info className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
