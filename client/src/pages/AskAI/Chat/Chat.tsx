import PagesLayout from "../../PagesLayout";
import Layout from "../Layout";
import { useParams } from "react-router";
import Logs from "@/components/ask-ai/logs";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLayout from "../MobileLayout";

export default function Chat() {
  const { id } = useParams();
  const isMobile = useIsMobile();

  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/${
      import.meta.env.VITE_API_VERSION
    }/chats/${id}`,
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <PagesLayout page="Ask AI">
      {isMobile ? (
        <MobileLayout>
          <div className="flex flex-col items-center h-[700px]">
            <div className="w-full p-4">
              <Logs chat={data.data} />
            </div>
            <div className="flex-grow" />
          </div>
        </MobileLayout>
      ) : (
        <Layout>
          <div className="flex flex-col items-center h-[700px]">
            <div className="w-full p-4">
              <Logs chat={data.data} />
            </div>
            <div className="flex-grow" />
          </div>
        </Layout>
      )}
    </PagesLayout>
  );
}
