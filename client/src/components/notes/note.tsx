import type { Note } from "@/lib/types";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import { timeLapsed } from "@/lib/utils";

export default function NoteCard({
  note,
  children,
}: {
  note: Note;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 p-2 rounded-lg shadow-md break-inside-avoid mb-4 outline light:outline-neutral-300">
      <div className="flex flex-col gap-2 p-2">
        <div>
          <h1 className="text-lg font-medium">{note.title}</h1>
          <p className="text-sm text-neutral-500">
            {timeLapsed(note.created_at)}
          </p>
        </div>
        {children}
      </div>
      <div className="flex gap-1">
        <Button size={"icon"} variant={"ghost"}>
          <Pencil className="w-4 h-4" />
        </Button>
        <Button size={"icon"} variant={"ghost"}>
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
