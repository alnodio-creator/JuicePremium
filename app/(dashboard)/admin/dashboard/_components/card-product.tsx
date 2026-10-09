"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UpdateTypeProduct } from "@/types/general";
import { ArrowUpRight, Eye, Package, Ratio, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CardTypeProduct({ item }: { item: UpdateTypeProduct }) {
  return (
    <Card
      className="
        group flex h-full flex-col overflow-hidden
        rounded-2xl border-border/60 bg-card
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-primary/30
        hover:shadow-xl
      "
    >
      {/* =====================================================
          IMAGE
      ====================================================== */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
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
              transition-transform duration-700
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              flex h-full w-full items-center justify-center
              bg-linear-to-br from-primary/10
              via-muted to-primary/5
            "
          >
            <Package className="h-16 w-16 text-muted-foreground/25" />
          </div>
        )}

        {/* Image overlay */}
        <div
          className="
            absolute inset-0
            bg-linear-to-t
            from-black/70 via-black/10 to-transparent
          "
        />

        {/* =====================================================
            TOP BADGE
        ====================================================== */}
        <div className="absolute left-3 top-3">
          <div
            className="
              flex items-center gap-1.5
              rounded-full
              border border-white/20
              bg-black/40
              px-3 py-1.5
              text-[11px] font-medium
              text-white
              backdrop-blur-md
            "
          >
            <Ratio className="h-3 w-3" />
            Product Type
          </div>
        </div>

        {/* =====================================================
            ACTION BUTTONS
        ====================================================== */}
        <div
          className="
            absolute bottom-3 right-3
            flex items-center gap-2
            opacity-0
            translate-y-2
            transition-all duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          {/* View Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label="Lihat detail"
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-full
                  bg-white/95
                  text-gray-900
                  shadow-lg
                  transition-all
                  hover:scale-105
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

              <div className="space-y-5">
                {/* Image */}
                {item.Prod_Type_Image && (
                  <div className="relative h-56 w-full overflow-hidden rounded-xl">
                    <Image
                      src={item.Prod_Type_Image}
                      alt={item.name || "Product Type"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Description */}
                <div className="rounded-xl bg-muted/50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <div
                      className="
                        flex h-7 w-7 items-center justify-center
                        rounded-lg bg-primary/10
                      "
                    >
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                    </div>

                    <p className="text-sm font-semibold">Deskripsi</p>
                  </div>

                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.description ||
                      "Belum ada deskripsi untuk product type ini."}
                  </p>
                </div>

                {/* Product Type Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border bg-card p-3">
                    <p className="text-xs text-muted-foreground">Tipe</p>

                    <p className="mt-1 text-sm font-semibold">Product Type</p>
                  </div>

                  <div className="rounded-xl border bg-card p-3">
                    <p className="text-xs text-muted-foreground">ID</p>

                    <p className="mt-1 text-sm font-semibold">#{item.id}</p>
                  </div>
                </div>

                {/* Detail Button */}
                <Link
                  href={`/admin/dashboard/dashboard-product/${item.id}`}
                  className="
                    flex w-full items-center justify-center
                    gap-2 rounded-xl
                    bg-primary px-4 py-2.5
                    text-sm font-semibold
                    text-primary-foreground
                    transition-all
                    hover:bg-primary/90
                    hover:shadow-md
                  "
                >
                  Buka Detail
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </DialogContent>
          </Dialog>

          {/* Direct Link */}
          <Link
            href={`/admin/dashboard/dashboard-product/${item.id}`}
            aria-label="Buka detail"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full
              bg-white/95
              text-gray-900
              shadow-lg
              transition-all
              hover:scale-105
              hover:bg-white
            "
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* =====================================================
            IMAGE BOTTOM TITLE
        ====================================================== */}
        <div className="absolute bottom-3 left-3 right-20">
          <p className="line-clamp-2 text-base font-semibold leading-5 text-white drop-shadow-md">
            {item.name || "Tanpa Nama"}
          </p>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <CardHeader className="px-4 pb-2 pt-4">
        <div className="flex items-center justify-between">
          {/* Type */}
          <div className="flex items-center gap-2">
            <div
              className="
                flex h-7 w-7 items-center justify-center
                rounded-lg bg-primary/10
              "
            >
              <Ratio className="h-3.5 w-3.5 text-primary" />
            </div>

            <span className="text-xs font-medium text-muted-foreground">
              Product Type
            </span>
          </div>

          {/* ID */}
          <span className="text-[11px] text-muted-foreground">#{item.id}</span>
        </div>

        {/* Desktop title */}
        <CardTitle className="pt-2 text-base font-semibold leading-5">
          <Link
            href={`/admin/dashboard/dashboard-product/${item.id}`}
            className="
              line-clamp-2
              transition-colors
              hover:text-primary
            "
          >
            {item.name || "Tanpa Nama"}
          </Link>
        </CardTitle>
      </CardHeader>

      {/* =====================================================
          DESCRIPTION
      ====================================================== */}
      <CardContent className="flex flex-1 flex-col px-4 pb-4">
        <div
          className="
            flex flex-1 flex-col
            rounded-xl
            bg-muted/40
            p-3
          "
        >
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" />

            <span className="text-xs font-medium">About this type</span>
          </div>

          <p className="line-clamp-3 text-xs leading-5 text-muted-foreground">
            {item.description || "Belum ada deskripsi untuk product type ini."}
          </p>
        </div>

        {/* Bottom action */}
        <Link
          href={`/admin/dashboard/dashboard-product/${item.id}`}
          className="
            mt-3 flex items-center justify-between
            rounded-xl
            border border-border/60
            px-3 py-2
            text-xs font-medium
            transition-all
            hover:border-primary/30
            hover:bg-primary/5
          "
        >
          <span>Lihat produk</span>

          <ArrowUpRight
            className="
              h-3.5 w-3.5
              transition-transform
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </Link>
      </CardContent>
    </Card>
  );
}
