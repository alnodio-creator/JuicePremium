"use server";

import { uploadFile } from "@/actions/storage-action";
import { INITIAL_CREATE_PRODUCT } from "@/constanst/auth-constant";
import { createClient } from "@/lib/supabase/server";
import { CreateProductPrevState } from "@/types/Prevstate_form";
import {
  CreateProductSchema,
  updateProductSchema,
} from "@/validations/auth-validations";

export async function CreateProductFunction(
  prevState: CreateProductPrevState,
  formData: FormData | null,
) {
  console.log("CreateProductFunction dipanggil");
  if (!formData) return INITIAL_CREATE_PRODUCT;

  console.log("image:", formData.get("image"));

  let validatedFields = CreateProductSchema.safeParse({
    product_type_id: Number(formData.get("product_type_id")),
    name: formData.get("name"),
    category: formData.get("category"),
    image: formData.get("image"),
    ingredients: formData.getAll("ingredients"),
    benefits: formData.getAll("benefits"),
    health_goals: formData.getAll("health_goals"),
    description: formData.get("description"),
    serving_size: formData.get("serving_size"),
    sugar: formData.get("sugar"),
    price: Number(formData.get("price")),
  });

  console.log("validatedFields:", validatedFields.data);

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: ["gagal validasi data"],
      },
    };
  }

  if (validatedFields.data.image instanceof File) {
    const { errors, data } = await uploadFile(
      "Images",
      "Products",
      validatedFields.data.image,
    );
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
        image: data.url,
      },
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .insert(validatedFields.data)
    .select();

  if (error) {
    console.log(JSON.stringify(error, null, 2));

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
    errors: {
      ...prevState.errors,
    },
  };
}

export async function UpdateProduct(
  prevState: CreateProductPrevState,
  formData: FormData | null,
) {
  console.log("CreateProductFunction dipanggil");
  if (!formData) return INITIAL_CREATE_PRODUCT;

  console.log("image:", formData.get("image"));

  let validatedFields = updateProductSchema.safeParse({
    id: Number(formData.get("id")),
    product_type_id: Number(formData.get("product_type_id")),
    name: formData.get("name"),
    category: formData.get("category"),
    image: formData.get("image"),
    ingredients: formData.getAll("ingredients"),
    benefits: formData.getAll("benefits"),
    health_goals: formData.getAll("health_goals"),
    description: formData.get("description"),
    serving_size: formData.get("serving_size"),
    sugar: formData.get("sugar"),
    price: Number(formData.get("price")),
  });

  console.log("validatedFields:", validatedFields.data);

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: ["gagal validasi data"],
      },
    };
  }

  if (validatedFields.data.image instanceof File) {
    console.log("old_avatar_url:", formData.get("old_avatar_url"));
    const oldAvatarUrl = formData.get("old_avatar_url") as string;
    const { errors, data } = await uploadFile(
      "Images",
      "Products",
      validatedFields.data.image,
      oldAvatarUrl.split("/Images/")[1],
    );
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
        image: data.url,
      },
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .update({
      name: validatedFields.data.name,
      product_type_id: validatedFields.data.product_type_id,
      category: validatedFields.data.category,
      benefits: validatedFields.data.benefits,
      image: validatedFields.data.image,
      ingredients: validatedFields.data.ingredients,
      health_goals: validatedFields.data.health_goals,
      description: validatedFields.data.description,
      serving_size: validatedFields.data.serving_size,
      sugar: validatedFields.data.sugar,
      price: validatedFields.data.price,
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
    status: "success",
    errors: {
      ...prevState.errors,
    },
  };
}
