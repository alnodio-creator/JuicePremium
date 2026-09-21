import {
  INITAL_STATE_CREATE_USER,
  INITIAL_CREATE_USER_FORM,
} from "@/constanst/auth-constant";
import {
  CreateUserForm,
  createUserSchema,
} from "@/validations/auth-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CreateUser from "../actions";
import { toast } from "sonner";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/Commons/form-input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectItem, SelectLabel } from "@radix-ui/react-select";

export default function DialogCreateUser({ refetch }: { refetch: () => void }) {
  const form = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: INITIAL_CREATE_USER_FORM,
  });

  const [createUserState, createUserAction, isPendingCreateUser] =
    useActionState(CreateUser, INITAL_STATE_CREATE_USER);

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    startTransition(() => {
      createUserAction(formData);
    });
  });

  useEffect(() => {
    if (createUserState?.status === "error") {
      toast.error("Gagal membuat user", {
        description: createUserState?.errors?._form,
      });
    }
    if (createUserState?.status === "success") {
      toast.success("Sukses Membuat User", {
        description: createUserState.status,
      });
      form.reset();
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [createUserState]);

  return (
    <DialogContent className="sm:max-w-sm">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>register a new user</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormInput
            form={form}
            label="Email"
            name="email"
            placeholder="Masukkan Email Anda"
            type="text"
          />
          <FormInput
            form={form}
            label="Password"
            name="password"
            placeholder="Masukkan Password Anda"
            type="password"
          />
          <FormInput
            form={form}
            label="Nama"
            name="name"
            placeholder="Masukkan Nama Anda Anda"
            type="text"
          />
          <Select>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex justify-between">
            <Button type="submit">
              {isPendingCreateUser ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
