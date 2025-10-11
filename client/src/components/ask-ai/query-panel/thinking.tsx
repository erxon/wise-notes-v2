import { SparklesIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function Thinking({ query }: { query: string }) {
  return (
    <div>
      <p className="text-neutral-700">{query}</p>
      <div className="flex items-center gap-8">
        <div className="flex rounded-full h-fit p-1">
          <SparklesIcon className="w-6 h-6 mx-auto self-center" />
        </div>
        <div className="flex gap-2 items-center">
          <Spinner />
          <p className="text-neutral-700">Thinking</p>
        </div>
      </div>
    </div>
  );
}
