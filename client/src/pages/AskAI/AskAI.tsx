import { Textarea } from "@/components/ui/textarea";
import PagesLayout from "../PagesLayout";
import { Button } from "@/components/ui/button";
import Layout from "./Layout";

export default function AskAI() {
  return (
    <PagesLayout page="Ask AI">
      <Layout>
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-2xl font-semibold">Ask AI</h1>
          <div className="flex flex-col gap-2 p-4 mx-2 rounded-lg shadow-lg items-start w-full lg:w-[550px]">
            <Textarea
              placeholder="Type your question here..."
              className="resize-none"
            />
            <Button size={"sm"}>Ask</Button>
          </div>
        </div>
      </Layout>
    </PagesLayout>
  );
}
