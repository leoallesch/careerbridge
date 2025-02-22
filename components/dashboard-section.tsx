// DashboardSection.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

interface DashboardSectionProps {
  title: string;
  editHref?: string; // Made optional
  children: React.ReactNode;
  className?: string;
}

export default function DashboardSection({
  title,
  editHref,
  children,
  className,
}: DashboardSectionProps) {
  return (
    <Card className={`mb-8 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {editHref && (
          <Button variant="ghost" size="sm" asChild>
            <Link href={editHref}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
