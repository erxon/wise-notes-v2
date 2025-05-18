import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/site-header";

export default function PagesLayout({
  children,
  page,
}: {
  children: React.ReactNode;
  page: string;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-screen">
        <SiteHeader currentPage={page} />
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
