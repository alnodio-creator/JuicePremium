"use server";
import { deleteFile } from "@/actions/storage-action";
import { createClient } from "@/lib/supabase/server";
import { CreateProductPrevState } from "@/types/Prevstate_form";

export async function DeleteProduct(
  prevState: CreateProductPrevState,
  formData: FormData,
) {
  const supabase = await createClient();
  const Image = formData.get("image") as string;

  const { status, errors } = await deleteFile(
    "Images",
    Image.split("/Images/")[1],
  );

  if (status === "error") {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [errors?._form?.[0] ?? "Mungkin Ada salah di filenya"],
      },
    };
  }

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", formData.get("id"));

  if (error) {
    return {
      status: "error",
      errors: { ...prevState.errors, _form: [error.message] },
    };
  }

  return {
    status: "success",
    errors: {
      ...prevState.errors,
    },
  };
}
