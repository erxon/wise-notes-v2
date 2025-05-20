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

interface BackLink {
  link: string;
  pageName: string;
}

export function SiteHeader({
  currentPage,
  backLinks,
}: {
  currentPage: string;
  backLinks?: BackLink[];
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
                {currentPage}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
