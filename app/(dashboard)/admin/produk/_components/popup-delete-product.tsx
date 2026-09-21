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

export function DeletePopUpProduct({
  open,
  HandleClosePopup,
  isLoading,
  onSubmit,
  title,
}: {
  open: boolean;
  onSubmit: () => void;
  HandleClosePopup: (open: boolean) => void;
  title: string;
  isLoading: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={HandleClosePopup}>
      <DialogContent className="sm:max-sm:">
        <form className="grid gap-5">
          <DialogHeader>
            <DialogTitle>Delete {title}</DialogTitle>
            <DialogDescription>
              Yakin untuk menghapus Product{" "}
              <span className="font-bold">{title} ?</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button
              formAction={onSubmit}
              variant={"default"}
              className="bg-red-400 hover:bg-red-700"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Hapus"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
