import FormTypeProduct from "./form-type-product";
import { Preview, UpdateTypeProduct } from "@/types/general";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTypeProductSchema } from "@/validations/auth-validations";
import { startTransition, useActionState, useEffect, useState } from "react";
import { FunctionUpdateTypeProduct } from "./actions-type";
import { toast } from "sonner";
import { Dialog } from "@radix-ui/react-dialog";

export function UpdateProductType({
  open,
  HandleCloseChange,
  CurrentData,
  refetch,
}: {
  open: boolean;
  HandleCloseChange?: (open: boolean) => void;
  CurrentData?: UpdateTypeProduct | null;
  refetch: () => void;
}) {
  const form = useForm<UpdateTypeProduct>({
    resolver: zodResolver(CreateTypeProductSchema),
  });

  const [Preview, setPreview] = useState<Preview | undefined>(undefined);

  const Initial_Prev_State = {
    status: "idle",
    errors: {
      name: [],
      description: [],
      Prod_Type_Image: [],
      _form: [],
    },
  };

  const [StateUpdateProduct, UpdateTypeAction, isPending] = useActionState(
    FunctionUpdateTypeProduct,
    Initial_Prev_State,
  );

  const onSubmit = form.handleSubmit((data) => {
    const confirmed = window.confirm("Yakin ingin mengubah data ini?");

    if (!confirmed) return;
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (Preview?.file) {
      formData.append("Prod_Type_Image", Preview.file);
      formData.append("old_Image_Prod", CurrentData?.Prod_Type_Image ?? "");
    } else {
      formData.append("Prod_Type_Image", CurrentData?.Prod_Type_Image ?? "");
    }
    formData.append("id", CurrentData!.id.toString());
    startTransition(() => {
      UpdateTypeAction(formData);
    });
  });

  useEffect(() => {
    if (StateUpdateProduct.status === "error") {
      toast.error("Gagal Update Produk", {
        description: StateUpdateProduct.errors._form,
      });
    }
    if (StateUpdateProduct.status === "Success") {
      toast.success("Berhasil dalam Update Data");
      form.reset();
      setPreview(undefined);
      HandleCloseChange?.(false); // tutup dialog
      refetch();
    }
  }, [StateUpdateProduct]);

  useEffect(() => {
    if (CurrentData) {
      form.setValue("name", CurrentData.name);
      form.setValue("description", CurrentData.description);
      form.setValue("Prod_Type_Image", CurrentData.Prod_Type_Image);
      setPreview({
        displayUrl: CurrentData.Prod_Type_Image as string,
      });
    }
  }, [CurrentData]);

  return (
    <Dialog open={open} onOpenChange={HandleCloseChange}>
      <FormTypeProduct
        form={form}
        onSubmit={onSubmit}
        type="Update"
        isLoading={isPending}
        preview={Preview}
        setPreview={setPreview}
      />
    </Dialog>
  );
}
