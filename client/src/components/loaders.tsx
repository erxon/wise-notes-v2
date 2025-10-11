import { Skeleton } from "./ui/skeleton";

export function Loading() {
  return <div></div>;
}
export function QueryPanelLoader() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex gap-4 mb-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-[150px]" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[100px]" />
          <Skeleton className="h-6 w-[300px]" />
        </div>
      </div>
      <div>
        <div className="flex gap-4 mb-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-[150px]" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[100px]" />
          <Skeleton className="h-6 w-[300px]" />
        </div>
      </div>
      <div>
        <div className="flex gap-4 mb-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-[150px]" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[100px]" />
          <Skeleton className="h-6 w-[300px]" />
        </div>
      </div>
    </div>
  );
}
