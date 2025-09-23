import * as React from "react";
import {
  ArrowUpCircleIcon,
  Notebook,
  NotepadText,
  Sparkle,
  SettingsIcon,
  TrashIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import NavMain from "./nav-main";
import NavNotebooks from "./nav-notebooks";
import NavSecondary from "./nav-secondary";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  main: [
    {
      title: "Notes",
      icon: NotepadText,
      url: "/",
    },
    {
      title: "Ask AI",
      icon: Sparkle,
      url: "/ask-ai",
    },
  ],
  notebooks: [
    {
      title: "Work",
      url: "/notebook/1",
      icon: Notebook,
    },
    {
      title: "Home",
      url: "",
      icon: Notebook,
    },
    {
      title: "Projects",
      url: "",
      icon: Notebook,
    },
  ],
  secondary: [
    {
      title: "Settings",
      icon: SettingsIcon,
      url: "/settings",
    },
    {
      title: "Bin",
      icon: TrashIcon,
      url: "/bin",
    },
  ],
};

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Wise Notes</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.main} />
        <NavNotebooks />
        <NavSecondary items={data.secondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
