"use client";

import { useMemo, useState } from "react";
import { ChevronDown, RotateCcw, Search, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Benefits, HealthGoals, OptionsBuah } from "@/constanst/options-buah";

export interface FilterState {
  selectedCategory: string | null;
  selectedBenefits: string[];
  selectedHealthGoals: string[];
}

interface FilterPanelProps {
  filters: FilterState;
  onCategoryChange: (category: string | null) => void;
  onBenefitsChange: (benefits: string[]) => void;
  onHealthGoalsChange: (goals: string[]) => void;
  onReset: () => void;
}

interface FilterSectionProps {
  title: string;
  options: { value: string; label: string }[];
  selectedValues: string[];
  search: string;
  onSearchChange: (value: string) => void;
  onToggle: (value: string) => void;
  singleSelect?: boolean;
  selectedValue?: string | null;
  onSingleSelect?: (value: string | null) => void;
  emptyMessage: string;
}

function FilterSection({
  title,
  options,
  selectedValues,
  search,
  onSearchChange,
  onToggle,
  singleSelect = false,
  selectedValue,
  onSingleSelect,
  emptyMessage,
}: FilterSectionProps) {
  const [open, setOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return options;

    return options.filter((option) =>
      option.label.toLowerCase().includes(keyword),
    );
  }, [options, search]);

  const selectedCount = singleSelect
    ? selectedValue
      ? 1
      : 0
    : selectedValues.length;

  return (
    <motion.div layout className="space-y-2">
      {/* HEADER */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-foreground flex items-center gap-2">
          {title}

          {selectedCount > 0 && (
            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
              {selectedCount}
            </span>
          )}
        </span>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-md border p-3 space-y-3">
              {/* SEARCH */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={`Cari ${title.toLowerCase()}...`}
                  className="h-9 w-full rounded-md border border-border/60 bg-background pl-9 pr-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/30"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* OPTIONS */}
              <div className="max-h-56 space-y-2 overflow-y-auto pr-1 scrollbar-thin">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => {
                    const checked = singleSelect
                      ? selectedValue === option.value
                      : selectedValues.includes(option.value);

                    return (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer rounded-md px-2 py-2 hover:bg-muted/50 transition-colors"
                      >
                        {/* Custom checkbox */}
                        <div
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                            checked
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted-foreground/40 bg-background"
                          }`}
                        >
                          {checked && (
                            <Check className="h-3 w-3" strokeWidth={3} />
                          )}
                        </div>

                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => {
                            if (singleSelect) {
                              onSingleSelect?.(checked ? null : option.value);
                            } else {
                              onToggle(option.value);
                            }
                          }}
                        />

                        <span
                          className={`text-sm transition-colors ${
                            checked
                              ? "text-foreground font-medium"
                              : "text-muted-foreground"
                          }`}
                        >
                          {option.label}
                        </span>
                      </label>
                    );
                  })
                ) : (
                  <p className="py-4 text-center text-xs text-muted-foreground">
                    {emptyMessage}
                  </p>
                )}
              </div>

              {/* DONE */}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onSearchChange("");
                }}
                className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Selesai
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FilterPanel({
  filters,
  onCategoryChange,
  onBenefitsChange,
  onHealthGoalsChange,
  onReset,
}: FilterPanelProps) {
  const [searchCategory, setSearchCategory] = useState("");
  const [searchBenefits, setSearchBenefits] = useState("");
  const [searchHealthGoals, setSearchHealthGoals] = useState("");

  const hasActiveFilters =
    !!filters.selectedCategory ||
    filters.selectedBenefits.length > 0 ||
    filters.selectedHealthGoals.length > 0;

  const handleBenefitsChange = (benefit: string) => {
    const updated = filters.selectedBenefits.includes(benefit)
      ? filters.selectedBenefits.filter((item) => item !== benefit)
      : [...filters.selectedBenefits, benefit];

    onBenefitsChange(updated);
  };

  const handleHealthGoalsChange = (goal: string) => {
    const updated = filters.selectedHealthGoals.includes(goal)
      ? filters.selectedHealthGoals.filter((item) => item !== goal)
      : [...filters.selectedHealthGoals, goal];

    onHealthGoalsChange(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-lg p-6 space-y-4"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-foreground">Filters</h3>

        {hasActiveFilters && (
          <motion.button
            type="button"
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

      {/* INGREDIENTS */}
      <FilterSection
        title="Ingredients"
        options={OptionsBuah}
        selectedValues={
          filters.selectedCategory ? [filters.selectedCategory] : []
        }
        selectedValue={filters.selectedCategory}
        search={searchCategory}
        onSearchChange={setSearchCategory}
        onToggle={(value) => {
          onCategoryChange(filters.selectedCategory === value ? null : value);
        }}
        onSingleSelect={(value) => onCategoryChange(value)}
        singleSelect
        emptyMessage="Ingredients tidak ditemukan."
      />

      {/* BENEFITS */}
      <FilterSection
        title="Benefits"
        options={Benefits}
        selectedValues={filters.selectedBenefits}
        search={searchBenefits}
        onSearchChange={setSearchBenefits}
        onToggle={handleBenefitsChange}
        emptyMessage="Benefit tidak ditemukan."
      />

      {/* HEALTH GOALS */}
      <FilterSection
        title="Health Goals"
        options={HealthGoals}
        selectedValues={filters.selectedHealthGoals}
        search={searchHealthGoals}
        onSearchChange={setSearchHealthGoals}
        onToggle={handleHealthGoalsChange}
        emptyMessage="Health goal tidak ditemukan."
      />

      {/* ACTIVE FILTERS */}
      {hasActiveFilters && (
        <div className="pt-2 border-t">
          <div className="flex flex-wrap gap-2">
            {filters.selectedCategory && (
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                {filters.selectedCategory}

                <button
                  type="button"
                  onClick={() => onCategoryChange(null)}
                  className="hover:text-primary/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {filters.selectedBenefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
              >
                {benefit}

                <button
                  type="button"
                  onClick={() => handleBenefitsChange(benefit)}
                  className="hover:text-primary/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}

            {filters.selectedHealthGoals.map((goal) => (
              <div
                key={goal}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
              >
                {goal}

                <button
                  type="button"
                  onClick={() => handleHealthGoalsChange(goal)}
                  className="hover:text-primary/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
