import { Note } from "@/lib/types";
import NoteCard from "./note-card";
import { useState } from "react";

export default function NoteText({
  note,
  setNotes,
  view,
}: {
  note: Note;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  view: "grid" | "list";
}) {
  const [noteState, setNoteState] = useState<Note>(note);

  return (
    <NoteCard
      view={view}
      note={noteState}
      setNoteState={setNoteState}
      setNotes={setNotes}
    >
      <>
        {view === "grid" && noteState.content && (
          <p className="text-sm break-words whitespace-pre-wrap">
            {noteState.content.length >= 50
              ? noteState.content.substring(0, 100) + "..."
              : noteState.content}
          </p>
        )}
      </>
    </NoteCard>
  );
}
