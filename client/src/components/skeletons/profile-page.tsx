import { Skeleton } from "../ui/skeleton";

export default function ProfilePageSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
}
