import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Note } from "@/lib/types";
import { Undo2, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import PermanentDelete from "./Dialogs/PermanentDelete";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { mutate } from "swr";

export default function DeletedNote({ note }: { note: Note }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenPermanentDeleteDialog, setIsOpenPermanentDeleteDialog] =
    useState<boolean>(false);
  const deletedAt = new Date(note.deletedAt!).toLocaleString();

  const handlePermanentDelete = () => {
    setIsOpenPermanentDeleteDialog(true);
  };

  const handleRestore = async () => {
    setIsLoading(true);

    toast.info("Restoring note");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/notes/restore/${note._id}`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        mutate(
          `${import.meta.env.VITE_API_URL}/${
            import.meta.env.VITE_API_VERSION
          }/bin/`
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
      <Card className="break-inside-avoid">
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>Deleted {deletedAt}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{note.content}</p>
        </CardContent>
        <CardFooter>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isLoading}
                onClick={handleRestore}
                variant={"ghost"}
                size={"sm"}
              >
                <Undo2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Restore</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isLoading}
                onClick={handlePermanentDelete}
                variant={"ghost"}
                size={"sm"}
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Permanently delete</p>
            </TooltipContent>
          </Tooltip>
        </CardFooter>
      </Card>

      {/* Dialogs */}
      <PermanentDelete
        noteId={note._id}
        isOpen={isOpenPermanentDeleteDialog}
        setIsOpen={setIsOpenPermanentDeleteDialog}
      />
    </>
  );
}
