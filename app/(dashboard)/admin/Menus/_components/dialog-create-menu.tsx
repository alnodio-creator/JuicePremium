"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";

import { createMenu } from "../actions";
import FormMenu from "./form-menu";
import { INITIAL_MENU, INITIAL_STATE_MENU } from "@/constanst/menu-constant";
import { MenuForm, menuFormSchema } from "@/validations/auth-validations";
import { Preview } from "@/types/general";

export default function DialogCreateMenu({ refetch }: { refetch: () => void }) {
  const form = useForm<MenuForm>({
    resolver: zodResolver(menuFormSchema),
    defaultValues: INITIAL_MENU,
  });

  const [createMenuState, createMenuAction, isPendingCreateMenu] =
    useActionState(createMenu, INITIAL_STATE_MENU);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, key === "image_url" ? (preview!.file ?? "") : value);
    });

    startTransition(() => {
      createMenuAction(formData);
    });
  });

  useEffect(() => {
    console.log(createMenuState);

    if (createMenuState?.status === "error") {
      console.log(createMenuState.errors?._form);

      toast.error("Create Menu Failed", {
        description: createMenuState.errors?._form?.join("\n"),
      });
    }
  }, [createMenuState]);

  return (
    <FormMenu
      form={form}
      onSubmit={onSubmit}
      isLoading={isPendingCreateMenu}
      type="Create"
      preview={preview}
      setPreview={setPreview}
    />
  );
}
