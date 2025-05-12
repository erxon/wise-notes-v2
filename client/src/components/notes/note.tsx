import type { ListItem, Note } from "@/lib/types";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import { timeLapsed } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

function DisplayListItems({ items }: { items: ListItem[] }) {
  return (
    <div>
      {items.map((item) => (
        <div className="flex gap-2 items-center" key={item.id}>
          <Checkbox />
          <p>{item.item}</p>
        </div>
      ))}
    </div>
  );
}

export default function NoteCard({ note }: { note: Note }) {
  return (
    <div className="flex flex-col gap-2 p-2 rounded-lg shadow-md break-inside-avoid mb-4">
      <div className="flex flex-col gap-2 p-2">
        <div>
          <h1 className="text-lg font-medium">{note.title}</h1>
          <p className="text-sm text-neutral-500">
            {timeLapsed(note.created_at)}
          </p>
        </div>
        {note.type === "text" ? (
          <p>
            {note.content && note.content.length > 100
              ? note.content.substring(0, 200).concat("...")
              : note.content}
          </p>
        ) : (
          <DisplayListItems items={note.list!} />
        )}
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
