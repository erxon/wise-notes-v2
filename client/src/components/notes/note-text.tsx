import { Note } from "@/lib/types";
import NoteCard from "./note";

export default function NoteText({ note }: { note: Note }) {
  return (
    <NoteCard note={note}>
      <>
        {note.content && (
          <p className="text-sm break-words whitespace-pre-wrap">
            {note.content}
          </p>
        )}
      </>
    </NoteCard>
  );
}
