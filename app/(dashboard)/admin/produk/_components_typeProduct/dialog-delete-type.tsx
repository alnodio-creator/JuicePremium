import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DeleteTypeFunction } from "./actions-type";
import { UpdateTypeProduct } from "@/types/general";
import { toast } from "sonner";
import DeletePopUp from "./popup-delete";

export function DeletedProductType({
  open,
  HandleCloseAction,
  currentData,
  refetch,
  title,
}: {
  open: boolean;
  HandleCloseAction: (open: boolean) => void;
  currentData?: UpdateTypeProduct | null;
  refetch: () => void;
  title: string;
}) {
  const InitialDelete = {
    status: "idle",
    errors: {
      name: [],
      description: [],
      Prod_Type_Image: [],
      _form: [],
    },
  };
  const [InitialStateDelete, DeletedTypeProductAction, isPending] =
    useActionState(DeleteTypeFunction, InitialDelete);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("id", currentData!.id.toString());
    formData.append("Prod_Type_Image", currentData?.Prod_Type_Image as string);

    startTransition(() => {
      DeletedTypeProductAction(formData);
    });
  };

  useEffect(() => {
    if (InitialStateDelete.status == "error") {
      toast.error("Gagal dalam Menghapus Data Broh", {
        description: InitialStateDelete.errors?._form,
      });
    }
    if (InitialStateDelete.status == "success") {
      toast.success("Berhasil Menghapus Data Yeaaay");
      (refetch(), HandleCloseAction?.(false));
    }
  }, [InitialStateDelete]);

  return (
    <DeletePopUp
      isLoading={isPending}
      onOpenChange={HandleCloseAction}
      onSubmit={onSubmit}
      open={open}
      title={title}
    />
  );
}
