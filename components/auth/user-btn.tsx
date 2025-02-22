"use client";

import React, { useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserButton: React.FC = () => {
  const { data: session, isPending: sessionPending } = useSession();
  const router = useRouter();
  const [signOutPending, setSignOutPending] = useState(false); // Track sign-out state

  const isPending = sessionPending || signOutPending; // Combine pending states

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleSignOut = async () => {
    setSignOutPending(true); // Set pending state for sign-out
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/auth/login");
          },
          onError: (error) => {
            console.error("Sign-out failed:", error);
          },
        },
      });
    } catch (error) {
      console.error("Unexpected error during sign-out:", error);
    } finally {
      setSignOutPending(false); // Reset pending state
    }
  };

  if (isPending) {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    );
  }

  if (!session?.user) {
    return (
      <Button variant="outline" asChild>
        <Link href="/auth/login">Sign In</Link>
      </Button>
    );
  }

  const user = session.user;

  return (
    <Select
      onValueChange={(value) => value === "signout" && handleSignOut()}
      disabled={isPending} // Disable select during pending states
    >
      <SelectTrigger className="w-fit h-8 p-0 border-none">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.image || ""} alt={user.name || "User"} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        <div className="py-1 px-2">
          <p className="text-sm font-medium">{user.name || "User"}</p>
        </div>
        <SelectItem value="signout" className="cursor-pointer">
          Sign Out
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserButton;
