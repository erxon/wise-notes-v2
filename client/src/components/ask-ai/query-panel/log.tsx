import { useEffect, useState } from "react";
import { Chat } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import { timeLapsed } from "@/lib/utils";
import { SparklesIcon, CopyIcon, FilePlus2Icon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import TooltipWrapper from "@/components/utility-components/TooltipWrapper";
import ReactMarkDown from "react-markdown";

export default function Log({ chat, avatar }: { chat: Chat; avatar: string }) {
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    if (chat.answer) {
      if (chat.answer.includes("</think>")) {
        const [think, answer] = chat.answer.split("</think>");
        setAnswer(answer);
      } else {
        setAnswer(chat.answer);
      }
    }
  }, [chat.answer]);

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
                <Button variant="outline" size={"icon"}>
                  <CopyIcon />
                </Button>
              </TooltipWrapper>
              <TooltipWrapper content="Add to notebook">
                <Button variant="outline" size={"icon"}>
                  <FilePlus2Icon />
                </Button>
              </TooltipWrapper>
              <TooltipWrapper content="Delete">
                <Button variant="outline" size={"icon"}>
                  <TrashIcon />
                </Button>
              </TooltipWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
