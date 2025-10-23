import type { Note } from "@/lib/types";
import { Button } from "../ui/button";
import { ExpandIcon, Pencil, Trash } from "lucide-react";
import { timeLapsed } from "@/lib/utils";
import { CornerUpRight } from "lucide-react";
import TooltipWrapper from "../utility-components/TooltipWrapper";
import { useState } from "react";
import EditNoteDialog from "./dialogs/edit-note";
import DeleteNoteDialog from "./dialogs/delete-note";
import MoveNote from "./dialogs/move-note";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { GripVertical } from "lucide-react";
import NotebookName from "../notebooks/notebook-name";
import ExpandedNote from "./dialogs/expanded-note";
import NoteMenu from "./note-menu";
import { useIsMobile } from "@/hooks/use-mobile";

export default function NoteCard({
  note,
  setNoteState,
  children,
  setNotes,
  view,
}: {
  note: Note;
  setNoteState?: React.Dispatch<React.SetStateAction<Note>>;
  children: React.ReactNode;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  view?: "grid" | "list";
}) {
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openMoveNoteDialog, setOpenMoveNoteDialog] = useState<boolean>(false);
  const [openExpandedNote, setOpenExpandedNote] = useState<boolean>(false);
  const [noteToMove, setNoteToMove] = useState<Note | null>(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: note._id });
  const { isMobile } = useIsMobile();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: transform ? 999 : 0,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={clsx(
          isDragging ? "z-10 relative" : "z-0",
          view === "grid" &&
            "flex flex-col gap-2 p-2 rounded-lg shadow-md break-inside-avoid mb-4 outline light:outline-neutral-300 bg-white dark:bg-neutral-900 h-[350px] md:[450px] lg:h-[400px]",
          view === "list" &&
            "flex flex-col gap-2 p-2 rounded-lg shadow-md break-inside-avoid mb-4 outline light:outline-neutral-300 bg-white dark:bg-neutral-900"
        )}
      >
        {view === "grid" && (
          <div className="flex">
            <div {...listeners} className="w-fit">
              <GripVertical className="w-4 h-4" />
            </div>
            <div className="ml-auto">
              <NoteMenu note={note} />
            </div>
          </div>
        )}
        <div
          className={clsx(
            view === "grid" && "flex flex-col gap-2 p-2 grow-1",
            view === "list" && "flex flex-row gap-2 p-2"
          )}
        >
          {view === "list" && (
            <div {...listeners} className="w-fit">
              <GripVertical className="w-4 h-4" />
            </div>
          )}
          <div>
            <h1
              className={clsx(
                view === "grid" && "text-lg font-medium",
                view === "list" && "text-sm font-medium md:text-md"
              )}
            >
              {view === "grid"
                ? note.title
                : note.title.length > 20
                ? isMobile
                  ? note.title.slice(0, 10) + "..."
                  : note.title.slice(0, 20) + "..."
                : note.title}
            </h1>
            <p className="text-sm text-neutral-500">
              {timeLapsed(note.createdAt)}
            </p>
            {note.notebookId && <NotebookName id={note.notebookId} />}
          </div>
          {children}
          {view === "list" && (
            <div className="ml-auto">
              <NoteMenu note={note} />
            </div>
          )}
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
          <TooltipWrapper content="View full note">
            <Button
              onClick={() => {
                setOpenExpandedNote(true);
              }}
              size={"icon"}
              variant={"ghost"}
            >
              <ExpandIcon />
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
      <ExpandedNote
        note={note}
        isOpen={openExpandedNote}
        setIsOpen={setOpenExpandedNote}
      />
    </>
  );
}
