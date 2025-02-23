"use client";

import {useState} from "react";
import {z} from "zod";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import CardWrapper from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";
import {toast} from "@/hooks/use-toast";
import {OAuthButtons} from "@/components/auth/oauth-signin";
import {passwordLength} from "@/utils/constants";

// Define the registration schema
const RegisterSchema=z
  .object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(2,"Name must be at least 2 characters"),
    password: z
      .string()
      .min(
        passwordLength,
        "Password must be at least "+passwordLength+" characters"
      ),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password===data.passwordConfirmation,{
    message: "Passwords must match",
    path: ["passwordConfirmation"],
  });

type RegisterFormValues=z.infer<typeof RegisterSchema>;

export default function Register() {
  const [loading,setLoading]=useState(false);
  const router=useRouter();

  // Initialize the form
  const form=useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  // Handle form submission
  const onSubmit=async (values: RegisterFormValues) => {
    setLoading(true);
    const {email,name,password}=values;

    await authClient.signUp.email(
      {email,name,password},
      {
        onRequest: () => {
          toast({title: "Creating account..."});
        },
        onSuccess: () => {
          toast({title: "Account created! Redirecting..."});
          form.reset();

          router.refresh();
          router.push("/auth/register/confirmation");
        },
        onError: (ctx) => {
          toast({
            title: "Registration Failed",
            description: ctx.error.message,
            variant: "destructive",
          });
        },
      }
    );

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <CardWrapper
        headerLabel="Create an account"
        title="Register"
        backButtons={[
          {label: "Already have an account? Login",href: "/auth/login"},
        ]}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@email.com"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full text-white" disabled={loading}>
              {loading? "Registering...":"Register"}
            </Button>
          </form>
        </Form>
        <OAuthButtons />
      </CardWrapper>
    </main>
  );
}
