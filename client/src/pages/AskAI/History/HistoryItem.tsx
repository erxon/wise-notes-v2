import { Button } from "@/components/ui/button";
import { Chat } from "@/lib/types";
import axios, { AxiosError } from "axios";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { mutate } from "swr";

export default function HistoryItem({
  chat,
  currentChat,
}: {
  chat: Chat;
  currentChat?: string;
}) {
  const navigate = useNavigate();
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMouseOver = () => {
    setMouseOver(true);
  };

  const handleMouseLeave = () => {
    setMouseOver(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);

    toast.info("Deleting chat");

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/chats/${chat._id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        if (currentChat && currentChat === chat._id) {
          navigate("/ask-ai");
        }

        mutate(
          `${import.meta.env.VITE_API_URL}/${
            import.meta.env.VITE_API_VERSION
          }/chats`
        );

        toast.success(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }

    setIsLoading(false);
  };

  return (
    <div
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className="flex items-center"
    >
      <Link
        to={`/ask-ai/${chat._id}`}
        className="p-2 hover:bg-secondary rounded-lg mb-1 grow"
      >
        <p className="grow">{chat.query}</p>
      </Link>
      {mouseOver && (
        <Button
          disabled={isLoading}
          onClick={handleDelete}
          size={"icon"}
          variant={"ghost"}
        >
          <Trash2Icon />
        </Button>
      )}
    </div>
  );
}
