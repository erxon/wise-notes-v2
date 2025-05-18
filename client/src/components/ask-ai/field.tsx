import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Field() {
  return (
    <div className="p-3 rounded-lg shadow-lg w-full lg:w-[550px] flex flex-col gap-2 items-start mb-4">
      <Textarea placeholder="Ask anything" className="resize-none w-full" />
      <Button size={"sm"}>Send</Button>
    </div>
  );
}
