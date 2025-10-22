import type { Note } from "@/lib/types";
import NoteText from "./note-text";
import SortableLayoutWrapper from "../utility-components/SortableLayoutWrapper";
import { useCallback, useRef, useState } from "react";
import { Spinner } from "../ui/spinner";

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
      </div>
    </>
  );
}

export default function Notes({
  notes,
  setNotes,
  setPage,
  isValidating,
  hasMore,
}: {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  isValidating: boolean;
  hasMore?: boolean;
}) {
  const observer = useRef<IntersectionObserver>(null);

  const loadMoreRef = useCallback(
    (node: HTMLDivElement) => {
      if (isValidating) return;
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((prev) => prev + 1);
          }
        },
        {
          rootMargin: "0px",
          threshold: 1,
        }
      );

      if (node) {
        observer.current.observe(node);
      }

      return () => {
        if (observer.current) {
          observer.current.disconnect();
        }
      };
    },
    [setPage, isValidating, hasMore]
  );

  return (
    <>
      <div className="md:mx-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
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
      <div className="h-10" ref={loadMoreRef}>
        {isValidating && (
          <div className="flex gap-2 items-center justify-center text-neutral-600">
            <Spinner /> Loading...
          </div>
        )}
      </div>
    </>
  );
}
