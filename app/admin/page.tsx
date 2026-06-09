import { ModeToggle } from "@/components/Commons/Dark-mode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="relative">
      <Button className="bg-red-400 dark:bg-amber-300">Hello</Button>
      <div className="absolute right-8 top-4 border border-2">
        <ModeToggle />
      </div>
      <div></div>
    </div>
  );
}
