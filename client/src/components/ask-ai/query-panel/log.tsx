import { useEffect, useState } from "react";
import { Chat } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import { timeLapsed } from "@/lib/utils";
import { SparklesIcon, CopyIcon, FilePlus2Icon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import TooltipWrapper from "@/components/utility-components/TooltipWrapper";
import ReactMarkDown from "react-markdown";
import removeMarkdown from "markdown-to-text";
import { toast } from "sonner";
import axios from "axios";
import { mutate } from "swr";
import { Spinner } from "@/components/ui/spinner";

export default function Log({ chat, avatar }: { chat: Chat; avatar: string }) {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [deleting, setIsDeleting] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [savedAsNote, setSavedAsNote] = useState<boolean>(
    chat.savedAsNote ? chat.savedAsNote : false
  );

  useEffect(() => {
    if (chat.answer) {
      if (chat.answer.includes("</think>")) {
        const [, answer] = chat.answer.split("</think>");
        setAnswer(answer);
      } else {
        setAnswer(chat.answer);
      }
    }
  }, [chat.answer]);

  const reformatText = (markdownText: string) => {
    const plaintext = removeMarkdown(markdownText);
    const trimmed = plaintext.trim();

    return trimmed;
  };

  const handleCopy = async () => {
    const plaintext = reformatText(answer);

    try {
      await navigator.clipboard.writeText(plaintext);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const addAnswerToNote = async () => {
    const plaintext = reformatText(answer);
    setIsLoading(true);
    toast("Saving note, please wait.");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/notes`,
        {
          title: chat.query,
          content: plaintext,
          type: "text",
          notebookId: null,
        },
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
      setSavedAsNote(true);
      toast.success("Note successfully saved.");
    } catch {
      toast.error("Something went wrong, please try again later");
    }

    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/chats/${chat._id}`,
        { withCredentials: true }
      );

      mutate(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/chats`
      );

      toast.success("Query successfully deleted");
    } catch {
      toast.error("Something went wrong");
    }
    setIsDeleting(false);
  };

  return (
    <div id={chat._id}>
      {/* Question */}
      <div className="flex items-end gap-2 mb-10">
        <Avatar className="w-10 h-10">
          <AvatarImage src={avatar} />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm text-neutral-500 pl-2 mb-1">
            You, {timeLapsed(chat.createdAt)}
          </p>
          <p className="px-4 py-2 w-fit bg-zinc-700 text-white rounded-lg">
            {chat.query}
          </p>
        </div>
      </div>
      {/* Answer */}
      <div>
        <div className="flex gap-8">
          <div className="flex rounded-full h-fit p-1">
            <SparklesIcon className="w-6 h-6 mx-auto self-center" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="mb-2">
              {/* LLM Answer */}
              <div>
                <ReactMarkDown>{answer}</ReactMarkDown>
              </div>
            </div>
            <div className="flex gap-2">
              <TooltipWrapper content="Copy">
                <Button onClick={handleCopy} variant="outline" size={"icon"}>
                  <CopyIcon />
                </Button>
              </TooltipWrapper>
              <TooltipWrapper content="Add to notes">
                <Button
                  onClick={addAnswerToNote}
                  variant="outline"
                  size={"icon"}
                  disabled={loading || savedAsNote}
                >
                  {!loading ? <FilePlus2Icon /> : <Spinner />}
                </Button>
              </TooltipWrapper>
              <TooltipWrapper content="Delete">
                <Button
                  onClick={handleDelete}
                  disabled={deleting}
                  variant="outline"
                  size={"icon"}
                >
                  {!deleting ? <TrashIcon /> : <Spinner />}
                </Button>
              </TooltipWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
