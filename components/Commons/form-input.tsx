import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  type,
  placeholder,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { ...rest } }) => (
        <FormItem className="">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "textarea" ? (
              <textarea
                className="p-4 border-2 rounded-2xl"
                {...rest}
                placeholder={placeholder}
                autoComplete="off"
              />
            ) : (
              <Input
                {...rest}
                type={type}
                placeholder={placeholder}
                autoComplete="off"
              />
            )}
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
