// Dashboard.jsx
"use client";

import { useState } from "react";
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
import JobInfoCard from "@/components/job-info-card";
import DashboardSection from "@/components/dashboard-section";
import NextStepInfoCard from "@/components/next-step-info-card";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

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

  // Sample jobs with full details
  const jobs = [
    {
      title: "Carpenter",
      company: "BuildRight Co",
      description: "Constructs and repairs building frameworks",
      salary: 55000,
      requiredTraining: "Apprenticeship or vocational training",
      laborDemand: "High" as const,
      roiYears: 2,
      promotionOpportunities: "Good" as const,
    },
    {
      title: "Plumber",
      company: "FlowFix Inc",
      description: "Installs and maintains piping systems",
      salary: 60000,
      requiredTraining: "Apprenticeship and licensing",
      laborDemand: "High" as const,
      roiYears: 2,
      promotionOpportunities: "Moderate" as const,
    },
    {
      title: "Electrician",
      company: "SparkTech",
      description: "Installs and maintains electrical systems",
      salary: 65000,
      requiredTraining: "Apprenticeship and certification",
      laborDemand: "High" as const,
      roiYears: 2,
      promotionOpportunities: "Good" as const,
    },
    {
      title: "Welder",
      company: "MetalWorks Ltd",
      description: "Joins metal parts using various techniques",
      salary: 50000,
      requiredTraining: "Vocational training and certification",
      laborDemand: "Medium" as const,
      roiYears: 3,
      promotionOpportunities: "Moderate" as const,
    },
    {
      title: "Mason",
      company: "StoneCraft",
      description: "Builds structures with brick and stone",
      salary: 52000,
      requiredTraining: "Apprenticeship or on-the-job training",
      laborDemand: "Medium" as const,
      roiYears: 3,
      promotionOpportunities: "Limited" as const,
    },
    {
      title: "HVAC Technician",
      company: "CoolAir Solutions",
      description: "Installs and repairs heating/cooling systems",
      salary: 58000,
      requiredTraining: "Technical training and certification",
      laborDemand: "High" as const,
      roiYears: 2,
      promotionOpportunities: "Good" as const,
    },
  ];

  // Sample saved trade school programs with full details
  const savedPrograms = [
    {
      name: "Carpentry Apprenticeship",
      school: "TradeTech Institute",
      duration: "2 years",
      description: "Hands-on training in woodworking and construction",
      cost: 8000,
      certification: "Journeyman Carpenter Certificate",
      jobPlacementRate: "85%",
    },
    {
      name: "Plumbing Certification",
      school: "Vocational Skills Academy",
      duration: "18 months",
      description: "Comprehensive plumbing systems training",
      cost: 7500,
      certification: "Certified Plumber",
      jobPlacementRate: "90%",
    },
    {
      name: "Electrical Training Program",
      school: "TechTrade College",
      duration: "2 years",
      description: "Electrical installation and maintenance skills",
      cost: 9000,
      certification: "Electrical Technician Diploma",
      jobPlacementRate: "88%",
    },
  ];

  const handleJobClick = (jobTitle: string) => {
    if (selectedJob === jobTitle) {
      setSelectedJob(null);
    } else {
      setSelectedJob(jobTitle);
    }
  };

  const handleProgramClick = (programName: string) => {
    if (selectedProgram === programName) {
      setSelectedProgram(null);
    } else {
      setSelectedProgram(programName);
    }
  };

  const selectedJobData = jobs.find((job) => job.title === selectedJob);
  const selectedProgramData = savedPrograms.find(
    (program) => program.name === selectedProgram
  );

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">
        Skilled Trades Career Dashboard
      </h1>

      {/* Pathway Exploration */}
      <DashboardSection title="Pathway Exploration" editHref="/interests/edit">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" asChild>
            <Link
              href="/interests"
              className="flex items-center justify-between"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </DashboardSection>

      {/* Skills */}
      <DashboardSection title="Skills">
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
      </DashboardSection>

      {/* Jobs */}
      <DashboardSection title="Jobs" editHref="/jobs/edit">
        <Carousel className="w-full max-w-3xl mx-auto">
          <CarouselContent>
            {jobs.map((job, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <Card
                    className={`cursor-pointer hover:bg-accent transition-colors ${
                      selectedJob === job.title
                        ? "bg-accent border-2 border-primary"
                        : ""
                    }`}
                    onClick={() => handleJobClick(job.title)}
                  >
                    <CardContent className="flex aspect-square flex-col items-center justify-center p-6">
                      <span className="text-lg font-semibold">{job.title}</span>
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

        {/* Job Info Card */}
        {selectedJobData && (
          <JobInfoCard
            title={selectedJobData.title}
            description={selectedJobData.description}
            salary={selectedJobData.salary}
            requiredTraining={selectedJobData.requiredTraining}
            laborDemand={selectedJobData.laborDemand}
            roiYears={selectedJobData.roiYears}
            promotionOpportunities={selectedJobData.promotionOpportunities}
            className="mt-8 mb-8"
          />
        )}
      </DashboardSection>

      {/* Next Steps */}
      <DashboardSection title="Next Steps" editHref="/next-steps/edit">
        <div className="space-y-4">
          {savedPrograms.length > 0 ? (
            savedPrograms.map((program, index) => (
              <Card
                key={index}
                className={`cursor-pointer hover:bg-accent transition-colors ${
                  selectedProgram === program.name
                    ? "bg-accent border-2 border-primary"
                    : ""
                }`}
                onClick={() => handleProgramClick(program.name)}
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold">{program.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {program.school} - {program.duration}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground">
              No saved programs yet. Add some trade school programs to get
              started!
            </p>
          )}
        </div>
        {/* Next Step Info Card */}
        {selectedProgramData && (
          <NextStepInfoCard
            name={selectedProgramData.name}
            school={selectedProgramData.school}
            duration={selectedProgramData.duration}
            description={selectedProgramData.description}
            cost={selectedProgramData.cost}
            certification={selectedProgramData.certification}
            jobPlacementRate={selectedProgramData.jobPlacementRate}
            className="mt-8 mb-8"
          />
        )}
      </DashboardSection>
    </div>
  );
}
