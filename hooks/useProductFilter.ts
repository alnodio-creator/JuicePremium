import { useMemo, useState, useCallback } from 'react'
import { Product, FilterState } from '@/lib/types'
import { products } from '@/lib/products'

export function useProductFilter() {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategory: null,
    selectedIngredients: [],
    selectedHealthGoals: [],
  })

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.ingredients.some((i) => i.toLowerCase().includes(query)) ||
          product.benefits.some((b) => b.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      // Category filter
      if (filters.selectedCategory && product.category !== filters.selectedCategory) {
        return false
      }

      // Ingredients filter
      if (filters.selectedIngredients.length > 0) {
        const hasAllIngredients = filters.selectedIngredients.every((ingredient) =>
          product.ingredients.includes(ingredient)
        )
        if (!hasAllIngredients) return false
      }

      // Health goals filter
      if (filters.selectedHealthGoals.length > 0) {
        const hasAllGoals = filters.selectedHealthGoals.every((goal) =>
          product.healthGoals.includes(goal)
        )
        if (!hasAllGoals) return false
      }

      return true
    })
  }, [filters])

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }))
  }, [])

  const setSelectedCategory = useCallback((category: string | null) => {
    setFilters((prev) => ({ ...prev, selectedCategory: category }))
  }, [])

  const setSelectedIngredients = useCallback((ingredients: string[]) => {
    setFilters((prev) => ({ ...prev, selectedIngredients: ingredients }))
  }, [])

  const setSelectedHealthGoals = useCallback((goals: string[]) => {
    setFilters((prev) => ({ ...prev, selectedHealthGoals: goals }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      selectedCategory: null,
      selectedIngredients: [],
      selectedHealthGoals: [],
    })
  }, [])

  return {
    filteredProducts,
    filters,
    setSearchQuery,
    setSelectedCategory,
    setSelectedIngredients,
    setSelectedHealthGoals,
    resetFilters,
  }
}
