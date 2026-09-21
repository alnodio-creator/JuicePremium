"use client";

import { Apple, EllipsisVertical, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SIDEBAR_JUICE, SidebarType } from "@/constanst/sidebar-constant";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "@/actions/auth-actions";
import { useAuthStore } from "@/stores/auth-stores";

export default function AppSidebar() {
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const profiles = useAuthStore((state) => state.profile);
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="font-semibold">
                <div className="bg-teal-500 flex p-2 items-center justify-center rounded-md">
                  <Apple className="size-4" />
                </div>
                Nadhifa Juice Premium
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_JUICE[profiles.role as SidebarType]?.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a
                        href={item.path}
                        className={cn("px-4 py-3 h-auto", {
                          "bg-teal-500 text-white hover:bg-teal-500 hover:text-white":
                            pathname === item.path,
                        })}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback className="rounded-lg">A</AvatarFallback>
                  </Avatar>
                  <div className="leading-tight">
                    <h4 className="truncate font-medium">{profiles.name}</h4>
                    <p className="text-muted-foreground truncate text-xs">
                      {profiles.role}
                    </p>
                  </div>
                  <EllipsisVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="" alt="" />
                      <AvatarFallback className="rounded-lg">A</AvatarFallback>
                    </Avatar>
                    <div className="leading-tight">
                      <h4 className="truncate font-medium">{profiles.name}</h4>
                      <p className="text-muted-foreground truncate text-xs">
                        {profiles.role}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
