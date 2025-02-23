"use client";

import React from "react";
import {Card,CardContent,CardHeader,CardTitle} from "@/components/ui/card";
import {PageNav,PageNavProps} from "./page-nav";

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  pageNavProps?: PageNavProps;
  className?: string;
}

export default function PageWrapper({
  children,
  title,
  pageNavProps,
  className,
}: PageWrapperProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className={`w-full max-w-4xl mx-auto ${className}`}>
        {title&&(
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent className="p-0">
          <div className="px-8 pb-8">{children}</div>
          <PageNav back={pageNavProps?.back} forward={pageNavProps?.forward} />
        </CardContent>
      </Card>
    </div>
  );
}
