// Dashboard.jsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  // Skilled trade skills
  const skills = [
    "Carpentry",
    "Plumbing",
    "Electrical Work",
    "Welding",
    "Masonry",
    "HVAC Installation",
    "Automotive Repair",
    "Heavy Equipment Operation",
  ];

  // Sample jobs (updated to reflect skilled trades)
  const jobs = [
    { title: "Carpenter", company: "BuildRight Co" },
    { title: "Plumber", company: "FlowFix Inc" },
    { title: "Electrician", company: "SparkTech" },
    { title: "Welder", company: "MetalWorks Ltd" },
    { title: "Mason", company: "StoneCraft" },
    { title: "HVAC Technician", company: "CoolAir Solutions" },
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">
        Skilled Trades Career Dashboard
      </h1>

      {/* Pathway Exploration Links */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Pathway Exploration</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" asChild>
            <Link
              href="/pathways/construction"
              className="flex items-center justify-between"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Skills Carousel */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full max-w-3xl mx-auto">
            <CarouselContent>
              {skills.map((skill, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-lg font-semibold text-center">
                          {skill}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>

      {/* Jobs Carousel */}
      <Card>
        <CardHeader>
          <CardTitle>Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full max-w-3xl mx-auto">
            <CarouselContent>
              {jobs.map((job, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square flex-col items-center justify-center p-6">
                        <span className="text-lg font-semibold">
                          {job.title}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {job.company}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
}
