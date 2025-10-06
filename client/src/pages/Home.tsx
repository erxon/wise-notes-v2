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
import axios from "axios";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/notes`,
        { withCredentials: true }
      );

      setNotes(data.data);
    } catch {
      setError("Something went wrong");
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

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
