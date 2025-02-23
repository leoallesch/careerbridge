"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Label} from "@/components/ui/label";

interface NextStepInfoCardProps {
  name: string;
  school: string;
  duration: string|number;
  cost: string|number;
  jobPlacementRate: string|number;
  website?: string; // Optional
  contactInfo?: string; // Optional
  location?: string; // Optional
  description?: string; // Optional
  className?: string;
}

export default function NextStepInfoCard({
  name,
  school,
  duration,
  cost,
  jobPlacementRate,
  website,
  contactInfo,
  location,
  description,
  className,
}: NextStepInfoCardProps) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{school}{location&&` - ${location}`}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {description&&(
          <div className="grid gap-2">
            <Label className="font-semibold">Description</Label>
            <p className="text-muted-foreground">{description}</p>
          </div>
        )}
        <div className="grid gap-2">
          <Label className="font-semibold">Duration (in years)</Label>
          <p className="text-muted-foreground">{duration}</p>
        </div>
        <div className="grid gap-2">
          <Label className="font-semibold">Cost (yearly)</Label>
          <p className="text-muted-foreground">
            {typeof cost==="number"? `$${cost.toLocaleString()}`:cost}
          </p>
        </div>
        <div className="grid gap-2">
          <Label className="font-semibold">Job Placement Rate</Label>
          <p className="text-muted-foreground">{jobPlacementRate}</p>
        </div>
        {website&&(
          <div className="grid gap-2">
            <Label className="font-semibold">Website</Label>
            <p className="text-muted-foreground">
              <a href={website} target="_blank" rel="noopener noreferrer" className="underline">
                {website}
              </a>
            </p>
          </div>
        )}
        {contactInfo&&(
          <div className="grid gap-2">
            <Label className="font-semibold">Contact Info</Label>
            <p className="text-muted-foreground">{contactInfo}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}