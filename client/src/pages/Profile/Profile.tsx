import PagesLayout from "../PagesLayout";
import profileImage from "../../assets/profile.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";

interface Profile {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

const profile = {
  id: 1,
  avatar: " /assets/profile.jpg",
  first_name: "Ericson",
  last_name: "Castasus",
  email: "ericsoncastasus@info.cc",
  created_at: "2025-05-18T14:33:08.979284Z",
  updated_at: "",
} as Profile;

function Avatar({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div>
      <img className={className} src={src} alt={alt} />
    </div>
  );
}

export default function Profile() {
  const [profileState, setProfileState] = useState<Profile>(profile);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setProfileState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <PagesLayout page="Profile">
      {/* Avatar */}
      <div className="mb-4 flex flex-col items-center md:block">
        <Avatar
          className="w-24 h-24 rounded-full object-cover mb-3"
          src={profileImage}
          alt={profile.first_name}
        />
        <div className="flex gap-2">
          <Button size={"sm"}>Change</Button>
          <Button size={"sm"} variant={"secondary"}>
            Remove
          </Button>
        </div>
      </div>
      {/* First name and Last name */}
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="first_name">First name</Label>
          <Input
            name="first_name"
            className="md:w-[300px] w-full"
            onChange={handleChange}
            placeholder="First Name"
            value={profileState.first_name}
          />
        </div>
        <div className="flex flex-col gap-2 md:w-[300px] w-full">
          <Label htmlFor="first_name">Last name</Label>
          <Input
            name="last_name"
            className="md:w-[300px] w-full"
            onChange={handleChange}
            placeholder="Last Name"
            value={profileState.last_name}
          />
        </div>
        {/* Email */}
        <div>
          <Label>Email</Label>
          <p className="mb-2">{profile.email}</p>
          <Link to={"/profile/email"}>
            <Button variant={"secondary"}>Change email</Button>
          </Link>
        </div>
        {/* Password */}
        <div>
          <Label className="mb-2">Password</Label>
          <Link to={"/profile/password"}>
            <Button variant={"secondary"}>Change password</Button>
          </Link>
        </div>
      </div>
    </PagesLayout>
  );
}
