import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HistoryIcon } from "lucide-react";
import { MessageCircleQuestion } from "lucide-react";
import History from "./History";
import { useParams } from "react-router";

export default function HistorySheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          History
          <HistoryIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>History</SheetTitle>
        </SheetHeader>
        <QueryAndHistory />
      </SheetContent>
    </Sheet>
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
