import { createClient } from "@/lib/supabase/server";
import ProductManagement from "./_components/product";
import TypeProductManagement from "./_components_typeProduct/product-type";

export const metadata = {
  title: "Database Prouduct",
};

export default async function UserManagementPage() {
  return (
    <div className="w-full space-y-6">
      <ProductManagement />
      <TypeProductManagement />
    </div>
  );
}
