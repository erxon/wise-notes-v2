import PagesLayout from "../../PagesLayout";
import Layout from "../Layout";
import { useParams } from "react-router";
import Logs from "@/components/ask-ai/logs";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLayout from "../MobileLayout";
import { Skeleton } from "@/components/ui/skeleton";

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
    return (
      <PagesLayout page="Ask AI">
        {isMobile ? (
          <MobileLayout>
            <div className="p-4">
              <Skeleton className="h-[25px] w-[300px]" />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <Skeleton className="h-[25px] w-[100px]" />
              <Skeleton className="h-[25px] w-full" />
              <Skeleton className="h-[25px] w-full" />
              <Skeleton className="h-[25px] w-[300px]" />
            </div>
          </MobileLayout>
        ) : (
          <Layout>
            <div className="p-4">
              <Skeleton className="h-[25px] w-[300px]" />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <Skeleton className="h-[25px] w-[100px]" />
              <Skeleton className="h-[25px] w-full" />
              <Skeleton className="h-[25px] w-full" />
              <Skeleton className="h-[25px] w-[500px]" />
            </div>
          </Layout>
        )}
      </PagesLayout>
    );
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
              <Logs key={data.data._id} chat={data.data} />
            </div>
            <div className="flex-grow" />
          </div>
        </MobileLayout>
      ) : (
        <Layout>
          <div className="flex flex-col items-center h-[700px]">
            <div className="w-full p-4">
              <Logs key={data.data._id} chat={data.data} />
            </div>
            <div className="flex-grow" />
          </div>
        </Layout>
      )}
    </PagesLayout>
  );
}
