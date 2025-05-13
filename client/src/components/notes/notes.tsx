import type { Note } from "@/lib/types";
import NoteText from "./note-text";
import NoteList from "./note-list";

export default function Notes({ notes }: { notes: Note[] }) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
      {notes.map((note, index) => (
        <div key={index}>
          {note.type === "text" && <NoteText note={note} />}
          {note.type === "list" && <NoteList note={note} />}{" "}
        </div>
      ))}
    </div>
  );
}
