"use client";

import { Button } from "@/components/ui/button";

import { useEffect, useMemo, useRef, useState } from "react";

import ProductDashboard from "./_components/dashboard";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Card } from "@/components/ui/card";

export default function Dashboard<T extends FieldValues>() {
  const [Angka, setAngka] = useState(1);
  const [Nama, setNama] = useState("Alnodio");

  const Hasil = useMemo(() => {
    console.log("Belajar UseMemo");
    return Angka * 10;
  }, [Angka]);

  const HandleClick = () => {
    setAngka(Angka + 1);
  };

  return (
    <div className="w-full">
      <ProductDashboard />
    </div>
  );
}
