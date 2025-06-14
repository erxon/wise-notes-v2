import { Skeleton } from "../ui/skeleton";

export default function UserLoading() {
  return (
    <div className="flex items-center space-x-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[125px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  );
}
