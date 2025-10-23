import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Note } from "@/lib/types";
import { Undo2, Trash2, CircleCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SetStateAction, useState } from "react";
import PermanentDelete from "./Dialogs/PermanentDelete";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { mutate } from "swr";
import { ExpandIcon } from "lucide-react";
import ExpandedNote from "./Dialogs/ExpandedNote";
import clsx from "clsx";

export default function DeletedNote({
  note,
  marked,
  setMarked,
  deleting,
  restoring,
}: {
  note: Note;
  marked: Note[];
  setMarked: React.Dispatch<SetStateAction<Note[]>>;
  deleting: boolean;
  restoring: boolean;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenPermanentDeleteDialog, setIsOpenPermanentDeleteDialog] =
    useState<boolean>(false);
  const [expandNote, setExpandNote] = useState<boolean>(false);
  const [noteToExpand, setNoteToExpand] = useState<Note | null>(null);

  const deletedAt = new Date(note.deletedAt!).toLocaleString();

  const handlePermanentDelete = () => {
    setIsOpenPermanentDeleteDialog(true);
  };

  const handleRestore = async () => {
    setIsLoading(true);

    toast.info("Restoring note");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/notes/restore/${note._id}`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        mutate(
          `${import.meta.env.VITE_API_URL}/${
            import.meta.env.VITE_API_VERSION
          }/bin/`
        );
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }

    setIsLoading(false);
  };

  const handleExpandNote = () => {
    setNoteToExpand(note);
    setExpandNote(true);
  };

  const handleMark = () => {
    if (marked.includes(note)) {
      setMarked((prev) => prev.filter((n) => n._id !== note._id));
    } else {
      setMarked((prev) => [...prev, note]);
    }
  };

  return (
    <>
      <Card className="h-[350px]">
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>Deleted {deletedAt}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            {note.content && note.content.length > 150
              ? `${note.content?.substring(0, 150)}...`
              : note.content}
          </p>
        </CardContent>
        <CardFooter className="flex items-end gap-2 h-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isLoading || deleting || restoring}
                onClick={handleRestore}
                variant={"ghost"}
                size={"sm"}
              >
                <Undo2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Restore</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isLoading || deleting || restoring}
                onClick={handlePermanentDelete}
                variant={"ghost"}
                size={"sm"}
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Permanently delete</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={deleting || restoring}
                onClick={handleExpandNote}
                variant={"ghost"}
                size={"sm"}
              >
                <ExpandIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Expand</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleMark}
                disabled={isLoading || deleting || restoring}
                variant={"ghost"}
                size={"sm"}
                className={clsx(
                  marked &&
                    marked.includes(note) &&
                    "bg-green-500 text-accent-foreground hover:bg-green-400"
                )}
              >
                <CircleCheck />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {marked.includes(note) ? <p>Unmark</p> : <p>Mark</p>}
            </TooltipContent>
          </Tooltip>
        </CardFooter>
      </Card>

      {/* Dialogs */}
      <PermanentDelete
        noteId={note._id}
        isOpen={isOpenPermanentDeleteDialog}
        setIsOpen={setIsOpenPermanentDeleteDialog}
      />
      {noteToExpand && (
        <ExpandedNote
          note={noteToExpand!}
          isOpen={expandNote}
          setOpen={setExpandNote}
        />
      )}
    </>
  );
}
