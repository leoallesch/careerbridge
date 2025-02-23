"use client";
import {signIn} from "@/lib/auth-client";
import {Button} from "../ui/button";
import {FaGithub} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {SocialProvider} from "@/utils/types";

type OAuthProvider={
  name: SocialProvider;
  displayName: string;
  icon?: React.ReactNode;
};

export function OAuthButtons() {
  const oAuthProviders: OAuthProvider[]=[
    {
      name: "google",
      displayName: "Google",
      icon: <FcGoogle className="size-5" />,
    },
    {
      name: "github",
      displayName: "Github",
      icon: <FaGithub className="size-5" />,
    },
  ];

  return (
    <>
      {oAuthProviders.map((provider) => (
        <Button
          key={provider.name}
          className="text-black mt-2 w-full flex items-center justify-center gap-2"
          variant="outline"
          onClick={async () => {
            await signIn.social({
              provider: provider.name, // e.g., "google", "github"
              callbackURL: "/dashboard", // Where to redirect after OAuth
            });
          }}
        >
          {provider.icon}
          Login with {provider.displayName}
        </Button>
      ))}
    </>
  );
}
