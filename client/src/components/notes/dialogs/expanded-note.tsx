import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Note } from "../../../lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { timeLapsed } from "@/lib/utils";

export default function ExpandedNote({
  note,
  isOpen,
  setIsOpen,
}: {
  note: Note;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{note.title}</DialogTitle>
          <DialogDescription>{timeLapsed(note.createdAt)}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[600px]">
          <p>{note.content}</p>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
