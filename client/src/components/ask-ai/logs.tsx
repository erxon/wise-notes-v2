import type { Chat } from "@/lib/types";
import ReactMarkDown from "react-markdown";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

export default function Logs({ chat }: { chat: Chat }) {
  const [think, answer] = chat.answer.split("</think>");

  return (
    <>
      <ScrollArea className="mb-8 h-[700px]">
        <p className="font-semibold p-2 bg-sky-300 dark:bg-sky-700 w-fit rounded-full mb-2">
          {chat.query}
        </p>
        <Separator className="my-2" />
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <ReactMarkDown>{answer}</ReactMarkDown>
        </div>
      </ScrollArea>
    </>
  );
}
