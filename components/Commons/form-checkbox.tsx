import { useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ChevronDown, Search, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

export default function FormCheckboxArray<T extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder = "Tambah sendiri...",
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  const [customValue, setCustomValue] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const values = (field.value ?? []) as string[];
        const filteredOptions = options.filter((option) =>
          option.label.toLowerCase().includes(search.toLowerCase()),
        );

        const toggleValue = (value: string) => {
          if (values.includes(value)) {
            field.onChange(values.filter((v) => v !== value));
          } else {
            field.onChange([...values, value]);
          }
        };

        const addCustom = () => {
          const value = customValue.trim();

          if (!value) return;

          if (!values.includes(value)) {
            field.onChange([...values, value]);
          }

          setCustomValue("");
        };

        const removeValue = (value: string) => {
          field.onChange(values.filter((v) => v !== value));
        };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>

            <FormControl>
              <div className="space-y-4">
                <Collapsible open={open} onOpenChange={setOpen}>
                  <CollapsibleTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <span>
                        {values.length > 0
                          ? `${values.length} ${label.toLowerCase()} dipilih`
                          : `Pilih ${label}`}
                      </span>

                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="overflow-hidden">
                    <div className="mt-4 space-y-4 rounded-md border p-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                          className="pl-9"
                          placeholder="Cari..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                      {/* Checkbox */}
                      <div className="max-h-56 space-y-2 overflow-y-auto">
                        {filteredOptions.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              checked={values.includes(option.value)}
                              onCheckedChange={() => toggleValue(option.value)}
                            />

                            <label className="text-sm">{option.label}</label>
                          </div>
                        ))}
                        {filteredOptions.length === 0 && (
                          <p className="py-4 text-center text-sm text-muted-foreground">
                            Data tidak ditemukan
                          </p>
                        )}
                      </div>

                      {/* Input Custom */}
                      <div className="flex gap-2">
                        <Input
                          value={customValue}
                          placeholder={placeholder}
                          onChange={(e) => setCustomValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addCustom();
                            }
                          }}
                        />

                        <Button type="button" onClick={addCustom}>
                          Tambah
                        </Button>
                        <Button
                          type="button"
                          variant="default"
                          onClick={() => {
                            setOpen(false);
                            setSearch("");
                          }}
                        >
                          Selesai
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Selected */}
                {values.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {values.map((value) => (
                      <Badge
                        key={value}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {value}

                        <button
                          type="button"
                          onClick={() => removeValue(value)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>

            <FormMessage className="text-xs" />
          </FormItem>
        );
      }}
    />
  );
}
