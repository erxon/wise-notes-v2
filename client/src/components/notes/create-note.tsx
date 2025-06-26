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
import { ImageIcon, ListChecks, Pencil, Plus, Text, Trash } from "lucide-react";
import TooltipWrapper from "./tooltip";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

/* 
TODO 

[✔️] add option to user to turn a note into list items or text
[] add image upload to new note dialog
[] add tags to new note dialog 
[] add color picker to new note dialog

*/

interface ListItemType {
  id: number;
  item: string;
}

function Actions({
  type,
  setNote,
}: {
  type: "list" | "text";
  setNote: React.Dispatch<React.SetStateAction<Note>>;
}) {
  const TurnToList = (
    <>
      <TooltipWrapper tooltipText="Turn into list">
        <Button
          onClick={() => {
            setNote((prev) => {
              return {
                ...prev,
                type: "list",
              };
            });
          }}
          variant={"outline"}
          size={"icon"}
        >
          <ListChecks />
        </Button>
      </TooltipWrapper>
    </>
  );
  const TurnToText = (
    <>
      <TooltipWrapper tooltipText="Turn into text">
        <Button
          onClick={() => {
            setNote((prev) => {
              return {
                ...prev,
                type: "text",
              };
            });
          }}
          variant={"outline"}
          size={"icon"}
        >
          <Text />
        </Button>
      </TooltipWrapper>
    </>
  );

  return (
    <div className="flex gap-1">
      {type === "text" ? TurnToList : TurnToText}
      <TooltipWrapper tooltipText="Add image">
        <Button variant={"outline"} size={"icon"}>
          <ImageIcon />
        </Button>
      </TooltipWrapper>
    </div>
  );
}

function ListItemInput({
  note,
  setNote,
  className,
}: {
  note: Note;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
  className?: string;
}) {
  const [inputItem, setInputItem] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputItem(event.target.value);
  };

  const handleClick = () => {
    const updateNote = {
      ...note,
      list: [
        ...note.list!,
        {
          id: note.list!.length + 1,
          item: inputItem,
        },
      ],
    };

    setNote(updateNote);
    setInputItem("");
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <Input
        onChange={handleChange}
        value={inputItem}
        name="item"
        placeholder="New item"
      />
      <Button onClick={handleClick} size={"icon"} variant={"secondary"}>
        <Plus />
      </Button>
    </div>
  );
}

function ListItem({
  note,
  item,
  setNote,
}: {
  note: Note;
  item: ListItemType;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
}) {
  const handleRemove = (id: number) => {
    const updateNote = {
      ...note,
      list: note.list!.filter((item) => item.id !== id),
    };
    setNote(updateNote);
  };

  return (
    <div className="flex gap-2 items-center">
      <Checkbox />
      <span>{item.item}</span>
      <div className="flex gap-2 ml-auto">
        <Button variant={"ghost"} size={"icon"}>
          <Pencil className="w-4 h-4 text-neutral-600" />
        </Button>
        <Button
          onClick={() => handleRemove(item.id)}
          variant={"ghost"}
          size={"icon"}
        >
          <Trash className="w-4 h-4 text-neutral-600" />
        </Button>
      </div>
    </div>
  );
}

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
    />
  );
}

function ListNote({
  note,
  setNote,
}: {
  note: Note;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
}) {
  return (
    <div>
      <div className="mb-4">
        {note.list &&
          note.list.map((item, index) => {
            return (
              <ListItem key={index} note={note} item={item} setNote={setNote} />
            );
          })}
      </div>
      <ListItemInput note={note} setNote={setNote} className="mb-4" />
    </div>
  );
}

export default function CreateNote({
  open,
  setOpen,
  setNotes,
  notebookId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
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
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        const date = new Date().toLocaleString();
        toast.success(response.data.message, {
          description: `New note added ${date}`,
        });

        setNotes((prevNotes) => [
          { ...note, id: response.data.data.id },
          ...prevNotes,
        ]);
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
        {note.type === "list" && <ListNote note={note} setNote={setNote} />}
        <Actions type={note.type} setNote={setNote} />
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
