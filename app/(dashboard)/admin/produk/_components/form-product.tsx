import FormCheckboxArray from "@/components/Commons/form-checkbox";
import FormImage from "@/components/Commons/form-image";
import FormInput from "@/components/Commons/form-input";
import FormSelect from "@/components/Commons/form-select";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  Product_Types,
  Serving_size,
  Sugar_Select,
} from "@/constanst/auth-constant";
import { Benefits, HealthGoals, OptionsBuah } from "@/constanst/options-buah";
import { Preview, UpdateTypeProduct } from "@/types/general";

import { AppleIcon, Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import FormSelectTypeProduct from "./form-select-type";

export default function FormProduct<T extends FieldValues>({
  form,
  onSubmit,
  isLoading,
  type,
  preview,
  setPreview,
  TipeProduct,
}: {
  form: UseFormReturn<T>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  type: "Create" | "Update";
  preview?: Preview | undefined;
  setPreview?: (preview: Preview) => void;
  TipeProduct?: UpdateTypeProduct[] | undefined | null;
}) {
  return (
    <DialogContent className="sm:max-w-xl max-h-[90vh]">
      <Form {...form}>
        <DialogHeader>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <AppleIcon className="w-6 h-6" />
              <DialogTitle>{type} Product</DialogTitle>
            </div>
            <DialogDescription>
              {type === "Create"
                ? "Add a new Product"
                : "Make changes product here"}
            </DialogDescription>
          </div>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4 max-h-[50vh] px-1 overflow-y-auto">
            <FormInput
              form={form}
              name={"name" as Path<T>}
              label="Product"
              placeholder="Insert Product here"
            />
            <FormInput
              form={form}
              label="Category"
              name={"category" as Path<T>}
              placeholder="Masukkan Kategory"
              type="text"
            />
            <FormImage
              form={form}
              label="Image"
              name={"image" as Path<T>}
              preview={preview}
              setPreview={setPreview}
            />
            <FormSelectTypeProduct
              name={"product_type_id" as Path<T>}
              form={form}
              label="Tipe produk Jus"
              selectItem={TipeProduct}
            />
            <FormInput
              form={form}
              name={"price" as Path<T>}
              label="Price"
              placeholder="Insert price here"
              type="number"
            />
            <FormCheckboxArray
              form={form}
              label="Ingredients"
              name={"ingredients" as Path<T>}
              options={OptionsBuah}
            />
            <FormCheckboxArray
              form={form}
              label="Benefits"
              name={"benefits" as Path<T>}
              options={Benefits}
            />
            <FormCheckboxArray
              form={form}
              label="Health Goals"
              name={"health_goals" as Path<T>}
              options={HealthGoals}
            />
            <FormSelect
              name={"serving_size" as Path<T>}
              form={form}
              label="Serving Size"
              selectItem={Serving_size}
              placeholder="Pilih Serving Size"
            />
            <FormInput
              form={form}
              label="Description"
              name={"description" as Path<T>}
              placeholder="Tuliskan Deskripsi Product"
              type="textarea"
            />
            <FormSelect
              name={"sugar" as Path<T>}
              form={form}
              label="Sugar Size"
              selectItem={Sugar_Select}
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
