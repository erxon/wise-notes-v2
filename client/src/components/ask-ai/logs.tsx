import type { Chat } from "@/lib/types";
import ReactMarkDown from "react-markdown";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { FilePlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import removeMarkdown from "markdown-to-text";

export default function Logs({ chat }: { chat: Chat }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSavedAsNote, setIsSavedAsNote] = useState(chat.savedAsNote);

  const [think, answer] = chat.answer.split("</think>");

  const saveAsNote = async () => {
    toast.info("Saving as note");

    const note = {
      title: chat.query,
      content: removeMarkdown(answer.trim()),
      notebookId: null,
      type: "text",
      sortKey: 0,
    };

    try {
      setIsLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/notes`,
        note,
        { withCredentials: true }
      );

      await axios.put(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/chats/${chat._id}`,
        {
          savedAsNote: true,
        },
        {
          withCredentials: true,
        }
      );

      setIsSavedAsNote(true);
      toast.success("Note saved successfully");
    } catch {
      toast.error("Something went wrong");
    }

    setIsLoading(false);
  };

  return (
    <>
      <ScrollArea className="mb-8 h-[700px]">
        <p className="text-lg font-semibold">{chat.query}</p>
        <Separator className="my-2" />
        <div className="dark:bg-slate-900 rounded-lg py-4">
          <ReactMarkDown>{answer}</ReactMarkDown>
        </div>
        <Tooltip>
          <TooltipTrigger>
            <Button
              disabled={isLoading || isSavedAsNote}
              onClick={saveAsNote}
              variant={"outline"}
              size={"icon"}
            >
              <FilePlus className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isSavedAsNote ? <p>Already saved as note</p> : <p>Save as note</p>}
          </TooltipContent>
        </Tooltip>
      </ScrollArea>
    </>
  );
}
