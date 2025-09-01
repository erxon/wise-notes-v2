import fetcher from "@/lib/fetcher";
import { NotebookIcon } from "lucide-react";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";

export default function NotebookName({ id }: { id: string }) {
  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/${
      import.meta.env.VITE_API_VERSION
    }/notebooks/${id}`,
    fetcher
  );

  if (isLoading) {
    return <Skeleton className="h-4 w-[100px]" />;
  }

  if (error) {
    return (
      <div className="text-sm flex gap-1 text-neutral-500">
        <NotebookIcon className="w-4 h-4" />
        Error fetching notebook
      </div>
    );
  }

  return (
    <div className="text-sm flex gap-1 text-neutral-500">
      <NotebookIcon className="w-4 h-4" />
      {data.data.title}
    </div>
  );
}
