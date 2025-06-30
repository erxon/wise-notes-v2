import ReactMarkdown from "react-markdown";
import type { Chat } from "@/lib/types";
import remarkGfm from "remark-gfm";

export default function Logs({ chat }: { chat: Chat }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-100 dark:bg-black dark:outline rounded-full p-3 w-fit self-end">
        {chat.query}
      </div>
      <Answer answer={chat.answer} />
    </div>
  );
}

function Answer({ answer }: { answer: string }) {
  const actualAnswer = answer.split("</think>")[1];

  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{actualAnswer}</ReactMarkdown>
    </div>
  );
}
