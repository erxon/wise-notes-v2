import { Input } from "@/components/ui/input";
import PagesLayout from "../PagesLayout";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Email() {
  const handleSave = () => {
    toast("Email successfully updated", {
      description: "You can now login with your new email",
      action: {
        label: "logout",
        onClick: () => {
          console.log("logout");
        },
      },
    });
  };

  return (
    <PagesLayout
      backLinks={[{ link: "/profile", pageName: "Profile" }]}
      page="Email"
    >
      <p className="mb-6">
        Update your email you are using to login to Wise Notes. Your current
        email is <span className="font-semibold">ericsoncastasus@info.cc</span>
      </p>
      <div className="flex flex-col gap-6 mb-4">
        <div className="flex flex-col gap-2">
          <Label>New email</Label>
          <Input className="md:w-[300px]" placeholder="New Email" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Confirm new email</Label>
          <Input className="md:w-[300px]" placeholder="Confirm New Email" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Password</Label>
          <Input
            className="md:w-[300px]"
            placeholder="Password"
            type="password"
          />
        </div>
      </div>
      <Button onClick={handleSave}>Update</Button>
    </PagesLayout>
  );
}
