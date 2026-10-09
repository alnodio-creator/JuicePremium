"use client";

import DataTable from "@/components/Commons/data-table";
import DropdownAction from "@/components/Commons/dropdown-action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { HEADER_PRODUCT } from "@/constanst/tables-constant";

import useDataTable from "@/hooks/use-data-table";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import CreateProduct from "./dialog-create-product";
import Image from "next/image";
import UpdateProductDialog from "./dialog-update-product";
import { updateProductJuice } from "@/types/general";
import { DeleteProductDialog } from "./dialog-delete-product";

export default function ProductManagement() {
  const supabase = createClient();
  const {
    currentPage,
    currentLimit,
    handleChangePage,
    handleChangeLimit,
    currentSearch,
    handleChangeSearch,
  } = useDataTable();

  const getDataProduct = async () => {
    const dataProduct = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .range((currentPage - 1) * currentLimit, currentLimit * currentPage - 1)
      .order("created_at")
      .ilike("name", `%${currentSearch}%`);

    if (dataProduct.error) {
      toast.error("Menarik database Produk gagal", {
        description: dataProduct.error.message,
      });
    }
    return dataProduct;
  };

  // Query Database Disini
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", currentLimit, currentPage, currentSearch],
    queryFn: getDataProduct,
  });

  const [selectedAction, setSelectedAction] = useState<{
    data: updateProductJuice;
    type: "Update" | "Delete";
  } | null>(null);

  const handleCloseDialog = (open: boolean) => {
    if (!open) {
      setSelectedAction(null);
    }
  };

  const filteredData = useMemo(() => {
    return (users?.data || []).map((result, index) => {
      return [
        // No
        currentLimit * (currentPage - 1) + index + 1,

        // Image
        <div className="w-24 flex justify-center">
          <Image
            src={result.image}
            alt={result.name}
            width={70}
            height={70}
            className="h-16 w-16 rounded-lg object-cover"
          />
        </div>,

        // Name
        <div className="min-w-[150px] max-w-[200px] font-medium">
          <p className="truncate" title={result.name}>
            {result.name}
          </p>
        </div>,

        // Category
        <div className="min-w-[100px] max-w-[130px]">{result.category}</div>,

        // Price
        <div className="min-w-[100px] whitespace-nowrap">
          Rp {result.price.toLocaleString("id-ID")}
        </div>,

        // Description
        <div className="w-[280px] max-w-[280px]">
          <div className="h-16 overflow-y-auto overflow-x-hidden pr-2">
            <p className="text-sm text-gray-500 break-words whitespace-normal">
              {result.description || "-"}
            </p>
          </div>
        </div>,

        // Action
        <DropdownAction
          menu={[
            {
              label: (
                <span className="flex items-center gap-2">
                  <Pencil className="h-4 w-4" />
                  Edit
                </span>
              ),
              action: () => {
                setSelectedAction({
                  data: result,
                  type: "Update",
                });
              },
            },
            {
              label: (
                <span className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4 text-red-400" />
                  Delete
                </span>
              ),
              variant: "destructive",
              action: () => {
                setSelectedAction({
                  data: result,
                  type: "Delete",
                });
              },
            },
          ]}
        />,
      ];
    });
  }, [users, currentLimit, currentPage]);

  const totalPages = useMemo(() => {
    return users && users.count !== null
      ? Math.ceil(users.count / currentLimit)
      : 0;
  }, [users]);

  console.log(users?.count);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1 className="text-2xl font-bold">Manajemen Product Juice</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by name"
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="hover:bg-green-900">Create</Button>
            </DialogTrigger>
            <CreateProduct refetch={refetch} />
          </Dialog>
        </div>
      </div>
      <DataTable
        header={HEADER_PRODUCT}
        data={filteredData}
        isLoading={isLoading}
        totalPages={totalPages}
        currentPage={currentPage}
        currentLimit={currentLimit}
        onChangePage={handleChangePage}
        onChangeLimit={handleChangeLimit}
      />
      <UpdateProductDialog
        refetch={refetch}
        open={selectedAction !== null && selectedAction.type === "Update"}
        handleCloseDialog={handleCloseDialog}
        currentData={selectedAction?.data}
      />
      <DeleteProductDialog
        refetch={refetch}
        open={selectedAction !== null && selectedAction?.type === "Delete"}
        HandleCloseDialog={handleCloseDialog}
        CurrentData={selectedAction?.data}
        title={selectedAction?.data?.name ?? "product"}
      />
    </div>
  );
}
