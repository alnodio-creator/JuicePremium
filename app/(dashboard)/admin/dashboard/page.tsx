"use client";

import ProductDashboard from "./_components/dashboard-product";
import { FieldValues } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UpdateTypeProduct } from "@/types/general";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import useDataTable from "@/hooks/use-data-table";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Box,
  ExternalLink,
  Pencil,
  Ratio,
  Trash2,
  Package,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import CardTypeProduct from "./_components/card-product";

export default function Dashboard<T extends FieldValues>() {
  const {
    currentPage,
    handleChangePage,
    currentLimit,
    handleChangeLimit,
    currentSearch,
    handleChangeSearch,
  } = useDataTable();

  const supabase = createClient();

  const getDataProductType = async () => {
    const query = await supabase
      .from("product_types")
      .select("*", { count: "exact" })
      .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1)
      .order("id")
      .ilike("name", `%${currentSearch}%`);

    if (query.error) {
      toast.error("Gagal mengambil data", {
        description: query.error.message,
      });
    }

    return query;
  };

  const { data: ProductTypes } = useQuery({
    queryKey: ["Product_types", currentLimit, currentPage, currentSearch],
    queryFn: getDataProductType,
  });

  const filteredData = useMemo(() => {
    return ProductTypes?.data ?? [];
  }, [ProductTypes]);

  console.log(filteredData);

  const TotalPages = useMemo(() => {
    return ProductTypes?.count
      ? Math.ceil(ProductTypes.count / currentLimit)
      : 0;
  }, [ProductTypes, currentLimit]);

  const [SelectedAction, setSelectedAction] = useState<{
    data: UpdateTypeProduct;
    type: "Update" | "Delete";
  } | null>(null);

  const HandleCloseChange = (open: boolean) => {
    if (!open) {
      setSelectedAction(null);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Product Type
              </h1>

              <p className="text-sm text-muted-foreground">Dashboard Product</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-sm">
          <Box className="h-4 w-4 text-primary" />

          <span className="font-medium">{ProductTypes?.count ?? 0}</span>

          <span className="text-muted-foreground">Product Type</span>
        </div>
      </div>

      {/* Product Grid */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredData.map((item) => (
            <CardTypeProduct key={item.id} item={item} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Package className="h-8 w-8 text-primary" />
          </div>

          <h3 className="text-lg font-semibold">Tidak ada Product Type</h3>

          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Belum ada data product type yang tersedia atau tidak ditemukan
            berdasarkan pencarian.
          </p>
        </div>
      )}
    </div>
  );
}
