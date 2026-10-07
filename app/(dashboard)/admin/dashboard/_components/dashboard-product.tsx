"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useDataTable from "@/hooks/use-data-table";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";

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
import { LIMIT_LISTS } from "@/constanst/data-table-constant";
import PaginationDataTable from "@/components/Commons/pagination-data-table";
import Image from "next/image";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import CreateProductType from "../../produk/_components_typeProduct/dialog-create-type";
import Link from "next/link";

export default function ProductDashboard({ id }: { id: number }) {
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
      .from("products")
      .select("*", { count: "exact" })
      .eq("product_type_id", id)
      .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1)
      .order("id")
      .ilike("name", `%${currentSearch}%`);

    if (query.error) {
      toast.error("Gagal dalam Fetch Data", {
        description: query.error?.message,
      });
    }

    return query;
  };

  // Query Database ini
  const {
    data: ProductTypes,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Product_types", currentLimit, currentPage, currentSearch],
    queryFn: getDataProductType,
  });

  const filteredData = useMemo(() => {
    return ProductTypes?.data ?? [];
  }, [ProductTypes]);

  console.log(filteredData);

  const TotalPages = useMemo(() => {
    return ProductTypes && ProductTypes.count !== null
      ? Math.ceil(ProductTypes.count / currentLimit)
      : 0;
  }, [ProductTypes]);

  return (
    <Card className="p-3">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 items-center justify-between w-full">
        <h1 className="text-2xl font-bold">Produk Nadhifa Juice</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by name"
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-700 hover:bg-green-900">
                Create
              </Button>
            </DialogTrigger>
            <CreateProductType refetch={refetch} />
          </Dialog>
        </div>
      </div>
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredData.map((item) => (
            <Card key={item.name} className="w-full">
              <CardHeader>
                <CardTitle className="min-h-14 text-center">
                  <Link href={`dashboard/dashboard-product/${item.id}`}>
                    Card Title {item.name}
                  </Link>
                </CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>

              <CardContent className="mt-5">
                <div className="rounded-4xl border-4 border-amber-400">
                  <Image
                    className="rounded-4xl"
                    alt={item.name}
                    src={item.Prod_Type_Image}
                    width={200}
                    height={300}
                  />
                </div>
              </CardContent>

              <CardFooter>
                <div className="flex gap-2 justify-between items-center">
                  <Button type="button" className="bg-red-500 hover:bg-red-700">
                    <Trash2 />
                    Hapus
                  </Button>
                  <Button variant="outline">Edit Product</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label>Limit</Label>
            <Select
              value={currentLimit.toString()}
              onValueChange={(value) => handleChangeLimit(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Limit" />
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
          {TotalPages > 1 && (
            <div className="flex justify-end">
              <PaginationDataTable
                currentPage={currentPage}
                onChangePage={handleChangePage}
                totalPages={TotalPages}
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
