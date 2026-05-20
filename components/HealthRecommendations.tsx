'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Heart, Brain, Zap, Shield } from 'lucide-react'

interface HealthRecommendationsProps {
  onSelectGoal: (goals: string[]) => void
}

const recommendations = [
  {
    id: 1,
    icon: Heart,
    title: 'Heart Health',
    description: 'Support cardiovascular wellness with antioxidant-rich blends',
    goals: ['Better circulation', 'Heart health'],
    color: 'from-red-500/20 to-pink-500/20',
    textColor: 'text-red-600 dark:text-red-400',
    borderColor: 'border-red-500/30',
  },
  {
    id: 2,
    icon: Brain,
    title: 'Mental Clarity',
    description: 'Enhance focus and cognitive function with brain-supporting juices',
    goals: ['Mental clarity', 'Focus'],
    color: 'from-purple-500/20 to-blue-500/20',
    textColor: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-500/30',
  },
  {
    id: 3,
    icon: Zap,
    title: 'Energy Boost',
    description: 'Natural energy without the crash for all-day vitality',
    goals: ['Energy boost'],
    color: 'from-yellow-500/20 to-orange-500/20',
    textColor: 'text-yellow-600 dark:text-yellow-400',
    borderColor: 'border-yellow-500/30',
  },
  {
    id: 4,
    icon: Shield,
    title: 'Immune Support',
    description: 'Strengthen your immune system with vitamin C and antioxidants',
    goals: ['Immune support', 'Cold prevention'],
    color: 'from-green-500/20 to-emerald-500/20',
    textColor: 'text-green-600 dark:text-green-400',
    borderColor: 'border-green-500/30',
  },
]

export default function HealthRecommendations({
  onSelectGoal,
}: HealthRecommendationsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section className="py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="text-center mb-12">
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance"
          >
            Personalized Health Goals
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Choose your health goal and discover juices crafted specifically for your wellness journey
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {recommendations.map((rec) => {
            const Icon = rec.icon
            return (
              <motion.button
                key={rec.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectGoal(rec.goals)}
                className={`glass rounded-xl p-6 text-left border-2 ${rec.borderColor} transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-12 h-12 rounded-lg ${rec.color} flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${rec.textColor}`} />
                </motion.div>

                <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {rec.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {rec.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.button>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
