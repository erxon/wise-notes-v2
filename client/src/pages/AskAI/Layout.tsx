import { MessageCircleQuestion } from "lucide-react";
import History from "@/components/ask-ai/history";

const history = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    id: 2,
    question: "What is gravity?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum sed turpis eget pulvinar. Vestibulum in sollicitudin risus. Sed id elementum ligula.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid lg:grid-cols-12">
      <div className="col-span-3 lg:block hidden">
        <div className="flex gap-2 items-center rounded-lg shadow-lg p-3 mb-4">
          <MessageCircleQuestion className="w-6 h-6" />
          <p>Ask AI about your notes</p>
        </div>
        <div className="flex flex-col gap-1">
          {history.map((item) => (
            <History key={item.id} history={item} />
          ))}
        </div>
      </div>{" "}
      <div className="col-span-7">{children}</div>
    </div>
  );
}
