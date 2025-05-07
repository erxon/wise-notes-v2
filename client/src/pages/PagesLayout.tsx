import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/site-header";

export default function PagesLayout({
  children,
  currentPage,
}: {
  children: React.ReactNode;
  currentPage: string;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader currentPage={currentPage} />
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
