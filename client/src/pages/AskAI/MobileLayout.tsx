import { Button } from "@/components/ui/button";
import { HistoryIcon, MessageCircleQuestion, PlusIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import History from "./History/History";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"}>
            History
            <HistoryIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <QueryAndHistory />
        </SheetContent>
      </Sheet>
      <Button
        onClick={() => navigate("/ask-ai")}
        variant={"outline"}
        className="ml-2"
      >
        <span>New query</span>
        <PlusIcon />
      </Button>
      <div className="mt-4">{children}</div>
    </>
  );
}

function QueryAndHistory() {
  const { id } = useParams();

  return (
    <div className="px-4">
      <div className="flex gap-2 items-center rounded-lg p-3 mb-4">
        <MessageCircleQuestion className="w-6 h-6" />
        <p>Ask AI about your notes</p>
      </div>
      <History currentChat={id} />
    </div>
  );
}
