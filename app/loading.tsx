import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <Card className="overflow-hidden">
        <CardHeader className="space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </CardHeader>

        <CardContent className="grid gap-8 lg:grid-cols-2">
          {/* Image */}
          <Skeleton className="aspect-square w-full rounded-xl" />

          {/* Detail */}
          <div className="space-y-5">
            <Skeleton className="h-6 w-40" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
            </div>

            <Skeleton className="h-10 w-32" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-52" />
            </div>

            <div className="flex gap-3 pt-4">
              <Skeleton className="h-10 w-28 rounded-lg" />
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
