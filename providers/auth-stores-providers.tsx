"use client";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-stores";
import { profiles } from "@/types/Prevstate_form";
import { ReactNode, useEffect } from "react";

export default function AuthStoreProvider({
  children,
  profile,
}: {
  children: ReactNode;
  profile: profiles;
}) {
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      useAuthStore.getState().setUser(user);
      useAuthStore.getState().setProfile(profile);
    });
  }); // ←
  return <>{children}</>;
}
