import { useEffect } from "react";
import { useNavigate } from "react-router";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { mutate } from "swr";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function QueryField({
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
