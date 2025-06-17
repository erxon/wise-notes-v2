import { Input } from "@/components/ui/input";
import PagesLayout from "../PagesLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
import axios, { AxiosError } from "axios";

const formSchema = z.object({
  currentPassword: z.string().min(6, "Minimum of 6 characters"),
  newPassword: z.string().min(6, "Minimum of 6 characters"),
  confirmNewPassword: z.string().min(6, "Minimum of 6 characters"),
});

export default function Password() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    toast.info("Updating your password");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/users/update/change-password`,
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmNewPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const updatedAt = new Date(
          response.data.data.updatedAt
        ).toLocaleString();

        toast.success(response.data.message, {
          description: updatedAt,
        });

        form.reset();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <PagesLayout
      backLinks={[{ link: "/profile", pageName: "Profile" }]}
      page="Password"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6  mb-4 items-start"
        >
          <FormField
            name="currentPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Current Password"
                    className="md:w-[300px]"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="newPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="New Password"
                    className="md:w-[300px]"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmNewPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Confirm New Password"
                    className="md:w-[300px]"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </form>
      </Form>
    </PagesLayout>
  );
}
