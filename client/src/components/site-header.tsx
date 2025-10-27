import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import User from "@/lib/types/user.type";

interface BackLink {
  link: string;
  pageName: string;
}

export function SiteHeader({
  currentPage,
  backLinks,
  user,
}: {
  currentPage?: string;
  backLinks?: BackLink[];
  user: User;
}) {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <ModeToggle />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <Breadcrumb className="">
          <BreadcrumbList>
            {backLinks &&
              backLinks.length > 0 &&
              backLinks.map(({ link, pageName }) => (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={link}>{pageName}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              ))}
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">
                {currentPage ? currentPage : ""}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          {user.type === "user" &&
            user.usageLimit &&
            (user.usageLimit.notes === Number(import.meta.env.VITE_NOTE_LIMIT) &&
            user.usageLimit.chat === Number(import.meta.env.VITE_CHAT_LIMIT) ? (
              <p className="text-xs md:text-sm text-red-300">You have already reached your usage limit</p>
            ) : (
              <div className="text-xs md:text-sm">
                <p className="font-semibold text-neutral-500">Usage Limit </p>
                <p className="text-neutral-400 ">
                  <span className="mr-4">
                    Notes: {user.usageLimit.notes} /{" "}
                    {import.meta.env.VITE_NOTE_LIMIT}
                  </span>
                  <span>
                    Chat: {user.usageLimit.chat} /{" "}
                    {import.meta.env.VITE_CHAT_LIMIT}
                  </span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </header>
  );
}
