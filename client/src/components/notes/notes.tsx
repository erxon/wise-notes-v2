import type { Note } from "@/lib/types";
import NoteCard from "./note";

export default function Notes({ notes }: { notes: Note[] }) {
  console.log(notes);
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
      {notes.map((note, index) => (
        <NoteCard key={index} note={note} />
      ))}
    </div>
  );
}
