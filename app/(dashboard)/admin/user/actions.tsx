"use server";
import { INITAL_STATE_CREATE_USER } from "@/constanst/auth-constant";
import { createClient } from "@/lib/supabase/server";
import { PrevstateType } from "@/types/Prevstate_form";
import { createUserSchema } from "@/validations/auth-validations";

export default async function CreateUser(
  prevState: PrevstateType,
  formData: FormData | null,
) {
  if (!formData) {
    return INITAL_STATE_CREATE_USER;
  }

  const validatedFields = createUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    role: formData.get("role"),
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

  const supabase = await createClient();
  const result = await supabase.auth.signUp({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    options: {
      data: {
        name: validatedFields.data.name,
        role: validatedFields.data.role,
      },
    },
  });

  if (result.error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [result.error.message],
      },
    };
  }

  return {
    ...INITAL_STATE_CREATE_USER,
    status: "success",
  };
}
