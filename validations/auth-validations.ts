import z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Masukkan Email Anda")
    .email("Tolong masukkan email yang valid"),
  password: z.string().min(1, "Masukkan password anda"),
});

export type LoginForm = z.infer<typeof LoginSchema>;
