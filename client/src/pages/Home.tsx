import { useEffect } from "react";
import { useNavigate } from "react-router";
import PagesLayout from "./PagesLayout";
import { Input } from "@/components/ui/input";
import { ImageIcon, ListIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateNote from "@/components/notes/create-note";
import type { Note } from "@/lib/types";
import Notes from "@/components/notes/notes";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  const [openNewNoteDialog, setOpenNewNoteDialog] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      navigate("/auth/signin");
    }
  }, [user, navigate]);

  console.log(notes);

  return (
    <>
      <PagesLayout page="Quick Notes">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-2xl font-semibold">Hello, Ericson</h1>
            <div className="flex flex-col gap-1 items-center w-full">
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
          </div>
          {/* Notes section */}
          <section>
            <DndProvider backend={HTML5Backend}>
              {notes.length > 0 && <Notes notes={notes} setNotes={setNotes} />}
            </DndProvider>
          </section>
        </div>
      </PagesLayout>
      <CreateNote
        open={openNewNoteDialog}
        setOpen={setOpenNewNoteDialog}
        setNotes={setNotes}
      />
    </>
  );
}
