import { INITIAL_CREATE_PRODUCT } from "@/constanst/auth-constant";
import { updateProductJuice } from "@/types/general";
import { startTransition, useActionState, useEffect } from "react";
import { DeleteProduct } from "./DeleteAction";
import { toast } from "sonner";
import { DeletePopUpProduct } from "./popup-delete-product";

export function DeleteProductDialog({
  refetch,
  open,
  HandleCloseDialog,
  CurrentData,
  title,
}: {
  refetch: () => void;
  open: boolean;
  HandleCloseDialog: (open: boolean) => void;
  CurrentData?: updateProductJuice | null;
  title: string;
}) {
  const InitalDeleteProduct = {
    status: "idle",
    errors: { ...INITIAL_CREATE_PRODUCT.errors },
  };

  const [InitialDelete, DeleteProductAction, isLoading] = useActionState(
    DeleteProduct,
    InitalDeleteProduct,
  );

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("id", CurrentData!.id.toString());
    formData.append("image", CurrentData?.image as string);

    startTransition(() => {
      DeleteProductAction(formData);
    });
  };

  useEffect(() => {
    if (InitialDelete.status == "error") {
      toast.error("Menghapus Product Berhasil bro", {
        description: InitialDelete.errors?._form?.[0],
      });
    }
    if (InitialDelete.status == "success") {
      toast.success("Berhasil Menghapus Product");
      refetch();
      HandleCloseDialog?.(false);
    }
  }, [InitialDelete]);

  return (
    <DeletePopUpProduct
      open={open}
      HandleClosePopup={HandleCloseDialog}
      isLoading={isLoading}
      onSubmit={onSubmit}
      title={title}
    />
  );
}
