import PagesLayout from "./PagesLayout";
import { useCallback, useEffect, useState } from "react";
import CreateNote from "@/components/notes/create-note";
import type { Note } from "@/lib/types";
import Notes from "@/components/notes/notes";
import NoteField from "@/components/notes/note-field";
import NotesLoading from "@/components/skeletons/notes-loading";
import { Button } from "@/components/ui/button";
import { Grid3x3Icon, Rows3Icon } from "lucide-react";
import TooltipWrapper from "@/components/utility-components/TooltipWrapper";
// import useSWR from "swr";
import axios from "axios";

function ViewsOption() {
  return (
    <div className="px-6 flex gap-2">
      <TooltipWrapper content="Grid view">
        <Button size={"icon"} variant={"outline"}>
          <Grid3x3Icon />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper content="List view">
        <Button size={"icon"} variant={"outline"}>
          <Rows3Icon />
        </Button>
      </TooltipWrapper>
    </div>
  );
}

function HomeLayout({
  children,
  setNotes,
}: {
  children: React.ReactNode;
  setNotes?: React.Dispatch<React.SetStateAction<Note[]>>;
}) {
  const [openNewNoteDialog, setOpenNewNoteDialog] = useState(false);

  return (
    <PagesLayout page="Notes">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4 items-center">
          <NoteField
            setOpenNewNoteDialog={setOpenNewNoteDialog}
            title="Hello, Ericson"
          />
        </div>
        <ViewsOption />
        {children}
        <CreateNote
          setNotes={setNotes}
          open={openNewNoteDialog}
          setOpen={setOpenNewNoteDialog}
        />
      </div>
    </PagesLayout>
  );
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // const { data, isLoading, error } = useSWR(
  //   `${import.meta.env.VITE_API_URL}/${
  //     import.meta.env.VITE_API_VERSION
  //   }/notes?page=${page}`,
  //   fetcher
  // );

  // const getKey = (pageIndex: number, prev: Note[]) => {
  //   if (prev && !prev.length) return null;
  //   return `${import.meta.env.VITE_API_URL}/${
  //     import.meta.env.VITE_API_VERSION
  //   }/notes?page=${pageIndex + 1}`;
  // };

  // const { data, error, isValidating, setSize } = useSWRinfinite(
  //   getKey,
  //   fetcher
  // );

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);

    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/${
        import.meta.env.VITE_API_VERSION
      }/notes?page=${page}`,
      {
        withCredentials: true,
      }
    );

    if (result.data && result.data.length === notes.length) {
      setIsLoading(false);
      setHasMore(false);
      return;
    }

    setNotes(result.data);
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  if (notes.length === 0) {
    return (
      <HomeLayout>
        <NotesLoading />
      </HomeLayout>
    );
  }

  return (
    <>
      <HomeLayout setNotes={setNotes}>
        <Notes
          hasMore={hasMore}
          setPage={setPage}
          notes={notes}
          setNotes={setNotes}
          isValidating={isLoading}
        />
      </HomeLayout>
    </>
  );
}
