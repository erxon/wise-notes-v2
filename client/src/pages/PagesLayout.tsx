import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";

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
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-screen">
        <SiteHeader backLinks={backLinks} currentPage={page} />
        <main className="p-4">
          {children}
          <Toaster />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
