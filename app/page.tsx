"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterPanel from "@/components/FilterPanel";
import ProductCatalog from "@/components/ProductCatalog";
import ProductDetailModal from "@/components/ProductDetailModal";
import HealthRecommendations from "@/components/HealthRecommendations";
import { useProductFilter } from "@/hooks/useProductFilter";
import { Product } from "@/lib/types";
import { CTA_TEXT, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { ArrowRight, Zap } from "lucide-react";
import { ModeToggle } from "@/components/Commons/Dark-mode";

export default function Home() {
  const {
    filteredProducts,
    filters,
    setSearchQuery,
    setSelectedCategory,
    setSelectedIngredients,
    setSelectedHealthGoals,
    resetFilters,
  } = useProductFilter();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleHealthGoalSelect = (goals: string[]) => {
    setSelectedHealthGoals(goals);
    // Scroll to products
    const element = document.getElementById("products-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Debugging */}
      <div className="relative top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar onSearchChange={setSearchQuery} />
        <div className="absolute right-7 top-4 z-100 border-4 border-blue-900 border-r-accent">
          <ModeToggle />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <h1 className="bg-black text-white rounded-4xl">
            Ini bagian MAIN PAGE
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 text-primary font-semibold text-sm mx-auto"
            >
              <Zap className="w-4 h-4" />
              Premium Cold-Pressed Juices
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight"
            >
              Tingkatkan Kesehatanmu dengan{" "}
              <motion.span
                className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Kesegaran Alami
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Rasakan kesegaran jus cold-pressed premium dengan bahan alami
              terbaik untuk menemani hidup sehat setiap hari.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.getElementById("products-section");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-8 py-3 rounded-lg bg-linear-to-r from-primary to-accent text-white font-semibold hover:shadow-lg transition-all shadow-md"
              >
                {CTA_TEXT.viewProducts}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 text-foreground font-semibold hover:bg-white/30 dark:hover:bg-white/15 transition-all"
              >
                {CTA_TEXT.orderNow}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: "12+", label: "Premium Blends" },
              { number: "100%", label: "Natural" },
              { number: "4.7★", label: "Customer Rated" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="text-center glass rounded-lg p-4"
              >
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  {stat.number}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Health Recommendations */}
      <section className="px-4 sm:px-6 lg:px-8 bg-violet-50">
        <div className="mx-auto max-w-7xl">
          <HealthRecommendations onSelectGoal={handleHealthGoalSelect} />
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products-section"
        className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 text-balance">
              Our Premium Collection
            </h2>
            <p className="text-lg text-muted-foreground">
              Filter by category, ingredients, or health goals to find your
              perfect juice
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filter */}
            <div className="lg:col-span-1">
              <h1 className="bg-blue-500">Ini filter panel</h1>
              <FilterPanel
                filters={filters}
                onCategoryChange={setSelectedCategory}
                onIngredientsChange={setSelectedIngredients}
                onHealthGoalsChange={setSelectedHealthGoals}
                onReset={resetFilters}
              />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <h1 className="bg-blue-500 ">Ini product Catalog</h1>
              <ProductCatalog
                products={filteredProducts}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <h1 className="bg-black text-white rounded-4xl">
        Ini product detail modal
      </h1>
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}
