"use client";

import React, { useState } from "react";
import { PiCode } from "react-icons/pi";
import PageWrapper from "@/components/layout/page-wrapper";
import { Tile } from "@/components/tile/tile";
import { TileCarousel } from "@/components/tile/tile-carousel";
import JobsSection from "@/components/dashboard/jobs-section";
import { Job } from "@/lib/types";

const JobsPage = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const handleJobClick = (jobTitle: string) => {
    if (selectedJob === jobTitle) {
      setSelectedJob(null);
    } else {
      setSelectedJob(jobTitle);
    }
  };

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

  return (
    <PageWrapper
      title="Select cards to learn more about each job, favorite the ones you are interested in"
      pageNavProps={{
        back: { href: "/interests", label: "See Interests" },
        forward: { href: "/compare", label: "Compare Jobs" },
      }}
    >
      <TileCarousel>
        <Tile icon={<PiCode size={32} />} text="Home Dashboard" />
        <Tile icon={<PiCode size={32} />} text="User Management" />
        <Tile icon={<PiCode size={32} />} text="System Settings" />
        <Tile icon={<PiCode size={32} />} text="Messages" />
        <Tile icon={<PiCode size={32} />} text="Programming" />
        <Tile icon={<PiCode size={32} />} text="Programming" />
        <Tile icon={<PiCode size={32} />} text="Programming" />
        <Tile icon={<PiCode size={32} />} text="Programming" />
        <Tile icon={<PiCode size={32} />} text="Programming" />
      </TileCarousel>
      <JobsSection
        jobs={jobs}
        selectedJob={selectedJob}
        handleJobClick={handleJobClick}
        className="mt-8"
      />
    </PageWrapper>
  );
};

export default JobsPage;
