import { Note } from "@/lib/types";
import NoteCard from "./note";
import { useState } from "react";

export default function NoteText({
  note,
  setNotes,
}: {
  note: Note;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) {
  const [noteState, setNoteState] = useState<Note>(note);

  return (
    <NoteCard note={noteState} setNoteState={setNoteState} setNotes={setNotes}>
      <>
        {noteState.content && (
          <p className="text-sm break-words whitespace-pre-wrap">
            {noteState.content.length >= 50
              ? noteState.content.substring(0, 50) + "..."
              : noteState.content}
          </p>
        )}
      </>
    </NoteCard>
  );
}
