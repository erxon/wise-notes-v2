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
import NotesLoading from "@/components/skeletons/notes-loading";
import NotFound from "../NotFound";

function NotebookLayout({
  children,
  notebookId,
}: {
  children: React.ReactNode;
  notebookId: string;
}) {
  const [openNewNoteDialog, setOpenNewNoteDialog] = useState<boolean>(false);
  return (
    <>
      <PagesLayout>
        <div>
          {/* Create new note field */}
          <div className="mb-8">
            <NotebookNoteField
              id={notebookId}
              setOpenNewNoteDialog={setOpenNewNoteDialog}
            />
          </div>
          {/* Display notes */}
          {children}
          <CreateNote
            open={openNewNoteDialog}
            setOpen={setOpenNewNoteDialog}
            notebookId={notebookId}
          />
        </div>
      </PagesLayout>
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
    return <NotFound />;
  }

  return (
    <NoteField
      setOpenNewNoteDialog={setOpenNewNoteDialog}
      title={notebook.title}
    />
  );
}

export default function Notebook() {
  const [notes, setNotes] = useState<Note[]>([]);
  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/${
      import.meta.env.VITE_API_VERSION
    }/notebooks/${id}/notes`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setNotes(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <NotebookLayout notebookId={id!}>
        <NotesLoading />
      </NotebookLayout>
    );
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <NotebookLayout notebookId={id!}>
      <Notes notes={notes} setNotes={setNotes} />
    </NotebookLayout>
  );
}
