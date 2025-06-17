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
import axios, { AxiosError } from "axios";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import fetcher from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/lib/types";

const formSchema = z.object({
  newEmail: z.string().email("Please enter a proper email"),
  confirmNewEmail: z.string().email("Please enter a proper email"),
  password: z.string().min(6, "Password should be minimum of 6 characters"),
});

export default function Email() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { newEmail: "", confirmNewEmail: "", password: "" },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/users/update/email`,
        {
          newEmail: values.newEmail,
          confirmNewEmail: values.confirmNewEmail,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        form.reset();
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
      page="Email"
    >
      <p className="mb-6">
        Update your email you are using to login to Wise Notes. Your current
        email is <CurrentEmail />
      </p>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-6 mb-4 items-start"
          >
            <FormField
              name="newEmail"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="New email"
                      className="md:w-[300px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmNewEmail"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Confirm new email"
                      className="md:w-[300px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Password"
                      type="password"
                      className="md:w-[300px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              Update
            </Button>
          </form>
        </Form>
      </div>
    </PagesLayout>
  );
}

function CurrentEmail() {
  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/users`,
    fetcher
  );

  if (isLoading) {
    return <Skeleton className="w-[300px] h-10" />;
  }

  if (error) {
    return <span className="font-semibold">Something went wrong</span>;
  }

  const user: User = data;

  return <span className="font-semibold">{user.email}</span>;
}
