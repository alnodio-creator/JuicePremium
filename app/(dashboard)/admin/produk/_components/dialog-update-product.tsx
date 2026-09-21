"use client";
import { INITIAL_CREATE_PRODUCT } from "@/constanst/auth-constant";
import { Preview, updateProductJuice } from "@/types/general";
import {
  updateProductSchema,
  UpdateProductType,
} from "@/validations/auth-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { UpdateProduct } from "../actions";
import { toast } from "sonner";

import FormProduct from "./form-product";
import { Dialog } from "@radix-ui/react-dialog";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function UpdateProductDialog({
  refetch,
  open,
  currentData,
  handleCloseDialog,
}: {
  refetch: () => void;
  open?: boolean;
  currentData?: updateProductJuice | null;
  handleCloseDialog: (open: boolean) => void;
}) {
  // Query Data disini

  const supabase = createClient();

  const GetDataType = async () => {
    const TipeProduct = await supabase
      .from("product_types")
      .select("*", { count: "exact" })
      .order("id");
    if (TipeProduct.error) {
      toast.error("Gagal dalam fetch data Tipe Product", {
        description: TipeProduct?.error?.message,
      });
    }
    return TipeProduct;
  };

  const { data: TipeProductQuery } = useQuery({
    queryKey: ["product_types"],
    queryFn: GetDataType,
  });

  console.log(TipeProductQuery);

  const SelectedTipeProduct = useMemo(() => {
    return TipeProductQuery?.data ?? [];
  }, [TipeProductQuery]);

  const form = useForm<UpdateProductType>({
    resolver: zodResolver(updateProductSchema),
  });

  const [updateProductState, updateProductActions, isPendingActions] =
    useActionState(UpdateProduct, INITIAL_CREATE_PRODUCT);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    (formData.append("product_type_id", String(data.product_type_id)),
      formData.append("name", data.name),
      formData.append("category", data.category));
    formData.append("price", String(data.price));
    formData.append("description", data.description);
    formData.append("serving_size", data.serving_size);
    formData.append("sugar", data.sugar);

    if (preview?.file) {
      formData.append("image", preview.file);
      formData.append("old_avatar_url", currentData?.image ?? "");
    } else {
      formData.append("image", currentData?.image ?? "");
    }

    data.ingredients.forEach((item) => formData.append("ingredients", item));
    data.benefits.forEach((item) => formData.append("benefits", item));
    data.health_goals.forEach((item) => formData.append("health_goals", item));

    formData.append("id", currentData!.id.toString());

    startTransition(() => {
      updateProductActions(formData);
    });
  });

  useEffect(() => {
    if (updateProductState?.status === "error") {
      toast.error("Update Product Gagal", {
        description: updateProductState?.errors?._form?.[0],
      });
    }
    if (updateProductState.status === "success") {
      toast.success("Create Product Success");
      form.reset();
      setPreview(undefined);

      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [updateProductState]);

  useEffect(() => {
    if (currentData) {
      form.setValue("product_type_id", currentData.product_type_id);
      form.setValue("name", currentData.name);
      form.setValue("category", currentData.category);
      form.setValue("price", currentData.price);
      form.setValue("description", currentData.description);
      form.setValue("serving_size", currentData.serving_size);
      form.setValue("sugar", currentData.sugar);
      form.setValue("ingredients", currentData.ingredients);
      form.setValue("benefits", currentData.benefits);
      form.setValue("health_goals", currentData.health_goals);
      form.setValue("image", currentData.image);
      setPreview({
        displayUrl: currentData.image as string,
      });
    }
  }, [currentData]);

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <FormProduct
        form={form}
        onSubmit={onSubmit}
        isLoading={isPendingActions}
        preview={preview}
        setPreview={setPreview}
        type="Update"
        TipeProduct={SelectedTipeProduct}
      />
    </Dialog>
  );
}
