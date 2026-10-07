"use client";

import { use } from "react";
import DashboardProduct from "./_components/dashboard-product";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params);

  return (
    <main className="min-h-screen w-full bg-background">
      <div className="mx-auto w-full max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">
        <DashboardProduct id={id} />
      </div>
    </main>
  );
}
