import { MessageCircleQuestion } from "lucide-react";
import History from "./History/History";
import { useParams } from "react-router";

/*

[ ] Change layout

*/

export default function Layout({ children }: { children: React.ReactNode }) {
  const { id } = useParams();

  return (
    <div className="grid lg:grid-cols-12">
      <div className="col-span-3 lg:block hidden">
        <div className="flex gap-2 items-center rounded-lg shadow-lg p-3 mb-4">
          <MessageCircleQuestion className="w-6 h-6" />
          <p>Ask AI about your notes</p>
        </div>
        <div>
          <History currentChat={id} />
        </div>
      </div>{" "}
      <div className="col-span-7">{children}</div>
    </div>
  );
}
