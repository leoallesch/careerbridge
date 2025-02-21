"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CardWrapper from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const ForgotPasswordSchema = z.object({
  email: z
    .string() // string type
    .email({ message: "Invalid type" }) // checks if the input given by the user is email
    .min(1, { message: "Email is required" }), // checks if the email field is empty or not
});
type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setLoading(true);
    const { email } = values;

    await authClient.forgetPassword(
      {
        email: email,
        redirectTo: "/auth/reset-password",
      },
      {
        onRequest: () => {
          toast({ title: "Please wait..." });
        },
        onSuccess: () => {
          toast({ title: "Reset Password Email Sent!" });
          form.reset();
          router.push("/auth/forgot-password/confirmation");
        },
        onError: (ctx) => {
          toast({
            title: "Forgot Password Failed",
            description: ctx.error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <CardWrapper
        headerLabel="Enter your email to reset it"
        title="Forgot your Password?"
        backButtons={[
          {
            label: "Don't need to reset password? Login",
            href: "/auth/login",
          },
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
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </main>
  );
}
