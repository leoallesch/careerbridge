"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import CardWrapper from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { OAuthButtons } from "@/components/auth/oauth-signin";
import { signIn } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Please enter a valid password",
  }),
});
type LoginFormValues = z.infer<typeof LoginSchema>;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    const { email, password } = values;

    await signIn.email(
      { email, password },
      {
        onRequest: () => {
          toast({ title: "Please wait..." });
        },
        onSuccess: () => {
          toast({ title: "Login Sucessfull! Redirecting..." });
          form.reset();

          router.refresh();
          router.push("/dashboard");
        },
        onError: (ctx) => {
          toast({
            title: "Login Failed",
            description: ctx.error.message,
            variant: "destructive",
          });
        },
      }
    );

    setLoading(false);
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <CardWrapper
        headerLabel="Log in to your account"
        title="Login"
        backButtons={[
          {
            label: "Don't have an account? Create one",
            href: "/register",
          },
          { label: "Forgot your password?", href: "/forgot-password" },
        ]}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="johndoe@email.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="******" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>
        <OAuthButtons />
      </CardWrapper>
    </main>
  );
}
