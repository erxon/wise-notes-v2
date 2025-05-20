import { Input } from "@/components/ui/input";
import PagesLayout from "../PagesLayout";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Password() {
  const handleSave = () => {
    toast("Password successfully updated", {
      description: "You can now login with your new password",
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
      page="Password"
    >
      <div className="flex flex-col gap-6  mb-4">
        <div className="flex flex-col gap-2">
          <Label>Current password</Label>
          <Input
            placeholder="Current password"
            type="password"
            name="current_password"
            className="md:w-[300px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>New password</Label>
          <Input
            placeholder="New password"
            type="password"
            name="new_password"
            className="md:w-[300px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Confirm new password</Label>
          <Input
            placeholder="Confirm new password"
            type="password"
            name="new_password_confirmation"
            className="md:w-[300px]"
          />
        </div>
      </div>
      <p className="mb-4">Your password should have at least 8 characters</p>
      <Button onClick={handleSave}>Save</Button>
    </PagesLayout>
  );
}
