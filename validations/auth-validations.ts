import z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Masukkan Email Anda")
    .email("Tolong masukkan email yang valid"),
  password: z.string().min(1, "Masukkan password anda"),
});

export type LoginForm = z.infer<typeof LoginSchema>;

export const createUserSchema = z.object({
  email: z.string().min(1, "Email diperlukan Untuk Masuk"),
  password: z.string().min(5, "Password Minimal 5 Karakter"),
  name: z.string().min(1, "Masukkan Nama"),
  role: z.string().min(1, "Masukkan Role"),
});

export type CreateUserForm = z.infer<typeof createUserSchema>;

export const CreateProductSchema = z.object({
  product_type_id: z.coerce.number().min(1, "Product type wajib dipilih"),
  name: z.string().min(1, "Nama produk wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
  price: z.coerce.number().min(1, "Harga wajib diisi"),
  image: z.union([
    z.string().min(1, "Image URL is required"),
    z.instanceof(File),
  ]),
  ingredients: z.array(z.string().min(1)).min(1, "Minimal 1 ingredient"),
  benefits: z.array(z.string().min(1)).min(1, "Minimal 1 benefit"),
  health_goals: z.array(z.string().min(1)).min(1, "Minimal 1 health goal"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  serving_size: z.string().min(1, "Serving size wajib diisi"),
  // calories_per_serving: z.coerce.number().min(0, "Kalori tidak valid"),
  // vitamin_c: z.string().min(1, "Vitamin C wajib diisi"),
  // potassium: z.string().min(1, "Potassium wajib diisi"),
  sugar: z.string().min(1, "Sugar wajib diisi"),
  // rating: z.coerce.number().min(0).max(5, "Rating maksimal 5"),
  // reviews: z.coerce.number().min(0, "Reviews tidak valid"),
});

export type CreateProductType = z.infer<typeof CreateProductSchema>;

export const menuFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  discount: z.string().min(1, "Discount is required"),
  category: z.string().min(1, "Category is required"),
  image_url: z.union([
    z.string().min(1, "Image URL is required"),
    z.instanceof(File),
  ]),
  is_available: z.string().min(1, "Availability is required"),
});

export const menuSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  discount: z.number(),
  category: z.string(),
  image_url: z.union([z.string(), z.instanceof(File)]),
  is_available: z.boolean(),
});

export const updateProductSchema = z.object({
  product_type_id: z.coerce.number().min(1, "Product type wajib dipilih"),
  name: z.string().min(1, "Nama produk wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
  price: z.coerce.number().min(1, "Harga wajib diisi"),
  image: z.union([
    z.string().min(1, "Image URL is required"),
    z.instanceof(File),
  ]),
  ingredients: z.array(z.string().min(1)).min(1, "Minimal 1 ingredient"),
  benefits: z.array(z.string().min(1)).min(1, "Minimal 1 benefit"),
  health_goals: z.array(z.string().min(1)).min(1, "Minimal 1 health goal"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  serving_size: z.string().min(1, "Serving size wajib diisi"),
  sugar: z.string().min(1, "Sugar wajib diisi"),
});

export const CreateTypeProductSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  Prod_Type_Image: z.union([
    z.string().min(1, "Image URL is required"),
    z.instanceof(File),
  ]),
  description: z.string().min(1, "Deskripsi wajib diisi"),
});

export type CreateTypeProductType = z.infer<typeof CreateTypeProductSchema>;
export type UpdateProductType = z.infer<typeof updateProductSchema>;
export type MenuForm = z.infer<typeof menuFormSchema>;
export type Menu = z.infer<typeof menuSchema> & { id: string };
