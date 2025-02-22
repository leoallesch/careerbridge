"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/page-wrapper";

// Define Job type
type Job = {
  id: number;
  title: string;
  salary: number;
  roiSchooling: number;
  jobSatisfaction: number;
  workLifeBalance: number;
};

// Valid attribute keys
type JobAttribute = keyof Omit<Job, "id" | "title">;

// Sample job data
const jobsData: Job[] = [
  {
    id: 1,
    title: "Software Engineer",
    salary: 120000,
    roiSchooling: 2.5,
    jobSatisfaction: 85,
    workLifeBalance: 70,
  },
  {
    id: 2,
    title: "Doctor",
    salary: 180000,
    roiSchooling: 1.8,
    jobSatisfaction: 75,
    workLifeBalance: 55,
  },
  {
    id: 3,
    title: "Teacher",
    salary: 55000,
    roiSchooling: 1.2,
    jobSatisfaction: 80,
    workLifeBalance: 85,
  },
];

const attributeOptions = [
  { value: "salary" as const, label: "Salary ($)" },
  { value: "roiSchooling" as const, label: "ROI on Schooling" },
  { value: "jobSatisfaction" as const, label: "Job Satisfaction (%)" },
  { value: "workLifeBalance" as const, label: "Work-Life Balance (%)" },
];

export default function JobTablePage() {
  const [selectedAttribute, setSelectedAttribute] =
    useState<JobAttribute>("salary");

  const chartConfig = {
    [selectedAttribute]: {
      label: attributeOptions.find((opt) => opt.value === selectedAttribute)
        ?.label,
      color: "hsl(var(--chart-1))",
    },
  };

  // Prepare chart data
  const chartData = jobsData.map((job) => ({
    name: job.title,
    [selectedAttribute]: job[selectedAttribute],
  }));

  return (
    <PageWrapper
      title="Compare your job options"
      pageNavProps={{
        back: { href: "/jobs", label: "See Jobs" },
        forward: { href: "/next-steps", label: "Next Steps" },
      }}
    >
      <Card>
        <CardHeader>
          <Tabs
            value={selectedAttribute}
            onValueChange={(value) =>
              setSelectedAttribute(value as JobAttribute)
            }
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              {attributeOptions.map((attr) => (
                <TabsTrigger key={attr.value} value={attr.value}>
                  {attr.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey={selectedAttribute}
                fill={`var(--color-${selectedAttribute})`}
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            {attributeOptions.map((attr) => (
              <TableHead key={attr.value}>{attr.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobsData.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.title}</TableCell>
              {attributeOptions.map((attr) => (
                <TableCell key={attr.value}>
                  {attr.value === "salary"
                    ? job[attr.value].toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      })
                    : job[attr.value]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageWrapper>
  );
}
