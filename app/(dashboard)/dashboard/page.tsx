"use client";

import { useState } from "react";
import PathwayExplorationSection from "@/components/dashboard/pathway-exploration-section";
import SkillsSection from "@/components/dashboard/skills-section";
import JobsSection from "@/components/dashboard/jobs-section";
import NextStepsSection from "@/components/dashboard/next-steps-section";
import { Job, Program } from "@/lib/types";

export default function Dashboard() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  // Skilled trade skills
  const skills: string[] = [
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
  const jobs: Job[] = [
    {
      title: "Carpenter",
      company: "BuildRight Co",
      description: "Constructs and repairs building frameworks",
      salary: 55000,
      requiredTraining: "Apprenticeship or vocational training",
      laborDemand: "High",
      roiYears: 2,
      promotionOpportunities: "Good",
    },
    {
      title: "Plumber",
      company: "FlowFix Inc",
      description: "Installs and maintains piping systems",
      salary: 60000,
      requiredTraining: "Apprenticeship and licensing",
      laborDemand: "High",
      roiYears: 2,
      promotionOpportunities: "Moderate",
    },
    {
      title: "Electrician",
      company: "SparkTech",
      description: "Installs and maintains electrical systems",
      salary: 65000,
      requiredTraining: "Apprenticeship and certification",
      laborDemand: "High",
      roiYears: 2,
      promotionOpportunities: "Good",
    },
    {
      title: "Welder",
      company: "MetalWorks Ltd",
      description: "Joins metal parts using various techniques",
      salary: 50000,
      requiredTraining: "Vocational training and certification",
      laborDemand: "Medium",
      roiYears: 3,
      promotionOpportunities: "Moderate",
    },
    {
      title: "Mason",
      company: "StoneCraft",
      description: "Builds structures with brick and stone",
      salary: 52000,
      requiredTraining: "Apprenticeship or on-the-job training",
      laborDemand: "Medium",
      roiYears: 3,
      promotionOpportunities: "Limited",
    },
    {
      title: "HVAC Technician",
      company: "CoolAir Solutions",
      description: "Installs and repairs heating/cooling systems",
      salary: 58000,
      requiredTraining: "Technical training and certification",
      laborDemand: "High",
      roiYears: 2,
      promotionOpportunities: "Good",
    },
  ];

  // Sample saved trade school programs with full details
  const savedPrograms: Program[] = [
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Skilled Trades Career Dashboard
      </h1>

      <PathwayExplorationSection />
      <SkillsSection skills={skills} editHref="/interests" />

      <JobsSection
        jobs={jobs}
        selectedJob={selectedJob}
        handleJobClick={handleJobClick}
        editHref="/jobs"
      />
      <NextStepsSection
        savedPrograms={savedPrograms}
        selectedProgram={selectedProgram}
        handleProgramClick={handleProgramClick}
        editHref="/next-steps"
      />
    </div>
  );
}
