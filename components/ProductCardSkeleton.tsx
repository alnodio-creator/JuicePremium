'use client'

import { motion } from 'framer-motion'

export default function ProductCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glass rounded-xl overflow-hidden h-full flex flex-col"
    >
      {/* Image Skeleton */}
      <div className="h-48 sm:h-56 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 shimmer" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-4 flex-1 flex flex-col">
        {/* Title Skeleton */}
        <div className="h-6 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded shimmer" />

        {/* Description Skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded shimmer" />
          <div className="h-3 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded shimmer w-2/3" />
        </div>

        {/* Benefits Skeleton */}
        <div className="flex gap-2 flex-wrap">
          <div className="h-6 w-20 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded shimmer" />
          <div className="h-6 w-24 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded shimmer" />
        </div>

        {/* Price and Actions Skeleton */}
        <div className="space-y-3 mt-auto pt-3 border-t border-white/10">
          <div className="h-7 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded shimmer w-2/3" />
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded shimmer" />
            <div className="h-10 w-10 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded shimmer" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
