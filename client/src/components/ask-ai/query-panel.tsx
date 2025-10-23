import { useEffect, useRef, useState } from "react";
import { Chat } from "@/lib/types";
import { ScrollArea } from "../ui/scroll-area";
import { QueryPanelLoader } from "../loaders";
import { useParams } from "react-router";
import Thinking from "./query-panel/thinking";
import QueryField from "./query-panel/queryField";
import Log from "./query-panel/log";
import { Spinner } from "../ui/spinner";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

function DisplayLogs({
  thinking,
  avatar,
  query,
}: {
  thinking: boolean;
  avatar: string;
  query: string;
}) {
  const { id } = useParams();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);

  const scrollToChat = (id?: string) => {
    if (id) {
      const element = document.getElementById(id);

      if (!element) {
        return;
      }

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    requestAnimationFrame(() => {
      const viewport = scrollAreaRef.current?.querySelector(
        "[data-radix-scroll-area-viewport]"
      );

      if (viewport) {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior });
      }
    });
  };

  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/chats`,
    fetcher
  );

  useEffect(() => {
    if (isInitialRender.current && scrollAreaRef.current) {
      if (id) {
        const timeout = setTimeout(() => scrollToChat(id), 50);
        return () => clearTimeout(timeout);
      } else {
        scrollToBottom("auto");
      }

      isInitialRender.current = false;
    }
  }, [data, id, scrollAreaRef]);

  useEffect(() => {
    if (!data) return;
    if (data && id) {
      scrollToChat(id);
    }
  }, [data, id]);

  useEffect(() => {
    if (!data) return;
    if (data) {
      scrollToBottom("smooth");
    }
    if (data && thinking) scrollToBottom("smooth");
  }, [data, thinking]);

  if (isLoading)
    return (
      <div className="h-[calc(100vh-100px)]">
        <QueryPanelLoader />
      </div>
    );

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <ScrollArea ref={scrollAreaRef} className="h-full">
        {isLoading && <Spinner />}
        <div className="flex flex-col gap-10">
          {data?.map((chat: Chat) => (
            <div key={chat._id} id={chat._id}>
              <Log key={chat._id} chat={chat} avatar={avatar} />
            </div>
          ))}
          {thinking && <Thinking query={query} />}
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
    <div className="px-4 md:px-12 flex flex-col h-[calc(100vh-100px)]">
      <header className="p-4 border-b font-semibold text-xl">Queries</header>
      <div className="flex-1 overflow-hidden">
        <DisplayLogs avatar={avatar} thinking={thinking} query={query} />
      </div>
      <footer className="p-4 shadow-lg rounded-lg">
        <QueryField
          setThinking={setThinking}
          setAvatar={setAvatar}
          setQuery={setQuery}
        />
      </footer>
    </div>
  );
}
