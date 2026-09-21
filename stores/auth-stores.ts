import { INITIAL_STATE_PROFILE } from "@/constanst/auth-constant";
import { profiles } from "@/types/Prevstate_form";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  profile: profiles;
  setUser: (user: User | null) => void;
  setProfile: (profile: profiles) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: INITIAL_STATE_PROFILE,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
}));
