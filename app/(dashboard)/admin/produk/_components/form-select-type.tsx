import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";
import { UpdateTypeProduct } from "@/types/general";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FormSelectTypeProduct<T extends FieldValues>({
  name,
  label,
  form,
  selectItem,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  selectItem: UpdateTypeProduct[] | null | undefined;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                className={cn("w-full", {
                  "border-red-500": form.formState.errors[name]?.message,
                })}
              >
                <SelectValue placeholder={`Select ${label}`}></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {(selectItem || []).map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id.toString()}
                      disabled={item.disabled}
                      className="capitalize"
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
