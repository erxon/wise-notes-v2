import PagesLayout from "./PagesLayout";
import { useCallback, useEffect, useState } from "react";
import CreateNote from "@/components/notes/create-note";
import type { Note } from "@/lib/types";
import Notes from "@/components/notes/notes";
import NoteField from "@/components/notes/note-field";
import NotesLoading from "@/components/skeletons/notes-loading";
import axios from "axios";
import ViewsOption from "@/components/view-options";

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
  const [view, setView] = useState<"grid" | "list">("grid");

  const fetchPreferences = useCallback(async () => {
    const preferences = await axios.get(
      `${import.meta.env.VITE_API_URL}/${
        import.meta.env.VITE_API_VERSION
      }/preferences`,
      { withCredentials: true }
    );

    if (preferences) {
      setView(preferences.data.notesLayout.home);
    }
  }, []);

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
    fetchPreferences();
    fetchNotes();
  }, [fetchNotes, fetchPreferences]);

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
        <ViewsOption page="home" setView={setView} />
        <Notes
          hasMore={hasMore}
          setPage={setPage}
          notes={notes}
          setNotes={setNotes}
          isValidating={isLoading}
          view={view}
        />
      </HomeLayout>
    </>
  );
}
