"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  INITIAL_LOGIN_FORM,
  INITIAL_STATE_LOGIN_FORM,
} from "@/constanst/auth-constant";
import { LoginForm, LoginSchema } from "@/validations/auth-validations";

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { login } from "../actions";
import { Loader } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: INITIAL_LOGIN_FORM,
  });

  const [loginState, loginAction, isPendingLogin] = useActionState(
    login,
    INITIAL_STATE_LOGIN_FORM,
  );

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    startTransition(() => {
      loginAction(formData);
    });
  });

  useEffect(() => {
    if (loginState.status === "error") {
      toast.error("Login Gagal", {
        description: loginState.errors?._form?.[0],
      });
      startTransition(() => {
        loginAction(null);
      });
    }
  }, [loginState]);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Admin Nadhifa Juice</CardTitle>
        <CardDescription>Login untuk Akses Database Website</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field: { ...rest } }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...rest}
                      type="email"
                      placeholder="Insert your email"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field: { ...rest } }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...rest}
                      type="password"
                      placeholder="******"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button type="submit">
              {isPendingLogin ? <Loader className="animate-spin" /> : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
