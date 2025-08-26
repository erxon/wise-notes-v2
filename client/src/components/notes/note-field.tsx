import { Input } from "../ui/input";

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
        <h1 className="text-2xl font-semibold mb-4">{title}</h1>
        <Input
          role="button"
          readOnly
          onClick={() => setOpenNewNoteDialog(true)}
          placeholder="Note"
          className="md:w-[400px] w-full"
        />
        {/* 
        Add image or list

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
        */}
      </div>
    </>
  );
}
