"use client";
import useDataTable from "@/hooks/use-data-table";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { toast } from "sonner";

export default function DashboardProudct({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);

  const supabase = createClient();

  const {
    currentPage,
    handleChangePage,
    currentLimit,
    handleChangeLimit,
    currentSearch,
    handleChangeSearch,
  } = useDataTable();

  const getDataProductType = async () => {
    const AmbilDataProduk = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .range((currentPage - 1) * currentLimit, currentLimit * currentPage - 1)
      .eq("id", id)
      .order("id")
      .ilike("name", `%${currentSearch}%`);

    if (AmbilDataProduk.error) {
      toast.error("Gagal Menarik data dari Database", {
        description: AmbilDataProduk?.error.message ?? "error",
      });
    }

    return AmbilDataProduk;
  };

  const { data: Product, refetch } = useQuery({
    queryKey: ["product", currentLimit, currentPage, currentSearch],
    queryFn: getDataProductType,
  });

  return <div>{id}</div>;
}
