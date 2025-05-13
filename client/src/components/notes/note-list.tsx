import { ListItem, Note } from "@/lib/types";
import { Checkbox } from "../ui/checkbox";
import NoteCard from "./note";

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

export default function NoteList({ note }: { note: Note }) {
  return (
    <NoteCard note={note}>
      {note.list ? <DisplayListItems items={note.list} /> : <p>No items</p>}
    </NoteCard>
  );
}
