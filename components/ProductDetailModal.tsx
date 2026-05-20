'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, ShoppingCart, Droplet, Flame, Leaf } from 'lucide-react'
import { Product } from '@/lib/types'
import { CTA_TEXT } from '@/lib/constants'

interface ProductDetailModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative rounded-xl overflow-hidden h-96 bg-linear-to-br from-primary/10 to-accent/10"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 rounded-full text-sm font-semibold bg-primary text-white shadow-lg">
                      {product.category}
                    </span>
                  </div>
                </motion.div>

                {/* Details */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col"
                >
                  {/* Title & Rating */}
                  <div className="mb-4">
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                      {product.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6">{product.description}</p>

                  {/* Nutrition Facts */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg bg-white/20 dark:bg-white/5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Flame className="w-4 h-4 text-accent" />
                        <span className="text-xs text-muted-foreground">Calories</span>
                      </div>
                      <p className="text-lg font-bold text-foreground">
                        {product.caloriesPerServing}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Droplet className="w-4 h-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Vitamin C</span>
                      </div>
                      <p className="text-lg font-bold text-foreground">{product.vitaminC}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Leaf className="w-4 h-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Potassium</span>
                      </div>
                      <p className="text-lg font-bold text-foreground">{product.potassium}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Sugar</span>
                      <p className="text-lg font-bold text-foreground">{product.sugar}</p>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">Key Ingredients</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients.slice(0, 4).map((ingredient) => (
                        <motion.span
                          key={ingredient}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="px-3 py-1.5 rounded-lg bg-primary/15 text-primary text-sm font-medium"
                        >
                          {ingredient}
                        </motion.span>
                      ))}
                      {product.ingredients.length > 4 && (
                        <span className="px-3 py-1.5 text-sm text-muted-foreground">
                          +{product.ingredients.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">Health Benefits</h3>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm text-foreground">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-auto pt-6 border-t border-white/10 space-y-3">
                    <div>
                      <span className="text-3xl font-bold text-primary">
                        Rp{(product.price / 1000).toFixed(0)}K
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        per {product.servingSize}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-primary to-accent text-white hover:shadow-lg transition-all font-semibold"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {CTA_TEXT.addToCart}
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
