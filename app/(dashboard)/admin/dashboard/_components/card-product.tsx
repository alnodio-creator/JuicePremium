import PaginationDataTable from "@/components/Commons/pagination-data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LIMIT_LISTS } from "@/constanst/data-table-constant";
import { ReactNode } from "react";

export function CardProduct({
  data,
  TotalPages,
  currentLimit,
  currentPage,
  onChangePage,
  onChangeLimit,
}: {
  data: (string | ReactNode | null)[] | null;
  TotalPages: number;
  currentLimit: number;
  currentPage: number;
  onChangePage: (page: number) => void;
  onChangeLimit: (limit: number) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Card key={item} className="w-full">
          <CardHeader>
            <CardTitle>Card Title {item}</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>

          <CardContent>
            <p>Card Content</p>
          </CardContent>

          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      ))}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label>Limit</Label>
          <Select
            value={currentLimit.toString()}
            onValueChange={(value) => onChangeLimit(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Limit</SelectLabel>
                {LIMIT_LISTS.map((limit) => (
                  <SelectItem key={limit} value={limit.toString()}>
                    {limit}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {TotalPages > 1 && (
          <div className="flex justify-end">
            <PaginationDataTable
              currentPage={currentPage}
              onChangePage={onChangePage}
              totalPages={TotalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
}
