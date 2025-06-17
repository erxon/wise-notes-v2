import { Skeleton } from "../ui/skeleton";

export default function NotesLoading() {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
      <Skeleton className="h-[200px] break-inside-avoid" />
      <Skeleton className="h-[200px] break-inside-avoid" />
      <Skeleton className="h-[300px] break-inside-avoid" />
      <Skeleton className="h-[200px] break-inside-avoid" />
    </div>
  );
}
