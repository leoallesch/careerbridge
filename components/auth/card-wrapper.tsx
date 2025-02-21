"use client";

import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import AuthHeader from "./auth-header";
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  title: string;
  showSocial?: boolean;
  backButtons: { label: string; href: string }[]; // Array of back button configurations
}

const CardWrapper = ({
  children,
  headerLabel,
  title,
  backButtons,
}: CardWrapperProps) => {
  return (
    <Card className="xl:w-1/4 md:w-1/2 shadow-md">
      <CardHeader>
        <AuthHeader label={headerLabel} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col gap-2">
        {backButtons.map((button, index) => (
          <BackButton key={index} label={button.label} href={button.href} /> // Add margin for multiple buttons
        ))}
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
