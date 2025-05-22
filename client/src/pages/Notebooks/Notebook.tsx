import PagesLayout from "../PagesLayout";
import { useParams } from "react-router";
import type { Note, Notebook } from "@/lib/types";
import NoteField from "@/components/notes/note-field";
import { useState } from "react";
import CreateNote from "@/components/notes/create-note";
import { DndProvider } from "react-dnd";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { MultiBackend } from "react-dnd-multi-backend";
import Notes from "@/components/notes/notes";

const notebooks = [
  {
    id: 1,
    title: "Work",
    description: "My first notebook description",
    created_at: "2025-05-18T14:33:08.979284Z",
    updated_at: "2025-05-18T14:33:08.979284Z",
  },
] as Notebook[];

const initialNotes = [
  {
    id: 1,
    notebook: 1,
    title: "Note 1",
    content: "My first note description",
    type: "text",
    created_at: "2025-05-18T14:33:08.979284Z",
  },
  {
    id: 2,
    notebook: 1,
    title: "Note 2",
    content: "My second note description",
    type: "text",
    created_at: "2025-05-18T14:33:08.979284Z",
  },
] as Note[];

export default function Notebook() {
  const { id } = useParams();

  const [openNewNoteDialog, setOpenNewNoteDialog] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([...initialNotes]);

  const currentNotebook = notebooks.find((item) => item.id === Number(id));

  return (
    <PagesLayout page={currentNotebook?.title ? currentNotebook.title : ""}>
      <div>
        {/* Create new note field */}
        <NoteField
          setOpenNewNoteDialog={setOpenNewNoteDialog}
          title={currentNotebook?.title}
        />
        {/* Display notes */}
        <section>
          <DndProvider options={HTML5toTouch} backend={MultiBackend}>
            {notes.length > 0 && <Notes notes={notes} setNotes={setNotes} />}
          </DndProvider>
        </section>
        {/* note: notes should be draggable */}
      </div>
      <CreateNote
        open={openNewNoteDialog}
        setOpen={setOpenNewNoteDialog}
        setNotes={setNotes}
      />
    </PagesLayout>
  );
}
