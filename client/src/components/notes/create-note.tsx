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
import { Label } from "../ui/label";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { mutate } from "swr";

function TextNote({
  note,
  setNote,
}: {
  note: Note;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote((prev) => ({ ...prev, content: event.target.value }));
  };

  return (
    <Textarea
      onChange={handleChange}
      value={note.content}
      name="content"
      placeholder="Content"
      className="resize-none h-[200px] overflow-auto"
    />
  );
}

export default function CreateNote({
  open,
  setOpen,
  notebookId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notebookId?: string;
}) {
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const [note, setNote] = useState<Note>({
    _id: "",
    title: "",
    content: "",
    list: [],
    createdAt: "",
    type: "text",
  });

  const handleAdd = async () => {
    setIsAdding(true);

    toast.info("Adding new note");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/notes`,
        {
          title: note.title,
          content: note.content,
          notebookId: notebookId ? notebookId : null,
          sortKey: 0,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const date = new Date().toLocaleString();
        toast.success(response.data.message, {
          description: `New note added ${date}`,
        });

        mutate(
          `${import.meta.env.VITE_API_URL}/${
            import.meta.env.VITE_API_VERSION
          }/notes`
        );
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }

    setIsAdding(false);

    setNote({
      _id: "",
      title: "",
      content: "",
      list: [],
      createdAt: "",
      type: note.type,
    });

    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote((prev) => {
      return {
        ...prev,
        title: event.target.value,
      };
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Note </DialogTitle>
          <DialogDescription>Add a new note</DialogDescription>
        </DialogHeader>
        <Label htmlFor="title">Title</Label>
        <Input
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Type the title of your note here"
        />
        {note.type === "text" && <TextNote note={note} setNote={setNote} />}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleAdd} disabled={isAdding}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
