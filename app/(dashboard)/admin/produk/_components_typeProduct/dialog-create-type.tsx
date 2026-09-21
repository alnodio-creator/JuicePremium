"use client";
import { PRODUCT_TYPE } from "@/constanst/auth-constant";
import { Preview } from "@/types/general";
import {
  CreateTypeProductSchema,
  CreateTypeProductType,
} from "@/validations/auth-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormTypeProduct from "./form-type-product";
import { CreateTypeFunction } from "./actions-type";
import { toast } from "sonner";

export default function CreateProductType({
  refetch,
}: {
  refetch: () => void;
}) {
  const form = useForm<CreateTypeProductType>({
    resolver: zodResolver(CreateTypeProductSchema),
    defaultValues: PRODUCT_TYPE,
  });

  const [Preview, setPreview] = useState<Preview | undefined>(undefined);

  const InitialCreateTypeProduct = {
    status: "idle",
    errors: {
      name: [],
      description: [],
      Prod_Type_Image: [],
      _form: [],
    },
  };

  const [StateCreateTypeProduct, CreateTypeProduct, isPending] = useActionState(
    CreateTypeFunction,
    InitialCreateTypeProduct,
  );

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    if (Preview?.file) {
      formData.append("Prod_Type_Image", Preview.file);
    }

    startTransition(() => {
      CreateTypeProduct(formData);
    });
  });

  useEffect(() => {
    if (StateCreateTypeProduct.status === "error") {
      toast.error("Gagal dalam membuat data", {
        description: StateCreateTypeProduct.errors?._form,
      });
    }

    if (StateCreateTypeProduct.status === "success") {
      toast.success("Create Product Success");
      form.reset();
      setPreview(undefined);
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [StateCreateTypeProduct]);

  return (
    <FormTypeProduct
      form={form}
      onSubmit={onSubmit}
      type="Create"
      isLoading={isPending}
      preview={Preview}
      setPreview={setPreview}
    />
  );
}
