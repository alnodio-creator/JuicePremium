"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface InputSearchDataProps {
  value: string;
  onChange: (value: string) => void;
  totalProducts?: number;
  placeholder?: string;
  showCount?: boolean;
  className?: string;
}

export default function InputSearchData({
  value,
  onChange,
  totalProducts = 0,
  placeholder = "Cari data...",
  showCount = true,
  className = "",
}: InputSearchDataProps) {
  return (
    <div
      className={`mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between justify-between ${className}`}
    >
      {/* SEARCH INPUT */}
      <div className="relative w-full sm:max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-orange-500" />

        <Input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="
            h-12 rounded-2xl border-orange-200/70
            bg-white/80 pl-12 pr-12 text-sm
            shadow-sm transition-all duration-200
            placeholder:text-muted-foreground/70
            hover:border-orange-300
            focus-visible:border-orange-400
            focus-visible:ring-4
            focus-visible:ring-orange-400/10
            dark:border-orange-900/50
            dark:bg-card
          "
        />

        {/* CLEAR SEARCH */}
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Hapus pencarian"
            className="
              absolute right-3 top-1/2
              flex h-8 w-8 -translate-y-1/2
              items-center justify-center rounded-xl
              text-muted-foreground transition-colors
              hover:bg-orange-100 hover:text-orange-600
              dark:hover:bg-orange-950
            "
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* PRODUCT COUNT */}
      {showCount && (
        <div className="flex items-center gap-2 self-start rounded-xl border border-orange-200/60 bg-orange-50/70 px-4 py-3 dark:border-orange-900/40 dark:bg-orange-950/20 sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-orange-500" />

          <span className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {totalProducts}
            </span>
            produk ditemukan
          </span>
        </div>
      )}
    </div>
  );
}
