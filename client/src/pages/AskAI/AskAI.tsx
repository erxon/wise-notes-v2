import PagesLayout from "../PagesLayout";
import Layout from "./Layout";
import QueryPanel from "@/components/ask-ai/query-panel";

export default function AskAI() {
  return (
    <PagesLayout page="Ask AI">
      <Layout>
        <QueryPanel />
      </Layout>
    </PagesLayout>
  );
}
