"use server";

import { deleteFile, uploadFile } from "@/actions/storage-action";
import { createClient } from "@/lib/supabase/server";
import { CreateTypeProductSchema } from "@/validations/auth-validations";

type InitialCreateTypeProduct = {
  status?: string;
  errors: {
    name?: string[];
    description?: string[];
    Prod_Type_Image?: string[];
    _form?: string[];
  };
};
export async function CreateTypeFunction(
  prevState: InitialCreateTypeProduct,
  formData: FormData,
) {
  if (!formData) {
    return {
      status: "error",
      errors: { ...prevState.errors },
    };
  }

  let validatedFields = CreateTypeProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    Prod_Type_Image: formData.get("Prod_Type_Image"),
  });

  console.log("validatedFields", validatedFields);

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: { ...validatedFields.error.flatten(), _form: [] },
    };
  }
  console.log("Prod_Type_Image:", validatedFields.data.Prod_Type_Image);

  console.log("is File:", validatedFields.data.Prod_Type_Image instanceof File);

  if (validatedFields.data.Prod_Type_Image instanceof File) {
    const { data, errors } = await uploadFile(
      "Images",
      "Product_types",
      validatedFields.data.Prod_Type_Image,
    );

    if (errors) {
      return {
        status: "error",
        errors: { ...prevState.errors, _form: [...errors._form] },
      };
    }

    validatedFields = {
      ...validatedFields,
      data: { ...validatedFields.data, Prod_Type_Image: data.url },
    };
  }

  console.log(validatedFields);
  const supabase = await createClient();

  const { error } = await supabase
    .from("product_types")
    .insert(validatedFields.data)
    .select();

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [
          `${error.code} | ${error.message} | ${error.details ?? ""} | ${error.hint ?? ""}`,
        ],
      },
    };
  }

  return {
    status: "success",
    errors: { ...prevState.errors },
  };
}

export async function FunctionUpdateTypeProduct(
  prevState: InitialCreateTypeProduct,
  formData: FormData,
) {
  console.log("Masuk pada server Update Function");
  console.log(formData);
  if (!formData) {
    return {
      status: "error",
      errors: { ...prevState.errors, _form: ["Gagal dalam Mengirim Data"] },
    };
  }

  let validatedFields = CreateTypeProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    Prod_Type_Image: formData.get("Prod_Type_Image"),
  });
  console.log(validatedFields.data);
  console.log("ini yang terbaru:", validatedFields);
  if (!validatedFields.success) {
    return {
      status: "error",
      errors: { ...validatedFields.error.flatten().fieldErrors },
    };
  }

  if (validatedFields.data.Prod_Type_Image instanceof File) {
    console.log("old_Image_Prod :", formData.get("old_Image_Prod"));
    const old_Image_Prod = formData.get("old_Image_Prod") as string;
    const { data, errors } = await uploadFile(
      "Images",
      "Product_types",
      validatedFields.data.Prod_Type_Image,
      old_Image_Prod?.split("/Images/")[1],
    );

    if (errors) {
      return {
        status: "error",
        errors: { ...prevState.errors, _form: ["Gagal Menambahkan Data"] },
      };
    }

    validatedFields = {
      ...validatedFields,
      data: { ...validatedFields.data, Prod_Type_Image: data.url },
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("product_types")
    .update({
      name: validatedFields.data.name,
      description: validatedFields.data.description,
      Prod_Type_Image: validatedFields.data.Prod_Type_Image,
    })
    .eq("id", Number(formData.get("id")));

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [
          `${error.code} | ${error.message} | ${error.details ?? ""} | ${error.hint ?? ""}`,
        ],
      },
    };
  }

  return {
    status: "Success",
    errors: { ...prevState.errors },
  };
}

export async function DeleteTypeFunction(
  prevState: InitialCreateTypeProduct,
  formData: FormData,
) {
  console.log("Masuk Server Action Delete Type");
  const supabase = await createClient();
  const Image = formData.get("Prod_Type_Image") as string;
  const { status, errors } = await deleteFile(
    "Images",
    Image.split("/image/")[1],
  );

  if (status === "error") {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [errors?._form?.[0] ?? "Unknown error"],
      },
    };
  }

  // Analisis Tentang Editnya
  const { error } = await supabase
    .from("product_types")
    .delete()
    .eq("id", formData.get("id"));

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  return {
    status: "success",
    errors: {
      ...prevState.errors,
    },
  };
}
