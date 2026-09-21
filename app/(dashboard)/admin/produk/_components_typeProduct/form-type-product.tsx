"use client";
import FormImage from "@/components/Commons/form-image";
import FormInput from "@/components/Commons/form-input";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Preview } from "@/types/general";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader2, ShoppingBasket } from "lucide-react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import DeletePopUp from "./popup-delete";

// Kemarin sampai sini yak untuk pengerjaan
export default function FormTypeProduct<T extends FieldValues>({
  form,
  type,
  onSubmit,
  preview,
  setPreview,
  isLoading,
}: {
  form: UseFormReturn<T>;
  type: "Create" | "Update";
  onSubmit: () => void;
  preview?: Preview | undefined;
  setPreview?: (preview: Preview) => void;
  isLoading?: boolean;
}) {
  return (
    <DialogContent className="sm:max-w-xl max-h-[90vh]">
      <Form {...form}>
        <DialogHeader>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <ShoppingBasket className="w-6 h-6" />
              <DialogTitle>{type} Product</DialogTitle>
            </div>
            <DialogDescription>
              {type === "Create"
                ? "Buat Tipe Product Baru"
                : "Buat Perubahan/Edit Tipe Produk"}
            </DialogDescription>
          </div>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4 px-10 overflow-y-auto">
            <FormInput
              form={form}
              label="Nama Produk"
              placeholder="Masukkan Tipe Produk"
              name={"name" as Path<T>}
            />
            <FormInput
              form={form}
              label="Deskripsi Tipe Produk"
              placeholder="Masukkan Tipe Produk"
              name={"description" as Path<T>}
              type="textarea"
            />
            <FormImage
              form={form}
              label="Image"
              name={"Prod_Type_Image" as Path<T>}
              preview={preview}
              setPreview={setPreview}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isLoading ? <Loader2 className="animate-spin" /> : type}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
