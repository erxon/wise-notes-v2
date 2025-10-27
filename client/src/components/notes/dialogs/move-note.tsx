import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import fetcher from "@/lib/fetcher";
import { Note, Notebook } from "@/lib/types";
import axios, { AxiosError } from "axios";
import { NotebookIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

export default function MoveNote({
  open,
  setOpen,
  noteToMove,
  setNotes,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noteToMove: Note;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <Suggestions setNotes={setNotes} setOpen={setOpen} noteToMove={noteToMove} />
    </CommandDialog>
  );
}

function Suggestions({
  setOpen,
  noteToMove,
  setNotes,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noteToMove: Note;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) {
  const {
    data: notebooks,
    isLoading,
    error,
  } = useSWR(
    `${import.meta.env.VITE_API_URL}/${
      import.meta.env.VITE_API_VERSION
    }/notebooks`,
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }
  if (notebooks.data) {
    return (
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Notebooks">
          {notebooks.data.length > 0 &&
            notebooks.data.map((notebook: Notebook) => (
              <NotebookItem
                key={notebook._id}
                notebook={notebook}
                setOpen={setOpen}
                noteToMove={noteToMove}
                setNotes={setNotes}
              />
            ))}
        </CommandGroup>
      </CommandList>
    );
  }
}

function NotebookItem({
  notebook,
  setOpen,
  noteToMove,
  setNotes,
}: {
  notebook: Notebook;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noteToMove: Note;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) {
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleMove = async () => {
    setLoading(true);

    toast.info("Moving your note");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/notes/organize`,
        {
          notes: [noteToMove._id],
          notebookId: notebook._id,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setNotes((prev) => {
          return prev.filter((note) => {
            return note._id !== noteToMove._id;
        })});
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }

    setLoading(false);
    setOpen(false);
  };

  return (
    <CommandItem disabled={isLoading} onSelect={handleMove} key={notebook._id}>
      <NotebookIcon />
      <span>{notebook.title}</span>
    </CommandItem>
  );
}
