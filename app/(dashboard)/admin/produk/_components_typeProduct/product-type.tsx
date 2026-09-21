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
import { useMemo, useState } from "react";
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

import { Pencil, Ratio, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateProduct from "../_components/dialog-create-product";
import CreateProductType from "./dialog-create-type";
import { UpdateTypeProduct } from "@/types/general";
import { UpdateProductType } from "./dialog-update-type";
import { DeletedProductType } from "./dialog-delete-type";

export default function ProductDashboard() {
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
      toast.error("Gagal dalam Fetch Data", {
        description: query.error?.message,
      });
    }

    return query;
  };

  // Query Database ini
  const { data: ProductTypes, refetch } = useQuery({
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
    <Card className="p-5">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1 className="text-2xl font-bold">Manajemen Product Juice</h1>
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
            <Card
              key={item.id}
              className="flex h-full flex-col overflow-hidden"
            >
              <CardHeader>
                <CardTitle className="min-h-14 text-center">
                  {item.name}
                </CardTitle>
                <CardDescription className="flex font-bold items-center gap-2">
                  <Ratio className="h-4 w-4 text-orange-500" />
                  Product Type
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-4">
                {/* Gambar */}
                <div className="relative h-52 w-full overflow-hidden rounded-xl border">
                  <Image
                    src={item.Prod_Type_Image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Deskripsi */}
                <div className="h-24 overflow-y-auto text-sm text-muted-foreground">
                  {item.description}
                </div>
              </CardContent>

              <CardFooter>
                <div className="flex gap-2 justify-between items-center">
                  <Button
                    type="button"
                    className="bg-red-500 hover:bg-red-700"
                    onClick={() => {
                      setSelectedAction({ data: item, type: "Delete" });
                    }}
                  >
                    <Trash2 />
                    Hapus
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedAction({ data: item, type: "Update" });
                    }}
                  >
                    Edit Product
                  </Button>
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
      <div>
        <UpdateProductType
          open={SelectedAction !== null && SelectedAction.type === "Update"}
          refetch={refetch}
          HandleCloseChange={HandleCloseChange}
          CurrentData={SelectedAction?.data}
        />
      </div>
      <div>
        <DeletedProductType
          open={SelectedAction !== null && SelectedAction.type === "Delete"}
          HandleCloseAction={HandleCloseChange}
          refetch={refetch}
          currentData={SelectedAction?.data}
          title={SelectedAction?.data.name ?? "Product"}
        />
      </div>
    </Card>
  );
}
