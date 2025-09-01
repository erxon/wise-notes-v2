import PagesLayout from "./PagesLayout";
import { useCallback, useEffect, useState } from "react";
import CreateNote from "@/components/notes/create-note";
import type { Note } from "@/lib/types";
import Notes from "@/components/notes/notes";
import NoteField from "@/components/notes/note-field";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import NotesLoading from "@/components/skeletons/notes-loading";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/notes`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setNotes(response.data.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const [openNewNoteDialog, setOpenNewNoteDialog] = useState(false);

  if (error) {
    toast.error("Something went wrong fetching notes");
  }

  return (
    <>
      <PagesLayout page="Notes">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 items-center">
            <NoteField
              setOpenNewNoteDialog={setOpenNewNoteDialog}
              title="Hello, Ericson"
            />
          </div>
          {/* Notes section */}
          {error && <div>Something went wrong</div>}
          {isLoading && <NotesLoading />}
          {notes && !isLoading && (
            <section>
              {notes.length > 0 && <Notes notes={notes} setNotes={setNotes} />}
            </section>
          )}
        </div>
      </PagesLayout>
      <CreateNote
        open={openNewNoteDialog}
        setOpen={setOpenNewNoteDialog}
        setNotes={setNotes}
      />
    </>
  );
}
