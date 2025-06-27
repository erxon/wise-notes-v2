import type { Note } from "@/lib/types";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import { timeLapsed } from "@/lib/utils";
import { CornerUpRight } from "lucide-react";
import TooltipWrapper from "../utility-components/TooltipWrapper";
import { useState } from "react";
import EditNoteDialog from "./dialogs/edit-note";
import DeleteNoteDialog from "./dialogs/delete-note";
import MoveNote from "./dialogs/move-note";

export default function NoteCard({
  note,
  setNoteState,
  children,
  setNotes,
}: {
  note: Note;
  setNoteState?: React.Dispatch<React.SetStateAction<Note>>;
  children: React.ReactNode;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) {
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openMoveNoteDialog, setOpenMoveNoteDialog] = useState<boolean>(false);
  const [noteToMove, setNoteToMove] = useState<Note | null>(null);

  return (
    <>
      <div className="flex flex-col gap-2 p-2 rounded-lg shadow-md break-inside-avoid mb-4 outline light:outline-neutral-300 bg-white dark:bg-neutral-900">
        <div className="flex flex-col gap-2 p-2">
          <div>
            <h1 className="text-lg font-medium">{note.title}</h1>
            <p className="text-sm text-neutral-500">
              {timeLapsed(note.createdAt)}
            </p>
          </div>
          {children}
        </div>
        <div className="flex gap-1">
          <TooltipWrapper content="Edit note">
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                setOpenEditDialog(true);
              }}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper content="Delete note">
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                setOpenDeleteDialog(true);
              }}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper content="Move note">
            <Button
              onClick={() => {
                setNoteToMove(note);
                setOpenMoveNoteDialog(true);
              }}
              size={"icon"}
              variant={"ghost"}
            >
              <CornerUpRight />
            </Button>
          </TooltipWrapper>
        </div>
      </div>
      <EditNoteDialog
        note={note}
        setNoteState={setNoteState}
        isOpen={openEditDialog}
        setIsOpen={setOpenEditDialog}
      />
      <DeleteNoteDialog
        note={note}
        setNoteState={setNoteState}
        isOpen={openDeleteDialog}
        setIsOpen={setOpenDeleteDialog}
        setNotes={setNotes}
      />
      <MoveNote
        open={openMoveNoteDialog}
        setOpen={setOpenMoveNoteDialog}
        noteToMove={noteToMove!}
      />
    </>
  );
}
