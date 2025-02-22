"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { passwordLength } from "@/utils/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/auth/card-wrapper";

const ResetPasswordSchema = z
  .object({
    password: z.string().min(passwordLength, {
      message:
        "Password must be at least " + passwordLength + " characters long",
    }),
    passwordConfirmation: z.string().min(passwordLength, {
      message:
        "Password must be at least " + passwordLength + " characters long",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirmation"],
        message: "Passwords do not match",
      });
    }
  });

type ResetPasswordValues = z.infer<typeof ResetPasswordSchema>;

type ResetPasswordContentProps = {
  searchParams: { token?: string }; // This matches the resolved searchParams
};

export default function ResetPasswordContent({
  searchParams,
}: ResetPasswordContentProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const token = searchParams.token;

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (values: ResetPasswordValues) => {
    setLoading(true);
    const { password } = values;

    await authClient.resetPassword(
      { newPassword: password, token },
      {
        onRequest: () => {
          toast({ title: "Resetting Password..." });
        },
        onSuccess: () => {
          toast({ title: "Password Reset!", description: "Please Log In." });
          form.reset();
          router.push("/login");
        },
        onError: (ctx) => {
          toast({
            title: "Password Reset Failed",
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
        headerLabel="Please complete the form to reset your password"
        title="Password Reset"
        backButtons={[
          { label: "Don't need to reset password? Login", href: "/login" },
        ]}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="******" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="******" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Change Password"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </main>
  );
}
