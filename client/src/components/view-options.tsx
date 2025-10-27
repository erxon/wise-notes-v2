import TooltipWrapper from "./utility-components/TooltipWrapper";
import { Button } from "./ui/button";
import { Grid3x3Icon } from "lucide-react";
import { Rows3Icon } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function ViewsOption({
  page,
  setView,
}: {
  page?: string;
  setView: React.Dispatch<React.SetStateAction<"grid" | "list">>;
}) {
  const handleViewChange = async (view: "grid" | "list") => {
    setView(view);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/preferences/notes-layout`,
        {
          page: page,
          notesLayout: view,
        },
        { withCredentials: true }
      );

      toast.success("Notes layout updated");
    } catch {
      toast.error("Failed to update notes layout");
    }
  };
  return (
    <div className="md:px-6 flex gap-2">
      <TooltipWrapper content="Grid view">
        <Button
          onClick={() => handleViewChange("grid")}
          size={"icon"}
          variant={"outline"}
        >
          <Grid3x3Icon />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper content="List view">
        <Button
          onClick={() => handleViewChange("list")}
          size={"icon"}
          variant={"outline"}
        >
          <Rows3Icon />
        </Button>
      </TooltipWrapper>
    </div>
  );
}
