"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

interface DashboardSectionProps {
  title: string;
  editHref?: string;
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
        <CardTitle className="text-2xl">{title}</CardTitle>
        {editHref && (
          <Button
            variant="ghost"
            size="lg"
            asChild
            className="hover:bg-gray-200" // Added hover effect
          >
            <Link href={editHref} className="flex items-center font-bold">
              <Pencil className="h-4 w-4 mr-2" strokeWidth={2.5} />
              <span className="font-bold">Edit</span>
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
