import PagesLayout from "./PagesLayout";
import { useEffect, useState } from "react";
import CreateNote from "@/components/notes/create-note";
import type { Note } from "@/lib/types";
import Notes from "@/components/notes/notes";
import NoteField from "@/components/notes/note-field";
import NotesLoading from "@/components/skeletons/notes-loading";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Grid3x3Icon, Rows3Icon } from "lucide-react";
import TooltipWrapper from "@/components/utility-components/TooltipWrapper";

/* 
[ ] Code function for the grid and rows view
*/

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

function HomeLayout({ children }: { children: React.ReactNode }) {
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
        <CreateNote open={openNewNoteDialog} setOpen={setOpenNewNoteDialog} />
      </div>
    </PagesLayout>
  );
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/notes`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setNotes(data.data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <HomeLayout>
        <NotesLoading />
      </HomeLayout>
    );
  }

  if (error) {
    return (
      <HomeLayout>
        <div>Something went wrong</div>
      </HomeLayout>
    );
  }

  return (
    <>
      <HomeLayout>
        {notes.length > 0 && <Notes notes={notes} setNotes={setNotes} />}
      </HomeLayout>
    </>
  );
}
