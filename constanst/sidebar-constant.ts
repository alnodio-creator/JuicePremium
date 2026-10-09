import {
  LayoutDashboard,
  MenuIcon,
  ShoppingBasket,
  User2Icon,
  UserCog,
} from "lucide-react";

export const SIDEBAR_JUICE = {
  Admin: [
    { title: "Admin", path: "/admin", icon: UserCog },
    { title: "Database Produk", path: "/admin/produk", icon: ShoppingBasket },
    { title: "dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { title: "User", path: "/admin/user", icon: User2Icon },
    // { title: "Menu", path: "/admin/Menus", icon: MenuIcon },
  ],
  dashboard: [],
};

export type SidebarType = keyof typeof SIDEBAR_JUICE;

export const ACTIONS_COMPONENT = {
  edit: { title: "Edit Data", path: "/editproduct" },
  Delete: { title: "Delete Data", path: "/DeleteProduct" },
};
