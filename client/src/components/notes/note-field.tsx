import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ImageIcon, ListIcon } from "lucide-react";

export default function NoteField({
  title,
  setOpenNewNoteDialog,
}: {
  title?: string;
  setOpenNewNoteDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="flex flex-col gap-1 items-center w-full">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <Input
          role="button"
          readOnly
          onClick={() => setOpenNewNoteDialog(true)}
          placeholder="Note"
          className="md:w-[300px] w-full"
        />
        <div className="flex gap-1">
          <Button variant={"ghost"} size={"sm"}>
            <ImageIcon className="w-6 h-6" />
            Image
          </Button>
          <Button variant={"ghost"} size={"sm"}>
            <ListIcon className="w-6 h-6" />
            List
          </Button>
        </div>
      </div>
    </>
  );
}
