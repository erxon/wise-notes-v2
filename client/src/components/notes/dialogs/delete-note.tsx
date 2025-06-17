import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Note } from "@/lib/types";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteNoteDialog({
  note,
  setNoteState,
  isOpen,
  setIsOpen,
  setNotes,
}: {
  note: Note;
  setNoteState?: React.Dispatch<React.SetStateAction<Note>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);

    toast.info("Moving note to bin");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/notes/${note._id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const deletedAt = new Date();

        toast.success(response.data.message, {
          description: deletedAt.toLocaleString(),
        });

        if (setNoteState) {
          setNoteState((prev) => {
            return { ...prev, deletedAt: deletedAt.toISOString() };
          });

          setNotes((prev) => {
            return prev.filter((item) => {
              return item._id !== note._id;
            });
          });
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message
            ? error.response?.data.message
            : error.message
        );
      }
    }

    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete note</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this note?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isLoading} onClick={handleDelete}>
            Proceed
          </Button>
          <DialogClose asChild>
            <Button disabled={isLoading} variant={"secondary"}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
