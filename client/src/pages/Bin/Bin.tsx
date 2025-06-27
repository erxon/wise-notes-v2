import PagesLayout from "../PagesLayout";
import useSWR, { mutate } from "swr";
import fetcher from "@/lib/fetcher";
import DeletedNote from "./DeletedNote";
import { Note, Notebook } from "@/lib/types";
import { NotebookIcon, Trash2Icon, Undo2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import PermanentDeleteNotebook from "./Dialogs/PermanentDeleteNotebook";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function Bin() {
  return (
    <PagesLayout page="Bin">
      <div>
        <div className="mb-8">
          <p className="mb-2 text-xl font-semibold">Deleted notebooks</p>
          <DeletedNotebooks />
        </div>
        <div>
          <p className="mb-2 text-xl font-semibold">Deleted notes</p>
          <DeletedNotes />
        </div>
      </div>
    </PagesLayout>
  );
}

function DeletedNotes() {
  const {
    data: notes,
    isLoading,
    error,
  } = useSWR(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/bin/`,
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (notes) {
    return (
      <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
        {notes && notes.data && notes.data.length > 0 ? (
          notes.data.map((note: Note) => (
            <DeletedNote key={note._id} note={note} />
          ))
        ) : (
          <div>You don't have notes in the bin</div>
        )}
      </div>
    );
  }
}

function DeletedNotebooks() {
  const {
    data: deletedNotebooks,
    isLoading,
    error,
  } = useSWR(
    `${import.meta.env.VITE_API_URL}/${
      import.meta.env.VITE_API_VERSION
    }/bin/notebooks`,
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
      {deletedNotebooks.data && deletedNotebooks.data.length > 0 ? (
        deletedNotebooks.data.map((notebook: Notebook) => (
          <DeletedNotebook key={notebook._id} notebook={notebook} />
        ))
      ) : (
        <div>You have no notebooks in bin</div>
      )}
    </div>
  );
}

function DeletedNotebook({ notebook }: { notebook: Notebook }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleRestore = async () => {
    setIsLoading(true);

    toast.info("Restoring notebook and its contents");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/notebooks/restore/${notebook._id}`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        mutate(
          `${import.meta.env.VITE_API_URL}/${
            import.meta.env.VITE_API_VERSION
          }/notebooks`
        );
        mutate(
          `${import.meta.env.VITE_API_URL}/${
            import.meta.env.VITE_API_VERSION
          }/bin/`
        );
        mutate(
          `${import.meta.env.VITE_API_URL}/${
            import.meta.env.VITE_API_VERSION
          }/bin/notebooks`
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

  return (
    <>
      <div className="flex rounded-md outline p-2 items-center break-inside-avoid">
        <div className="flex items-center grow">
          <NotebookIcon />
          <p>{notebook.title}</p>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isLoading}
              onClick={handleRestore}
              size={"icon"}
              variant={"ghost"}
            >
              <Undo2Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Restore</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isLoading}
              onClick={() => {
                setOpenAlert(true);
              }}
              size={"icon"}
              variant={"ghost"}
            >
              <Trash2Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Permanently delete</TooltipContent>
        </Tooltip>
      </div>

      <PermanentDeleteNotebook
        notebookId={notebook._id}
        isOpen={openAlert}
        setIsOpen={setOpenAlert}
      />
    </>
  );
}
