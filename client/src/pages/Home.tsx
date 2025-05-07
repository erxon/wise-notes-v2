import { useEffect } from "react";
import { useNavigate } from "react-router";
import PagesLayout from "./PagesLayout";
import { Input } from "@/components/ui/input";
import { ImageIcon, ListIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import NewNoteDialog from "@/components/notes/new-note-dialog";
import type { Note } from "@/lib/types";

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

  return (
    <>
      <PagesLayout currentPage="Quick Notes">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-semibold">Hello, Ericson</h1>
          <div className="flex flex-col gap-1 items-center w-full">
            <Input
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
      </PagesLayout>
      <NewNoteDialog open={openNewNoteDialog} setOpen={setOpenNewNoteDialog} />
    </>
  );
}
