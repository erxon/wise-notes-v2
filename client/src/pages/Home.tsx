import PagesLayout from "./PagesLayout";
import { useEffect, useState } from "react";
import CreateNote from "@/components/notes/create-note";
import type { Note } from "@/lib/types";
import Notes from "@/components/notes/notes";
import NoteField from "@/components/notes/note-field";
import NotesLoading from "@/components/skeletons/notes-loading";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";

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
