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

/* 
TODO 

[] add option to user to turn a note into list items or text
[] add image upload to new note dialog
[] add tags to new note dialog 
[] add color picker to new note dialog

*/

interface ListItemType {
  id: number;
  item: string;
}

function NewNoteActions({
  contentType,
  setContentType,
}: {
  contentType: string;
  setContentType: React.Dispatch<React.SetStateAction<"text" | "list">>;
}) {
  const TurnToList = (
    <>
      <TooltipWrapper tooltipText="Turn into list">
        <Button
          onClick={() => {
            setContentType("list");
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
            setContentType("text");
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
      {contentType === "text" ? TurnToList : TurnToText}
      <TooltipWrapper tooltipText="Add image">
        <Button variant={"outline"} size={"icon"}>
          <ImageIcon />
        </Button>
      </TooltipWrapper>
    </div>
  );
}

function ListItemInput({
  setItems,
  className,
}: {
  setItems: React.Dispatch<React.SetStateAction<ListItemType[]>>;
  className?: string;
}) {
  const [inputItem, setInputItem] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputItem(event.target.value);
  };

  const handleClick = () => {
    setItems((prev) => {
      return [...prev, { id: prev.length + 1, item: inputItem }];
    });
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
  item,
  setItems,
}: {
  item: ListItemType;
  setItems: React.Dispatch<React.SetStateAction<ListItemType[]>>;
}) {
  const handleRemove = (id: number) => {
    setItems((prev) => {
      return [...prev].filter((item) => item.id !== id);
    });
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

export default function NewNoteDialog({
  open,
  setOpen,
  setNotes,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) {
  const [contentType, setContentType] = useState<"text" | "list">("text");
  const [newNote, setNewNote] = useState<Note>({
    title: "",
    content: "",
    created_at: "",
    type: "text",
  });
  const [items, setItems] = useState<ListItemType[]>([]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote({ ...newNote, title: event.target.value });
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewNote({ ...newNote, content: event.target.value, type: contentType });
  };

  const submitContentTypeText = () => {
    const timestamp = new Date().toISOString();

    const updatedNewNote = { ...newNote, created_at: timestamp };

    setNotes((prevNotes) => [updatedNewNote, ...prevNotes]);

    setNewNote({
      title: "",
      content: "",
      created_at: "",
      type: contentType,
    });
  };

  const submitContentTypeList = () => {
    const timestamp = new Date().toISOString();

    const updatedNewNote = {
      ...newNote,
      created_at: timestamp,
      list: items,
      type: contentType,
    };

    setNotes((prevNotes) => [updatedNewNote, ...prevNotes]);

    setNewNote({
      title: "",
      content: "",
      created_at: "",
      list: [],
      type: contentType,
    });

    setItems([]);
  };

  const handleAdd = () => {
    if (contentType === "text") {
      if (newNote.title === "" || newNote.content === "") {
        return;
      }

      submitContentTypeText();
      setOpen(false);
    }

    if (contentType === "list") {
      submitContentTypeList();
      setOpen(false);
    }
  };

  const Text = (
    <>
      <div className="flex flex-col gap-2">
        <Input
          value={newNote.title}
          onChange={handleTitleChange}
          name="title"
          placeholder="Type the note title here..."
        />
        {/* This section will display a Textarea or a List */}
        <Textarea
          value={newNote.content}
          onChange={handleContentChange}
          name="content"
          placeholder="Note"
        />
        {/* Add buttons to convert the notes to a list or to add image*/}
        <NewNoteActions
          contentType={contentType}
          setContentType={setContentType}
        />
      </div>
    </>
  );

  const List = (
    <>
      <div>
        <div className="mb-4">
          <Input
            value={newNote.title}
            onChange={handleTitleChange}
            name="title"
            placeholder="Type the note title here..."
          />
          {items &&
            items.map((item, index) => {
              return <ListItem key={index} item={item} setItems={setItems} />;
            })}
        </div>
        <ListItemInput setItems={setItems} className="mb-4" />
        <NewNoteActions
          contentType={contentType}
          setContentType={setContentType}
        />
      </div>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Note </DialogTitle>
          <DialogDescription>Add a new note</DialogDescription>
        </DialogHeader>
        <div>{contentType === "text" && Text}</div>
        <div>{contentType === "list" && List}</div>
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
