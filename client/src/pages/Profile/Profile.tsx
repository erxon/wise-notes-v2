import PagesLayout from "../PagesLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import ProfilePageSkeleton from "@/components/skeletons/profile-page";
import type { User } from "@/lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { mutate } from "swr";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export default function Profile() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/users`,
    fetcher
  );

  const user: User = data;

  if (isLoading) {
    return (
      <PagesLayout page="Profile">
        <ProfilePageSkeleton />
      </PagesLayout>
    );
  }

  if (error) {
    //redirect user to error page
    navigate("/sign-in");
  }

  return (
    <PagesLayout page="Profile">
      {/* Avatar */}
      <div className="mb-8 flex flex-col items-center md:block">
        <Avatar className="w-16 h-16 mb-4">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>
            {user.firstName
              .charAt(0)
              .toUpperCase()
              .concat(user.lastName.charAt(0).toUpperCase())}
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-2">
          <Button size={"sm"}>Change</Button>
          <Button size={"sm"} variant={"secondary"}>
            Remove
          </Button>
        </div>
      </div>
      {/* First name and Last name */}
      <div className="flex flex-col gap-4 mb-4">
        <UserInformationEditor user={data} />
        {/* Email */}
        <div>
          <Label>Email</Label>
          <p className="mb-2">{user.email}</p>
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

function UserInformationEditor({
  user,
}: {
  user: {
    firstName: string;
    lastName: string;
  };
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    toast.info("Updating your information");

    try {
      //update first name and last name
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/users/update/basic-info`,
        {
          firstName: values.firstName,
          lastName: values.lastName,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const updatedAt = new Date(
          response.data.data.updatedAt
        ).toLocaleString();

        toast.success(response.data.message, {
          description: updatedAt,
        });

        mutate(
          `${import.meta.env.VITE_API_URL}/${
            import.meta.env.VITE_API_VERSION
          }/users`
        );
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-2 items-start mb-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-2 items-start"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="md:w-[300px]"
                    placeholder="First name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="md:w-[300px]"
                    placeholder="Last name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} size={"sm"} type="submit">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
