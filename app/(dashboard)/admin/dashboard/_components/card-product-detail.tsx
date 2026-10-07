import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/lib/types";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CardProductDetail({
  filteredData,
}: {
  filteredData: Product[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredData.map((item) => (
        <Card key={item.name} className="w-full">
          <CardHeader>
            <CardTitle className="min-h-14 text-center">
              <Link href={`dashboard/dashboard-product/${item.id}`}>
                Card Title {item.name}
              </Link>
            </CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>

          <CardContent className="mt-5">
            <div className="rounded-4xl border-4 border-amber-400">
              <Image
                className="rounded-4xl"
                alt={item.name}
                src={item.name}
                width={200}
                height={300}
              />
            </div>
          </CardContent>

          <CardFooter>
            <div className="flex gap-2 justify-between items-center">
              <Button type="button" className="bg-red-500 hover:bg-red-700">
                <Trash2 />
                Hapus
              </Button>
              <Button variant="outline">Edit Product</Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
