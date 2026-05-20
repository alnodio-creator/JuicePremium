'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
        className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4"
      >
        <Search className="w-10 h-10 text-primary/50" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-foreground mb-2 text-center"
      >
        No products found
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground text-center max-w-md mb-6"
      >
        Try adjusting your filters or search terms to find what you&apos;re looking for
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex gap-3"
      >
        <button className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium">
          Clear Filters
        </button>
        <button className="px-6 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium">
          View All Products
        </button>
      </motion.div>
    </motion.div>
  )
}
