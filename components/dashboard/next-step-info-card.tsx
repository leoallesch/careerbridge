// NextStepInfoCard.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface NextStepInfoCardProps {
  name: string;
  school: string;
  duration: string | number;
  cost: string | number;
  jobPlacementRate: string | number;
  className?: string;
}

export default function NextStepInfoCard({
  name,
  school,
  duration,
  cost,
  jobPlacementRate,
  className,
}: NextStepInfoCardProps) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{school}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label className="font-semibold">Duration</Label>
          <p className="text-muted-foreground">{duration}</p>
        </div>

        <div className="grid gap-2">
          <Label className="font-semibold">Cost</Label>
          <p className="text-muted-foreground">
            {typeof cost === "number" ? `$${cost.toLocaleString()}` : cost}
          </p>
        </div>

        <div className="grid gap-2">
          <Label className="font-semibold">Job Placement Rate</Label>
          <p className="text-muted-foreground">{jobPlacementRate}</p>
        </div>
      </CardContent>
    </Card>
  );
}