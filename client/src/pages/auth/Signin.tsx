import { Input } from "@/components/ui/input";
import AuthLayout from "./AuthLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import LogoLarge from "@/components/logo-large";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import authSchema from "@/lib/schema/auth-schema";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Signin() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    const rootUrl = `${import.meta.env.VITE_API_URL}/${
      import.meta.env.VITE_API_VERSION
    }`;
    try {
      const result = await axios.post(
        `${rootUrl}/auth/signin/`,
        {
          username: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );

      if (result.status === 200) {
        navigate("/");
      }
    } catch (error) {
      form.reset();
      toast.error("An error occured while signing you in.", {
        description:
          "Please check your credentials. Or sign-up if you don't have an account yet",
      });
    }
  };

  return (
    <>
      <AuthLayout>
        <div className="w-[400px] p-4">
          <LogoLarge />
          <h1 className="text-xl font-semibold mb-4">Sign-in</h1>
          <div className="flex flex-col gap-2">
            <Form {...form}>
              <form
                className="flex flex-col gap-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Input placeholder="Email" {...field} />
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <Button type="submit">Sign-in</Button>
              </form>
            </Form>
            <div className="flex justify-between mb-3">
              <Link to={"#"} className="text-sm">
                Forgot password
              </Link>
              <p className="text-sm">
                Do not have an account yet?{" "}
                <Link to={"/sign-up"} className="text-blue-500">
                  Sign-up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
