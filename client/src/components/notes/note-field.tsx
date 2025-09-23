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
      </div>
    </>
  );
}
