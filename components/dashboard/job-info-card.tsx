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

interface JobInfoCardProps {
  title: string;
  description: string;
  salary: string | number;
  requiredTraining: string;
  laborDemand: string;
  roiYears: number;
  promotionOpportunities: string;
  className?: string;
}

export default function JobInfoCard({
  title,
  description,
  salary,
  requiredTraining,
  laborDemand,
  roiYears,
  promotionOpportunities,
  className,
}: JobInfoCardProps) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label className="font-semibold">Salary</Label>
          <p className="text-muted-foreground">
            {typeof salary === "number"
              ? `$${salary.toLocaleString()}`
              : salary}
          </p>
        </div>

        <div className="grid gap-2">
          <Label className="font-semibold">Required Training</Label>
          <p className="text-muted-foreground">{requiredTraining}</p>
        </div>

        <div className="grid gap-2">
          <Label className="font-semibold">Labor Demand</Label>
          <p className="text-muted-foreground">{laborDemand}</p>
        </div>

        <div className="grid gap-2">
          <Label className="font-semibold">Return on Investment</Label>
          <p className="text-muted-foreground">
            Positive ROI after {roiYears} year{roiYears !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid gap-2">
          <Label className="font-semibold">Promotion Opportunities</Label>
          <p className="text-muted-foreground">{promotionOpportunities}</p>
        </div>
      </CardContent>
    </Card>
  );
}
