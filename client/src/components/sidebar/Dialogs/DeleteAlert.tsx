import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Notebook } from "@/lib/types";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

export default function DeleteAlert({
  open,
  setOpen,
  notebook,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notebook: Notebook;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleDelete = async () => {
    setIsLoading(true);

    toast.info("Moving notebook to bin");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/notebooks/${notebook._id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        mutate(
          `${import.meta.env.VITE_API_URL}/${
            import.meta.env.VITE_API_VERSION
          }/notebooks`
        );
        toast.success("Notebook moved to bin");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }

    setOpen(false);
    setIsLoading(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this notebook?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will move the notebook and its
            notes to the bin.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
