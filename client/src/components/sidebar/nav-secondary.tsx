import { Link } from "react-router";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { LucideIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import SearchDialog from "./Dialogs/SearchDialog";

function Search() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <SidebarMenuButton
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <SidebarMenuSubItem className="flex gap-2">
          <SearchIcon className="w-4 h-4" />
          <span>Search</span>
        </SidebarMenuSubItem>
      </SidebarMenuButton>
      {isOpen && <SearchDialog isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}

export default function NavSecondary({
  items,
  className,
}: {
  items: { title: string; url: string; icon?: LucideIcon }[];
  className?: string;
}) {
  return (
    <>
      <SidebarGroup className={className}>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <Search />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
