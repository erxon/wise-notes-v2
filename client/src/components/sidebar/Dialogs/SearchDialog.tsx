import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { ExpandIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SearchDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Note[]>([]);

  const handleSearch = async (searchTerm: string) => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/notes/search/${searchTerm}`,
        { withCredentials: true }
      );

      setSearchResults(result.data.data);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  console.log(searchResults);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Search for a note by title or content
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            placeholder="Type the term here..."
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
        <div className="h-[450px]">
          <p className="text-sm text-neutral-500 mb-4">Results</p>
          {isLoading ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-[24px] w-full" />
              <Skeleton className="h-[24px] w-[200px]" />
              <Skeleton className="h-[24px] w-[300px] mb-1" />
              <Skeleton className="h-[24px] w-full" />
              <Skeleton className="h-[24px] w-[200px]" />
              <Skeleton className="h-[24px] w-[300px] mb-1" />
              <Skeleton className="h-[24px] w-full" />
              <Skeleton className="h-[24px] w-[200px]" />
              <Skeleton className="h-[24px] w-[300px]" />
            </div>
          ) : (
            <SearchResults searchResults={searchResults} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SearchResults({ searchResults }: { searchResults: Note[] }) {
  return (
    <>
      {searchResults && searchResults.length > 0 ? (
        <div className="flex flex-col gap-2">
          {searchResults.map((note) => (
            <div key={note.id} className="flex flex-col gap-2">
              <p className="font-bold">{note.title}</p>
              <p className="text-sm">
                {note.content.length > 100
                  ? `${note.content.substring(0, 100)}...`
                  : note.content}
              </p>
              <div>
                <Button size={"icon"} variant={"ghost"}>
                  <ExpandIcon />
                </Button>
              </div>
              <Separator />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-2 items-center text-neutral-600">
          <SearchIcon className="w-6 h-6 text-neutral-600" />
          <p className="text-sm">No results found</p>
        </div>
      )}
    </>
  );
}
