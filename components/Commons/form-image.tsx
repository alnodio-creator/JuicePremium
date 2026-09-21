import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FileImage } from "lucide-react";
import { getImageData } from "@/lib/utils";

export default function FormImage<T extends FieldValues>({
  form,
  name,
  label,
  preview,
  setPreview,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  preview?:
    | {
        file?: File;
        displayUrl?: string;
      }
    | undefined;
  setPreview?: (preview: { file: File; displayUrl: string }) => void;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, ...rest } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-60 w-80 rounded-lg">
                <AvatarImage
                  src={preview?.displayUrl}
                  alt="preview"
                  className="object-cover"
                />
                <AvatarFallback className="rounded-lg">
                  <FileImage className="w-10 h-10" />
                </AvatarFallback>
              </Avatar>
              <Input
                type="file"
                name={rest.name}
                ref={rest.ref}
                onBlur={rest.onBlur}
                disabled={rest.disabled}
                onChange={async (event) => {
                  onChange(event);
                  const { file, displayUrl } = getImageData(event);
                  if (file) {
                    setPreview?.({
                      file,
                      displayUrl,
                    });
                  }
                }}
              />
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
