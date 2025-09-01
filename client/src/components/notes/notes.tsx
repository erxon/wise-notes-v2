import type { Note } from "@/lib/types";
import NoteText from "./note-text";
import NoteList from "./note-list";
import SortableLayoutWrapper from "../utility-components/SortableLayoutWrapper";

function DisplayNote({
  note,
  setNotes,
}: {
  note: Note;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) {
  return (
    <>
      <div>
        {note.type === "text" && <NoteText setNotes={setNotes} note={note} />}
        {note.type === "list" && <NoteList note={note} />}{" "}
      </div>
    </>
  );
}

export default function Notes({
  notes,
  setNotes,
}: {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      <SortableLayoutWrapper notes={notes} setNotes={setNotes}>
        {notes.map((note) => {
          if (!note.deletedAt) {
            return (
              <DisplayNote key={note._id} note={note} setNotes={setNotes} />
            );
          }
        })}
      </SortableLayoutWrapper>
    </div>
  );
}
