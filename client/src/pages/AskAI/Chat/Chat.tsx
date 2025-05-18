import PagesLayout from "../../PagesLayout";
import Layout from "../Layout";
import { useParams } from "react-router";
import Field from "@/components/ask-ai/field";
import Logs from "@/components/ask-ai/logs";

const chats = [
  {
    id: 1,
    conversation: [
      {
        id: 1,
        question: "What is the capital of France?",
        answer: "Paris",
      },
      {
        id: 2,
        question: "Tell me the history of Paris",
        answer: "Can't find answers from your notes",
      },
    ],
  },
  {
    id: 2,
    conversation: [
      {
        id: 1,
        question: "What is gravity?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum sed turpis eget pulvinar. Vestibulum in sollicitudin risus. Sed id elementum ligula.",
      },
    ],
  },
];

export default function Chat() {
  const { id } = useParams();

  const chat = chats.find((item) => item.id === Number(id));

  return (
    <PagesLayout page="Ask AI">
      <Layout>
        <div className="flex flex-col items-center h-[700px]">
          <h1 className="text-sm">Ask AI</h1>
          <div className="w-full p-4">
            <Logs chat={chat} />
          </div>
          <div className="flex-grow" />
          <Field />
        </div>
      </Layout>
    </PagesLayout>
  );
}
