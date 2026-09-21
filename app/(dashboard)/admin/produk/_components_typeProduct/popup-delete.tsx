import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";

export default function DeletePopUp({
  open,
  onOpenChange,
  isLoading,
  onSubmit,
  title,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
  onSubmit: () => void;
  title: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <form className="grid gap-6">
          <DialogHeader>
            <DialogTitle>Delete {title}</DialogTitle>
            <DialogDescription>
              Yakin untuk menghapus{" "}
              <span className="lowercase font-bold">{title} ?</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              className="bg-red-400 hover:bg-red-700"
              variant="destructive"
              formAction={onSubmit}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
