'use client'

import { motion } from 'framer-motion'
import { Product } from '@/lib/types'
import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'
import EmptyState from './EmptyState'

interface ProductCatalogProps {
  products: Product[]
  isLoading?: boolean
  onViewDetails: (product: Product) => void
}

export default function ProductCatalog({
  products,
  isLoading = false,
  onViewDetails,
}: ProductCatalogProps) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </motion.div>
    )
  }

  if (products.length === 0) {
    return <EmptyState />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
          index={index}
        />
      ))}
    </motion.div>
  )
}
