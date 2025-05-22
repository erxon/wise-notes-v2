import { useEffect } from "react";
import { useNavigate } from "react-router";
import PagesLayout from "./PagesLayout";
import { useState } from "react";
import CreateNote from "@/components/notes/create-note";
import type { Note } from "@/lib/types";
import Notes from "@/components/notes/notes";
import { DndProvider } from "react-dnd";
import { MultiBackend } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import NoteField from "@/components/notes/note-field";

export default function Home() {
  const [openNewNoteDialog, setOpenNewNoteDialog] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      navigate("/auth/signin");
    }
  }, [user, navigate]);

  return (
    <>
      <PagesLayout page="Quick Notes">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 items-center">
            <NoteField
              setOpenNewNoteDialog={setOpenNewNoteDialog}
              title="Hello, Ericson"
            />
          </div>
          {/* Notes section */}
          <section>
            <DndProvider options={HTML5toTouch} backend={MultiBackend}>
              {notes.length > 0 && <Notes notes={notes} setNotes={setNotes} />}
            </DndProvider>
          </section>
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
