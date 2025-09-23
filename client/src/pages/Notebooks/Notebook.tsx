import PagesLayout from "../PagesLayout";
import { useParams } from "react-router";
import type { Note, Notebook } from "@/lib/types";
import NoteField from "@/components/notes/note-field";
import { useEffect, useState } from "react";
import CreateNote from "@/components/notes/create-note";
import Notes from "@/components/notes/notes";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/skeleton";

export default function Notebook() {
  const { id } = useParams();

  return (
    <PagesLayout page={""}>
      <FetchNotes id={id!} />
    </PagesLayout>
  );
}

function FetchNotes({ id }: { id: string }) {
  const {
    data: notes,
    isLoading,
    error,
  } = useSWR(
    `${import.meta.env.VITE_API_URL}/${
      import.meta.env.VITE_API_VERSION
    }/notebooks/${id}/notes`,
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    );
  }

  if (notes.data) {
    return <DisplayNotes notes={notes.data} notebookId={id} />;
  }
}

function DisplayNotes({
  notes,
  notebookId,
}: {
  notes: Note[];
  notebookId: string;
}) {
  const [notesState, setNotesState] = useState<Note[]>(notes);
  const [openNewNoteDialog, setOpenNewNoteDialog] = useState<boolean>(false);

  useEffect(() => {
    setNotesState(notes);
  }, [notes]);

  return (
    <>
      <div>
        {/* Create new note field */}
        <div className="mb-8">
          <NotebookNoteField
            id={notebookId}
            setOpenNewNoteDialog={setOpenNewNoteDialog}
          />
        </div>
        {/* Display notes */}
        <section>
          <Notes notes={notesState} setNotes={setNotesState} />
        </section>
      </div>
      <CreateNote
        open={openNewNoteDialog}
        setOpen={setOpenNewNoteDialog}
        setNotes={setNotesState}
        notebookId={notebookId}
      />
    </>
  );
}

function NotebookNoteField({
  id,
  setOpenNewNoteDialog,
}: {
  id: string;
  setOpenNewNoteDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    data: notebook,
    isLoading,
    error,
  } = useSWR(
    `${import.meta.env.VITE_API_URL}/${
      import.meta.env.VITE_API_VERSION
    }/notebooks/${id}`,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1 items-center w-full">
        <Skeleton className="w-[300px] h-[24px] mb-2" />
        <Skeleton className="md:w-[400px] w-full h-[25px]" />
      </div>
    );
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <NoteField
      setOpenNewNoteDialog={setOpenNewNoteDialog}
      title={notebook.data.title}
    />
  );
}
