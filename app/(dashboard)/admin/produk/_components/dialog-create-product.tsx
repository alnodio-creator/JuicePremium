"use client";

import {
  CREATE_PRODUCT,
  INITIAL_CREATE_PRODUCT,
} from "@/constanst/auth-constant";
import {
  CreateProductSchema,
  CreateProductType,
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
import { toast } from "sonner";
import { CreateProductFunction } from "../actions";
import FormProduct from "./form-product";
import { Preview } from "@/types/general";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function CreateProduct({ refetch }: { refetch: () => {} }) {
  const supabase = createClient();

  const GetDataTipeProduct = async () => {
    const dataProduct = await supabase
      .from("product_types")
      .select("*", { count: "exact" })
      .order("id");
    if (dataProduct.error) {
      toast.error("Menarik database Produk gagal", {
        description: dataProduct.error.message,
      });
    }
    return dataProduct;
  };

  const { data: Tipeproduct } = useQuery({
    queryKey: ["Product_Types"],
    queryFn: GetDataTipeProduct,
  });

  const ProductQuery = useMemo(() => {
    return Tipeproduct?.data ?? [];
  }, [Tipeproduct]);

  const form = useForm<CreateProductType>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: CREATE_PRODUCT,
  });

  const [createProductState, createProductActions, isPendingActions] =
    useActionState(CreateProductFunction, INITIAL_CREATE_PRODUCT);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    formData.append("product_type_id", String(data.product_type_id));
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", String(data.price));
    formData.append("description", data.description);
    formData.append("serving_size", data.serving_size);
    formData.append("sugar", data.sugar);

    if (preview?.file) {
      formData.append("image", preview.file);
    }

    data.ingredients.forEach((item) => formData.append("ingredients", item));

    data.benefits.forEach((item) => formData.append("benefits", item));

    data.health_goals.forEach((item) => formData.append("health_goals", item));
    console.log(preview);

    startTransition(() => {
      createProductActions(formData);
    });
  });

  useEffect(() => {
    if (createProductState?.status === "error") {
      toast.error("Create Product Failed", {
        description: createProductState.errors?._form?.[0],
      });
    }

    if (createProductState?.status === "success") {
      toast.success("Create Product Success");
      form.reset();
      setPreview(undefined);
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [createProductState]);

  return (
    <FormProduct
      form={form}
      onSubmit={onSubmit}
      isLoading={isPendingActions}
      type="Create"
      preview={preview}
      setPreview={setPreview}
      TipeProduct={ProductQuery}
    />
  );
}
