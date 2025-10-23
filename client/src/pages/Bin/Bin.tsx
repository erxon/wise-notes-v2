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
import { Spinner } from "@/components/ui/spinner";
import BulkDeleteDialog from "./Dialogs/BulkDeleteDialog";

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

  const [marked, setMarked] = useState<Note[]>([]);
  const [deleting, setIsDeleting] = useState<boolean>(false);
  const [restoring, setIsRestoring] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  const handleDeleteAll = async () => {
    setIsDeleting(true);
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/notes/delete`,
        {
          withCredentials: true,
          data: {
            toDelete: marked.map((note) => note._id),
          },
        }
      );

      if (result.status === 200)
        mutate(
          `${import.meta.env.VITE_API_URL}/${
            import.meta.env.VITE_API_VERSION
          }/bin/`
        );

      toast.success(result.data.message);
      
      setMarked([]);
    } catch {
      toast.error("Something went wrong");
    }
    setIsDeleting(false);
  };

  const handleRestoreAll = async () => {
    setIsRestoring(true);
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/notes/restore-all`,
        {
            toRestore: marked.map((note) => note._id),
        },
        {withCredentials: true}
      );

      if (result.status === 200)
        mutate(
          `${import.meta.env.VITE_API_URL}/${
            import.meta.env.VITE_API_VERSION
          }/bin/`
        );

      toast.success(result.data.message);
      setMarked([]);
    } catch {
      toast.error("Something went wrong");
    }
    setIsRestoring(false)
  };

  if (notes) {
    return (
      <>
        <div className="h-12 my-4 flex gap-4 items-center">
          <p className="text-neutral-500">
            You have {notes.data ? notes.data.length : 0} notes in the bin
          </p>
          {marked && marked.length > 0 && (
            <div className="flex gap-2">
              <Button
                disabled={deleting || restoring}
                onClick={() => setOpenDeleteDialog(true)}
                variant="destructive"
                size={"sm"}
              >
                <Trash2Icon className="mr-2 h-4 w-4" />
                Delete all {`(${marked.length})`}
              </Button>
              <Button
                disabled={restoring || deleting}
                onClick={handleRestoreAll}
                variant={"outline"}
                size={"sm"}
              >
                <Undo2Icon className="mr-2 h-4 w-4" />
                Restore all {`(${marked.length})`}
              </Button>
            </div>
          )}
          {deleting || restoring && (
              <div className="text-neutral-500 flex items-center gap-2">
                <Spinner />
                <p>
                  {deleting && "Deleting..."}
                  {restoring && "Restoring..."}
                </p>
              </div>
            )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {notes &&
            notes.data &&
            notes.data.map((note: Note) => (
              <DeletedNote
                setMarked={setMarked}
                marked={marked}
                key={note._id}
                note={note}
                deleting={deleting}
                restoring={restoring}
              />
            ))}
        </div>
        <BulkDeleteDialog
          isOpen={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          onDeleteAll={handleDeleteAll}
        />
      </>
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
        <div className="text-neutral-500">You have no notebooks in bin</div>
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
