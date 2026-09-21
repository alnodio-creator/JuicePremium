"use server";

import { uploadFile } from "@/actions/storage-action";
import { createClient } from "@/lib/supabase/server";
import { MenuFormState } from "@/types/Prevstate_form";

import { menuSchema } from "@/validations/auth-validations";

export async function createMenu(prevState: MenuFormState, formData: FormData) {
  let validatedFields = menuSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price") as string),
    discount: parseFloat(formData.get("discount") as string),
    category: formData.get("category"),
    image_url: formData.get("image_url"),
    is_available: formData.get("is_available") === "true" ? true : false,
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  if (validatedFields.data.image_url instanceof File) {
    const { errors, data } = await uploadFile(
      "Images",
      "Menus",
      validatedFields.data.image_url,
    );

    console.log("UPLOAD RESULT:", { errors, data });
    if (errors) {
      return {
        status: "error",
        errors: {
          ...prevState.errors,
          _form: [...errors._form],
        },
      };
    }

    validatedFields = {
      ...validatedFields,
      data: {
        ...validatedFields.data,
        image_url: data.url,
      },
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("menus").insert({
    name: validatedFields.data.name,
    description: validatedFields.data.description,
    price: validatedFields.data.price,
    discount: validatedFields.data.discount,
    category: validatedFields.data.category,
    image_url: validatedFields.data.image_url,
    is_available: validatedFields.data.is_available,
  });

  console.log(error);

  if (error) {
    console.log("CODE:", error.code);
    console.log("MESSAGE:", error.message);
    console.log("DETAILS:", error.details);
    console.log("HINT:", error.hint);

    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [
          `code=${error.code}`,
          `message=${error.message}`,
          `details=${error.details}`,
          `hint=${error.hint}`,
        ],
      },
    };
  }

  return {
    status: "success",
  };
}
