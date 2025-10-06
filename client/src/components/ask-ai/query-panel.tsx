import fetcher from "@/lib/fetcher";
import useSWR, { mutate } from "swr";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { use, useEffect, useRef, useState } from "react";
import { Chat } from "@/lib/types";
import {
  SparklesIcon,
  CopyIcon,
  FilePlus2Icon,
  RefreshCcwIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";
import TooltipWrapper from "../utility-components/TooltipWrapper";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import ReactMarkDown from "react-markdown";
import { Skeleton } from "../ui/skeleton";
import axios from "axios";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useNavigate, useParams } from "react-router";
import { timeLapsed } from "@/lib/utils";

function Loading() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex gap-4 mb-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-[150px]" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[100px]" />
          <Skeleton className="h-6 w-[300px]" />
        </div>
      </div>
      <div>
        <div className="flex gap-4 mb-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-[150px]" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[100px]" />
          <Skeleton className="h-6 w-[300px]" />
        </div>
      </div>
      <div>
        <div className="flex gap-4 mb-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-[150px]" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[100px]" />
          <Skeleton className="h-6 w-[300px]" />
        </div>
      </div>
    </div>
  );
}

function Thinking({ query }: { query: string }) {
  return (
    <div>
      <p className="text-neutral-700">{query}</p>
      <div className="flex items-center gap-8">
        <div className="flex rounded-full h-fit p-1">
          <SparklesIcon className="w-6 h-6 mx-auto self-center" />
        </div>
        <div className="flex gap-2 items-center">
          <Spinner />
          <p className="text-neutral-700">Thinking</p>
        </div>
      </div>
    </div>
  );
}

function QueryField({
  setThinking,
  setAvatar,
  setQuery,
}: {
  setThinking: React.Dispatch<React.SetStateAction<boolean>>;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const navigate = useNavigate();
  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/users`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setAvatar(data.profilePicture);
    }
  }, [data, setAvatar]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.currentTarget.query.value === "") return;

    const formData = new FormData(event.currentTarget);
    const query = formData.get("query") as string;

    event.currentTarget.reset();
    setThinking(true);
    setQuery(query);
    navigate(`/ask-ai`);
    try {
      toast.info("Asking AI");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/rag/query`,
        {
          query: query,
        },
        {
          withCredentials: true,
        }
      );

      mutate(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/chats`
      );
    } catch {
      toast.error("Something went wrong");
    }
    setThinking(false);
  };

  return (
    <>
      <div className="flex gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={data.profilePicture} />
          <AvatarFallback>
            {data.firstName.substring(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
          <Textarea
            name="query"
            placeholder="Ask anything"
            className="resize-none w-full"
          />
          <Button type="submit" className="self-end">
            Ask
          </Button>
        </form>
      </div>
    </>
  );
}

function Log({ chat, avatar }: { chat: Chat; avatar: string }) {
  const [thinking, answer] = chat.answer.split("</think>");

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
              <TooltipWrapper content="Regenerate">
                <Button variant="outline" size={"icon"}>
                  <RefreshCcwIcon />
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

function DisplayLogs({
  thinking,
  avatar,
  query,
}: {
  thinking: boolean;
  avatar: string;
  query: string;
}) {
  function scrollToChat(id: string) {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const { id } = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/chats`,
    fetcher
  );

  useEffect(() => {
    if (data || thinking) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    if (id) {
      if (thinking) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        scrollToChat(id);
      }
    }
  }, [data, thinking, id]);

  if (isLoading)
    return (
      <div className="h-[700px]">
        <Loading />
      </div>
    );
  if (error) return <div>Something went wrong</div>;

  return (
    <>
      <ScrollArea className="h-[700px]">
        <div className="flex flex-col gap-10">
          {data.map((chat: Chat) => (
            <div key={chat._id} id={chat._id} ref={targetRef}>
              <Log key={chat._id} chat={chat} avatar={avatar} />
            </div>
          ))}
          {thinking && <Thinking query={query} />}
          <div ref={messagesEndRef} />
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
