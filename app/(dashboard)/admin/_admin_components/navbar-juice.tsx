"use client";

import Navbar from "@/components/Navbar";
import { ModeToggle } from "@/components/Commons/Dark-mode";

export default function NavbarJuice({
  setSearchInput,
}: {
  setSearchInput: (value: string) => void;
}) {
  return (
    <div className="sticky top-0 z-50 w-full bg-background/95 shadow-sm backdrop-blur-md">
      <Navbar onSearchChange={setSearchInput} />

      <div className="absolute right-4 top-4 z-50 sm:right-7">
        <ModeToggle />
      </div>
    </div>
  );
}
