import { ScrollArea } from "@/components/ui/scroll-area";
import fetcher from "@/lib/fetcher";
import HistoryItem from "./HistoryItem";
import useSWR from "swr";
import { Chat } from "@/lib/types";

export default function History({ currentChat }: { currentChat?: string }) {
  const {
    data: chats,
    isLoading,
    error,
  } = useSWR(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/chats`,
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <ScrollArea className="h-[700px]">
      {chats.data && chats.data.length > 0 ? (
        chats.data.map((chat: Chat) => (
          <HistoryItem key={chat._id} chat={chat} currentChat={currentChat} />
        ))
      ) : (
        <div>There were no chats yet</div>
      )}
    </ScrollArea>
  );
}
