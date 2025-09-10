import { MessageCircleQuestion, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import History from "./History/History";
import { useNavigate, useParams } from "react-router";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="grid lg:grid-cols-12">
      <div className="col-span-3 lg:block hidden">
        <div className="flex gap-2 items-center rounded-lg shadow-lg p-3 mb-4">
          <MessageCircleQuestion className="w-6 h-6" />
          <p>Ask AI about your notes</p>
        </div>
        <div>
          <Button
            onClick={() => navigate("/ask-ai")}
            variant={"outline"}
            className="mb-2"
          >
            <span>New query</span>
            <PlusIcon />
          </Button>
          <History currentChat={id} />
        </div>
      </div>{" "}
      <div className="col-span-7">{children}</div>
    </div>
  );
}
