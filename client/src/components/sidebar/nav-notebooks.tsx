import useSWR from "swr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  MoreHorizontalIcon,
  NotebookIcon,
  Pencil,
  Plus,
  Trash,
} from "lucide-react";
import fetcher from "@/lib/fetcher";
import { Notebook } from "@/lib/types";
import { Link } from "react-router";
import { useState } from "react";
import NewNotebook from "./Dialogs/NewNotebook";
import EditNotebook from "./Dialogs/EditNotebook";
import DeleteAlert from "./Dialogs/DeleteAlert";

export default function NavNotebooks() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Notebooks</SidebarGroupLabel>
        <SidebarGroupAction onClick={handleOpen}>
          <Plus />
        </SidebarGroupAction>
        <SidebarMenu>
          <Notebooks />
        </SidebarMenu>
      </SidebarGroup>
      <NewNotebook open={openDialog} setOpen={setOpenDialog} />
    </>
  );
}

function Notebooks() {
  const { state } = useSidebar();

  const {
    data: notebooks,
    isLoading,
    error,
  } = useSWR(
    `${import.meta.env.VITE_API_URL}/${
      import.meta.env.VITE_API_VERSION
    }/notebooks`,
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (notebooks) {
    return (
      <div>
        {notebooks.data && notebooks.data.length > 0
          ? notebooks.data.map((notebook: Notebook) => (
              <NotebookItem key={notebook._id} notebook={notebook} />
            ))
          : state === "expanded" && (
              <p className="ml-2 text-sm text-gray-500">
                You have no notebooks
              </p>
            )}
      </div>
    );
  }
}

function NotebookItem({ notebook }: { notebook: Notebook }) {
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const isMobile = useSidebar();

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link to={`/notebooks/${notebook._id}`}>
            <NotebookIcon />
            <span>{notebook.title}</span>
          </Link>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction
              showOnHover
              className="rounded-sm data-[state=open]:bg-accent"
            >
              <MoreHorizontalIcon />
              <span className="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-24 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align={isMobile ? "end" : "start"}
          >
            <DropdownMenuItem>
              <NotebookIcon />
              <span>View</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                setTimeout(() => {
                  setOpenEditDialog(true);
                }, 10);
              }}
            >
              <Pencil />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                setTimeout(() => {
                  setOpenDeleteDialog(true);
                }, 10);
              }}
            >
              <Trash />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <EditNotebook
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        notebook={notebook}
      />
      <DeleteAlert
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        notebook={notebook}
      />
    </>
  );
}
