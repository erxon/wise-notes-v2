import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { useNavigate } from "react-router";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";

interface BackLink {
  link: string;
  pageName: string;
}

export default function PagesLayout({
  children,
  page,
  backLinks,
}: {
  children: React.ReactNode;
  page?: string;
  backLinks?: BackLink[];
}) {
  const { isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/users`,
    fetcher
  );
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    navigate("/sign-in");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-screen">
        <SiteHeader backLinks={backLinks} currentPage={page} />
        <main className="p-4">
          {children}
          <Toaster richColors />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
