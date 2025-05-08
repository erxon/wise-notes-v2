import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Note } from "@/lib/types";

export default function NewNoteDialog({
  open,
  setOpen,
  setNotes,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) {
  const [newNote, setNewNote] = useState<Note>({
    title: "",
    content: "",
    created_at: "",
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote({ ...newNote, title: event.target.value });
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewNote({ ...newNote, content: event.target.value });
  };

  const handleAdd = () => {
    if (newNote.title === "" || newNote.content === "") return;

    const timestamp = new Date().toISOString();

    const updatedNewNote = { ...newNote, created_at: timestamp };

    setNotes((prevNotes) => [updatedNewNote, ...prevNotes]);

    setNewNote({
      title: "",
      content: "",
      created_at: "",
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Note </DialogTitle>
          <DialogDescription>Add a new note</DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex flex-col gap-2">
            <Input
              value={newNote.title}
              onChange={handleTitleChange}
              name="title"
              placeholder="Title"
            />
            <Textarea
              value={newNote.content}
              onChange={handleContentChange}
              name="content"
              placeholder="Note"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleAdd}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
