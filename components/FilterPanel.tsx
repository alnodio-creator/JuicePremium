'use client'

import { useState } from 'react'
import { ChevronDown, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES, INGREDIENTS, HEALTH_GOALS } from '@/lib/constants'
import { FilterState } from '@/lib/types'

interface FilterPanelProps {
  filters: FilterState
  onCategoryChange: (category: string | null) => void
  onIngredientsChange: (ingredients: string[]) => void
  onHealthGoalsChange: (goals: string[]) => void
  onReset: () => void
}

export default function FilterPanel({
  filters,
  onCategoryChange,
  onIngredientsChange,
  onHealthGoalsChange,
  onReset,
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    ingredients: false,
    healthGoals: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleIngredientsChange = (ingredient: string) => {
    const updated = filters.selectedIngredients.includes(ingredient)
      ? filters.selectedIngredients.filter((i) => i !== ingredient)
      : [...filters.selectedIngredients, ingredient]
    onIngredientsChange(updated)
  }

  const handleHealthGoalsChange = (goal: string) => {
    const updated = filters.selectedHealthGoals.includes(goal)
      ? filters.selectedHealthGoals.filter((g) => g !== goal)
      : [...filters.selectedHealthGoals, goal]
    onHealthGoalsChange(updated)
  }

  const hasActiveFilters =
    filters.selectedCategory ||
    filters.selectedIngredients.length > 0 ||
    filters.selectedHealthGoals.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-lg p-6 space-y-4"
    >
      {/* Header with Reset */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-foreground">Filters</h3>
        {hasActiveFilters && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </motion.button>
        )}
      </div>

      {/* Categories */}
      <motion.div layout className="space-y-2">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
        >
          <span className="font-semibold text-foreground">Category</span>
          <motion.div
            animate={{ rotate: expandedSections.category ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expandedSections.category && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 pl-2 overflow-hidden"
            >
              {CATEGORIES.map((category) => (
                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.selectedCategory === category}
                    onChange={() => onCategoryChange(filters.selectedCategory === category ? null : category)}
                    className="w-4 h-4 rounded accent-primary cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Ingredients */}
      <motion.div layout className="space-y-2">
        <button
          onClick={() => toggleSection('ingredients')}
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
        >
          <span className="font-semibold text-foreground">
            Ingredients
            {filters.selectedIngredients.length > 0 && (
              <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                {filters.selectedIngredients.length}
              </span>
            )}
          </span>
          <motion.div
            animate={{ rotate: expandedSections.ingredients ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expandedSections.ingredients && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 pl-2 max-h-48 overflow-y-auto"
            >
              {INGREDIENTS.map((ingredient) => (
                <label key={ingredient} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.selectedIngredients.includes(ingredient)}
                    onChange={() => handleIngredientsChange(ingredient)}
                    className="w-4 h-4 rounded accent-primary cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {ingredient}
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Health Goals */}
      <motion.div layout className="space-y-2">
        <button
          onClick={() => toggleSection('healthGoals')}
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
        >
          <span className="font-semibold text-foreground">
            Health Goals
            {filters.selectedHealthGoals.length > 0 && (
              <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                {filters.selectedHealthGoals.length}
              </span>
            )}
          </span>
          <motion.div
            animate={{ rotate: expandedSections.healthGoals ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expandedSections.healthGoals && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 pl-2 max-h-48 overflow-y-auto"
            >
              {HEALTH_GOALS.map((goal) => (
                <label key={goal} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.selectedHealthGoals.includes(goal)}
                    onChange={() => handleHealthGoalsChange(goal)}
                    className="w-4 h-4 rounded accent-primary cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {goal}
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
