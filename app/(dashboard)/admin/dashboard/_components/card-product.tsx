"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UpdateTypeProduct } from "@/types/general";
import { ArrowUpRight, Package, Ratio, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CardTypeProduct({ item }: { item: UpdateTypeProduct }) {
  return (
    <Card
      key={item.id}
      className="
        group flex h-full flex-col overflow-hidden
        border-border/60 bg-card
        shadow-sm transition-all duration-300
        hover:-translate-y-1
        hover:border-primary/30
        hover:shadow-lg
      "
    >
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden bg-muted sm:h-44">
        {item.Prod_Type_Image ? (
          <Image
            src={item.Prod_Type_Image}
            alt={item.name || "Product Type"}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              (max-width: 1280px) 33vw,
              25vw
            "
            className="
              object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/10 via-muted to-primary/5">
            <Package className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {/* Badge */}
        <div className="absolute left-3 top-3">
          <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
            <Ratio className="h-3 w-3" />
            Product Type
          </div>
        </div>

        {/* Action */}
        <div
          className="
            absolute bottom-3 right-3
            flex items-center gap-2
            opacity-0 transition-all duration-300
            group-hover:opacity-100
          "
        >
          {/* tombol Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-full bg-white/90
                  text-gray-900 shadow-lg
                  transition-colors
                  hover:bg-white
                "
              >
                <Eye className="h-4 w-4" />
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{item.name || "Tanpa Nama"}</DialogTitle>

                <DialogDescription>
                  Detail informasi Product Type
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {item.Prod_Type_Image && (
                  <div className="relative h-48 w-full overflow-hidden rounded-lg">
                    <Image
                      src={item.Prod_Type_Image}
                      alt={item.name || "Product Type"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="mb-1 text-sm font-medium">Deskripsi</p>

                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.description || "Belum ada deskripsi produk."}
                  </p>
                </div>

                <Link
                  href={`/dashboard/dashboard-product/${item.id}`}
                  className="
                    flex w-full items-center justify-center gap-2
                    rounded-md bg-primary px-4 py-2
                    text-sm font-medium text-primary-foreground
                    hover:bg-primary/90
                  "
                >
                  Buka Detail
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </DialogContent>
          </Dialog>

          {/* Direct link */}
          <Link
            href={`/dashboard/dashboard-product/${item.id}`}
            className="
              flex h-8 w-8 items-center justify-center
              rounded-full bg-white/90
              text-gray-900 shadow-lg
              hover:bg-white
            "
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Header */}
      <CardHeader className="px-4 pb-2 pt-4">
        <CardTitle className="line-clamp-2 min-h-10 text-base font-semibold leading-5">
          <Link
            href={`/dashboard/dashboard-product/${item.id}`}
            className="transition-colors hover:text-primary"
          >
            {item.name || "Tanpa Nama"}
          </Link>
        </CardTitle>

        <CardDescription className="flex items-center gap-2 text-xs">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10">
            <Ratio className="h-3 w-3 text-primary" />
          </div>

          <span>Product Type</span>
        </CardDescription>
      </CardHeader>

      {/* Description */}
      <CardContent className="flex flex-1 flex-col px-4 pb-4">
        <div className="rounded-lg bg-muted/40 p-2.5">
          <p className="line-clamp-3 min-h-18 text-xs leading-5 text-muted-foreground">
            {item.description || "Belum ada deskripsi produk."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
