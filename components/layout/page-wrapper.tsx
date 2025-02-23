"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageNav, PageNavProps } from "./page-nav";

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  pageNavProps?: PageNavProps;
  className?: string;
  loading?: boolean; // Added loading prop
}

export default function PageWrapper({
  children,
  title,
  pageNavProps,
  className,
  loading = false, // Default to false
}: PageWrapperProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className={`w-full max-w-4xl mx-auto ${className}`}>
        {title && (
          <CardHeader>
            {loading ? (
              <Skeleton className="h-8 w-1/3" />
            ) : (
              <CardTitle className="text-2xl">{title}</CardTitle>
            )}
          </CardHeader>
        )}
        <CardContent className="p-0">
          {loading ? (
            <div className="px-8 pb-8 space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between mt-6">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          ) : (
            <>
              <div className="px-8 pb-8">{children}</div>
              <PageNav
                back={pageNavProps?.back}
                forward={pageNavProps?.forward}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
