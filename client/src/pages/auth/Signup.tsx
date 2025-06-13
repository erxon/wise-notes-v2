import { Input } from "@/components/ui/input";
import AuthLayout from "./AuthLayout";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import LogoLarge from "@/components/logo-large";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import authSchema from "@/lib/schema/auth-schema";

export default function Signup() {
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    console.log(values);
    form.reset();
  };

  return (
    <AuthLayout>
      <div className="w-[400px] p-4">
        <LogoLarge />
        <h1 className="text-xl font-semibold mb-4">Sign-up</h1>
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
                    <Input placeholder="Password" type="password" {...field} />
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button type="submit">Sign-up</Button>
            </form>
          </Form>
          <div className="flex justify-between mb-3">
            <Link to={"#"} className="text-sm">
              Forgot password
            </Link>
            <p className="text-sm">
              Already have an account?{" "}
              <Link to={"/sign-in"} className="text-blue-500">
                Sign-in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
