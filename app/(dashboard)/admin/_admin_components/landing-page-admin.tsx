"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HealthRecommendations from "@/components/HealthRecommendations";
import useDataTable from "@/hooks/use-data-table";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/lib/types";
import FilterPanel from "../dashboard/dashboard-product/[id]/_components/filter-panel";
import NavbarJuice from "./navbar-juice";
import HeroJuice from "./hero-juice";
import InputSearchData from "./input-search-data";
import ProductCardDashboardHome from "./card-product";

export interface FilterState {
  selectedCategory: string | null;
  selectedBenefits: string[];
  selectedHealthGoals: string[];
}

export default function HomePage() {
  const supabase = useMemo(() => createClient(), []);

  // ========================================
  // PAGINATION
  // ========================================
  const {
    currentPage,
    handleChangePage,
    currentLimit,
    currentSearch,
    handleChangeSearch,
  } = useDataTable();

  // ========================================
  // SEARCH
  // ========================================
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSearch !== searchInput) {
        handleChangeSearch(searchInput);
      }

      handleChangePage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, currentSearch, handleChangeSearch, handleChangePage]);

  // ========================================
  // FILTER
  // ========================================
  const [filters, setFilters] = useState<FilterState>({
    selectedCategory: null,
    selectedBenefits: [],
    selectedHealthGoals: [],
  });

  const handleCategoryChange = useCallback(
    (category: string | null) => {
      setFilters((prev) => ({
        ...prev,
        selectedCategory: category,
      }));

      handleChangePage(1);
    },
    [handleChangePage],
  );

  const handleBenefitsChange = useCallback(
    (benefits: string[]) => {
      setFilters((prev) => ({
        ...prev,
        selectedBenefits: benefits,
      }));

      handleChangePage(1);
    },
    [handleChangePage],
  );

  const handleHealthGoalsChange = useCallback(
    (goals: string[]) => {
      setFilters((prev) => ({
        ...prev,
        selectedHealthGoals: goals,
      }));

      handleChangePage(1);
    },
    [handleChangePage],
  );

  const handleResetFilter = useCallback(() => {
    setFilters({
      selectedCategory: null,
      selectedBenefits: [],
      selectedHealthGoals: [],
    });

    setSearchInput("");
    handleChangeSearch("");
    handleChangePage(1);
  }, [handleChangeSearch, handleChangePage]);

  // ========================================
  // PRODUCT DETAIL MODAL
  // ========================================
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // ========================================
  // HEALTH RECOMMENDATIONS
  // ========================================
  const handleHealthGoalSelect = useCallback(
    (goals: string[]) => {
      setFilters((prev) => ({
        ...prev,
        selectedHealthGoals: goals,
      }));

      handleChangePage(1);

      document
        .getElementById("products-section")
        ?.scrollIntoView({ behavior: "smooth" });
    },
    [handleChangePage],
  );

  // ========================================
  // FETCH PRODUCTS
  // ========================================
  const getDataProduct = useCallback(async () => {
    let query = supabase
      .from("products")
      .select("*", { count: "exact" })
      .ilike("name", `%${currentSearch}%`);

    // Filter berdasarkan bahan / kategori
    if (filters.selectedCategory) {
      query = query.contains("ingredients", [filters.selectedCategory]);
    }

    // Semua benefit terpilih harus cocok
    if (filters.selectedBenefits.length > 0) {
      query = query.contains("benefits", filters.selectedBenefits);
    }

    // Semua health goal terpilih harus cocok
    if (filters.selectedHealthGoals.length > 0) {
      query = query.contains("health_goals", filters.selectedHealthGoals);
    }

    const { data, count, error } = await query
      .order("id", { ascending: true })
      .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1);

    if (error) {
      throw new Error(error.message);
    }

    return {
      data: (data ?? []) as Product[],
      count: count ?? 0,
    };
  }, [supabase, currentSearch, currentPage, currentLimit, filters]);

  const {
    data: productResult,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", currentPage, currentLimit, currentSearch, filters],
    queryFn: getDataProduct,
    placeholderData: (previousData) => previousData,
  });

  // ========================================
  // DERIVED DATA
  // ========================================
  const products = productResult?.data ?? [];
  const totalProducts = productResult?.count ?? 0;

  const totalPages = useMemo(
    () => Math.ceil(totalProducts / currentLimit),
    [totalProducts, currentLimit],
  );

  // ========================================
  // LOADING STATE
  // ========================================
  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar onSearchChange={setSearchInput} />

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 h-10 w-64 animate-pulse rounded-lg bg-muted" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: Math.min(currentLimit, 8) }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-96 animate-pulse rounded-2xl bg-muted"
                />
              ),
            )}
          </div>
        </section>
      </main>
    );
  }

  // ========================================
  // ERROR STATE
  // ========================================
  if (isError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4">
        <h2 className="text-xl font-semibold">Gagal memuat produk</h2>

        <p className="text-center text-sm text-muted-foreground">
          {error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat mengambil data."}
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg bg-primary px-5 py-2 text-primary-foreground"
        >
          Muat Ulang
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      {/* NAVBAR */} <NavbarJuice setSearchInput={setSearchInput} />
      {/* HERO */}
      <section className="px-4 pb-6 pt-5 sm:px-6 sm:pb-8 sm:pt-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <HeroJuice
            badgeText="Fresh Juice Collection"
            title="Mulai Hidup Sehat dengan"
            highlightText="Jus Buah Alami"
            description="Temukan pilihan jus buah segar dengan bahan berkualitas untuk menemani keseharianmu."
            primaryButtonText="Lihat Produk"
            secondaryButtonText="Pesan Sekarang"
            targetId="products-section"
          />
          {/* STATS */}
          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-3 gap-2 sm:mt-8 sm:gap-4">
            {[
              { number: `${totalProducts}`, label: "Produk Tersedia" },
              { number: "100%", label: "Natural" },
              { number: "4.7★", label: "Customer Rated" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -2 }}
                className="glass flex min-w-0 flex-col items-center justify-center rounded-xl px-2 py-3 text-center sm:rounded-2xl sm:px-4 sm:py-4"
              >
                <p className="text-lg font-bold text-primary sm:text-2xl lg:text-3xl">
                  {stat.number}
                </p>
                <p className="mt-1 text-[10px] leading-tight text-muted-foreground sm:text-xs md:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* HEALTH RECOMMENDATIONS */}
      <section className="bg-violet-50 px-4 py-5 dark:bg-violet-950/20 sm:px-6 sm:py-7 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <HealthRecommendations onSelectGoal={handleHealthGoalSelect} />
        </div>
      </section>
      {/* PRODUCT CATALOG */}
      <section
        id="products-section"
        className="scroll-mt-20 px-4 py-8 sm:scroll-mt-24 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
      >
        <div className="mx-auto max-w-7xl">
          {/* SECTION HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 sm:mb-6"
          >
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Our Premium Collection
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Filter berdasarkan bahan, manfaat, atau tujuan kesehatan untuk
              menemukan jus yang sesuai.
            </p>
          </motion.div>
          {/* SEARCH BAR */}
          <div className="mb-5">
            <InputSearchData
              value={searchInput}
              onChange={setSearchInput}
              totalProducts={totalProducts}
              placeholder="Cari jus favoritmu..."
            />
          </div>
          {/* FILTER + PRODUCTS */}
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-4 lg:gap-6">
            {/* FILTER SIDEBAR */}
            <aside className="min-w-0 lg:col-span-1">
              <div className="lg:sticky lg:top-20">
                <FilterPanel
                  filters={filters}
                  onCategoryChange={handleCategoryChange}
                  onBenefitsChange={handleBenefitsChange}
                  onHealthGoalsChange={handleHealthGoalsChange}
                  onReset={handleResetFilter}
                />
              </div>
            </aside>
            {/* PRODUCT GRID */}
            <div className="min-w-0 lg:col-span-3">
              <div className="mb-4 flex min-h-5 items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  Menampilkan
                  <span className="font-semibold text-foreground">
                    {products.length}
                  </span>
                  dari {totalProducts} produk
                </p>
                {isFetching && (
                  <p
                    className="shrink-0 animate-pulse text-xs text-green-600 dark:text-green-400"
                    role="status"
                  >
                    Memperbarui...
                  </p>
                )}
              </div>
              {products.length === 0 ? (
                <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-4 py-8 text-center sm:min-h-72">
                  <div className="mb-3 text-4xl">🥤</div>
                  <h3 className="font-semibold text-foreground">
                    Produk tidak ditemukan
                  </h3>
                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    Coba ubah kata pencarian atau sesuaikan filter.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilter}
                    className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div
                  className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 ${isFetching ? "opacity-70" : ""}`}
                >
                  {products.map((product, index) => (
                    <ProductCardDashboardHome
                      key={product.id}
                      product={product}
                      index={index}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-8">
                  <button
                    type="button"
                    disabled={currentPage <= 1 || isFetching}
                    onClick={() => handleChangePage(currentPage - 1)}
                    className="rounded-lg border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
                  >
                    Sebelumnya
                  </button>
                  <span className="px-1 text-xs text-muted-foreground sm:px-3 sm:text-sm">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={currentPage >= totalPages || isFetching}
                    onClick={() => handleChangePage(currentPage + 1)}
                    className="rounded-lg border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
                  >
                    Berikutnya
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
