import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Note } from "@/lib/types";
import { EllipsisIcon } from "lucide-react";

export default function NoteMenu({ note }: { note: Note }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Delete</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        {note.notebookId && (
          <DropdownMenuItem>Remove from this notebook</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
