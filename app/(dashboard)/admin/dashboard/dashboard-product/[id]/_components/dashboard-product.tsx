"use client";

import ProductCard from "@/components/ProductCard";
import PaginationDataTable from "@/components/Commons/pagination-data-table";
import { LIMIT_LISTS } from "@/constanst/data-table-constant";
import useDataTable from "@/hooks/use-data-table";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DashboardProduct({ id }: { id: number }) {
  const supabase = createClient();

  const {
    currentPage,
    handleChangePage,
    currentLimit,
    handleChangeLimit,
    currentSearch,
    handleChangeSearch,
  } = useDataTable();

  // =========================
  // GET PRODUCTS
  // =========================
  const getDataProduct = async () => {
    const result = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .eq("product_type_id", id)
      .ilike("name", `%${currentSearch}%`)
      .order("id")
      .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1);

    if (result.error) {
      toast.error("Gagal menarik data dari database", {
        description: result.error.message,
      });

      throw new Error(result.error.message);
    }

    return result;
  };

  // =========================
  // QUERY
  // =========================
  const {
    data: Product,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["products", id, currentPage, currentLimit, currentSearch],
    queryFn: getDataProduct,
  });

  // =========================
  // DATA
  // =========================
  const products = useMemo(() => {
    return Product?.data ?? [];
  }, [Product]);

  // =========================
  // TOTAL PAGE
  // =========================
  const totalPages = useMemo(() => {
    if (!Product?.count) return 0;

    return Math.ceil(Product.count / currentLimit);
  }, [Product?.count, currentLimit]);

  // =========================
  // LOADING
  // =========================
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: currentLimit }).map((_, index) => (
          <div
            key={index}
            className="h-125 animate-pulse rounded-2xl bg-muted"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* =========================
          SEARCH
      ========================== */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* SEARCH */}
        <div className="w-full sm:w-64">
          <Input
            placeholder="Search by name"
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
        </div>

        {/* LIMIT */}
        <div className="flex items-center gap-2">
          <Label className="whitespace-nowrap">Limit</Label>

          <Select
            value={currentLimit.toString()}
            onValueChange={(value) => {
              handleChangeLimit(Number(value));
              handleChangePage(1);
            }}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Limit</SelectLabel>

                {LIMIT_LISTS.map((limit) => (
                  <SelectItem key={limit} value={limit.toString()}>
                    {limit}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* =========================
          FETCHING INDICATOR
      ========================== */}
      {isFetching && !isLoading && (
        <div className="text-sm text-muted-foreground">Memuat data...</div>
      )}

      {/* =========================
          PRODUCTS
      ========================== */}
      {products.length === 0 ? (
        <div className="flex min-h-75 flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 bg-muted/20">
          <div className="mb-3 text-4xl">🥤</div>

          <h3 className="font-semibold">Produk tidak ditemukan</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {currentSearch
              ? `Tidak ada produk dengan nama "${currentSearch}".`
              : "Belum ada produk pada product type ini."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onViewDetails={(product) => {
                console.log("Detail product:", product);
              }}
            />
          ))}
        </div>
      )}

      {/* =========================
          PAGINATION
      ========================== */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-3 border-t border-border/50 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Menampilkan {(currentPage - 1) * currentLimit + 1}-
            {Math.min(currentPage * currentLimit, Product?.count ?? 0)} dari{" "}
            {Product?.count ?? 0} produk
          </div>

          <div className="flex justify-end">
            <PaginationDataTable
              currentPage={currentPage}
              onChangePage={handleChangePage}
              totalPages={totalPages}
            />
          </div>
        </div>
      )}
    </div>
  );
}
