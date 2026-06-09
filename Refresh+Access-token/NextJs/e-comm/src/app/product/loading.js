import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          {/* Image Skeleton */}
          <div className="p-4">
            <Skeleton className="h-52 sm:h-60 md:h-64 w-full rounded-lg" />
          </div>

          <CardContent className="space-y-4">
            {/* Category */}
            <Skeleton className="h-5 w-24 rounded-full" />

            {/* Title */}
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />

            {/* Description */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />

            {/* Rating & Price */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
          </CardContent>

          <CardFooter>
            <Skeleton className="h-10 w-full rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}