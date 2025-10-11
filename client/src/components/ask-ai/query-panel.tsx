import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import { Chat } from "@/lib/types";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { QueryPanelLoader } from "../loaders";
import { useParams } from "react-router";
import Thinking from "./query-panel/thinking";
import QueryField from "./query-panel/queryField";
import Log from "./query-panel/log";

function DisplayLogs({
  thinking,
  avatar,
  query,
}: {
  thinking: boolean;
  avatar: string;
  query: string;
}) {
  function scrollToChat(id?: string) {
    if (id) {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  const { id } = useParams();
  // const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/chats`,
    fetcher
  );

  useEffect(() => {
    const endElement = document.getElementById("end");

    if (endElement) {
      endElement.scrollIntoView({ behavior: "smooth" });
    }

    if (data) {
      scrollToChat(id);
    }

    if (thinking) scrollToChat(undefined);
  }, [data, id, thinking]);

  if (isLoading)
    return (
      <div className="h-[700px]">
        <QueryPanelLoader />
      </div>
    );

  if (error) return <div>Something went wrong</div>;

  return (
    <>
      <ScrollArea className="h-[700px]">
        <div>
          <div className="flex flex-col gap-10">
            {data.map((chat: Chat) => (
              <div key={chat._id} id={chat._id}>
                <Log key={chat._id} chat={chat} avatar={avatar} />
              </div>
            ))}
            {thinking && <Thinking query={query} />}
            <div id="end" />
          </div>
        </div>
      </ScrollArea>
    </>
  );
}

export default function QueryPanel() {
  const [thinking, setThinking] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  return (
    <div className="px-12">
      <div className="mb-16">
        <h1 className="text-2xl font-semibold">Queries</h1>
        <Separator className="my-4" />
        <DisplayLogs avatar={avatar} thinking={thinking} query={query} />
      </div>
      <QueryField
        setThinking={setThinking}
        setAvatar={setAvatar}
        setQuery={setQuery}
      />
    </div>
  );
}
