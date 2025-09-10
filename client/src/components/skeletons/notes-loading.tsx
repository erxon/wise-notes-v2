import { Skeleton } from "../ui/skeleton";

export default function NotesLoading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      <Skeleton className="h-[200px] break-inside-avoid" />
      <Skeleton className="h-[200px] break-inside-avoid" />
      <Skeleton className="h-[200px] break-inside-avoid" />
      <Skeleton className="h-[200px] break-inside-avoid" />
      <Skeleton className="h-[200px] break-inside-avoid" />
      <Skeleton className="h-[200px] break-inside-avoid" />
      <Skeleton className="h-[200px] break-inside-avoid" />
      <Skeleton className="h-[200px] break-inside-avoid" />
    </div>
  );
}
