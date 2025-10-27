import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { useNavigate } from "react-router";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import { AxiosError } from "axios";

interface BackLink {
  link: string;
  pageName: string;
}

export default function PagesLayout({
  children,
  page,
  backLinks,
}: {
  children: ReactNode;
  page?: string;
  backLinks?: BackLink[];
}) {
  const navigate = useNavigate();
  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/users`,
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        navigate("/sign-in");
      }
    }
    return <div>Something went wrong</div>;
  }

  if (!data) navigate("/sign-in");

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="h-screen">
          <SiteHeader backLinks={backLinks} currentPage={page} user={data} />
          <main className="p-4">
            
            {children}
            <Toaster richColors />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
