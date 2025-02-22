"use client";

import PageWrapper from "@/components/layout/page-wrapper";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import NextStepsSection from "@/components/dashboard/next-steps-section";
import { Program } from "@/lib/types";
import React, { useEffect, useState } from "react";

export default function JobTrainingTabs() {
  // Define the job training programs with full Program interface compatibility
  const jobTrainingPrograms: Record<string, Program[]> = {
    Electrician: [
      {
        name: "ABC Electrical Training Center",
        school: "ABC Electrical Training Center",
        duration: "2 years",
        description: "Comprehensive electrical training program",
        cost: 8500,
        certification: "Certified Electrician",
        jobPlacementRate: "87%",
      },
      {
        name: "XYZ Electrician School",
        school: "XYZ Electrician School",
        duration: "18 months",
        description: "Hands-on electrician skills course",
        cost: 7000,
        certification: "Electrician Diploma",
        jobPlacementRate: "82%",
      },
      {
        name: "Local IBEW Chapter",
        school: "Local IBEW Chapter",
        duration: "3 years",
        description: "Union-backed electrician apprenticeship",
        cost: 6000,
        certification: "Journeyman Electrician",
        jobPlacementRate: "95%",
      },
    ],
    Plumber: [
      {
        name: "Plumbing Institute of America",
        school: "Plumbing Institute of America",
        duration: "18 months",
        description: "Complete plumbing systems training",
        cost: 7500,
        certification: "Certified Plumber",
        jobPlacementRate: "90%",
      },
      {
        name: "United Association Training Center",
        school: "United Association Training Center",
        duration: "2 years",
        description: "Union plumber training program",
        cost: 6500,
        certification: "Journeyman Plumber",
        jobPlacementRate: "88%",
      },
    ],
    "HVAC Technician": [
      {
        name: "HVAC Technical School",
        school: "HVAC Technical School",
        duration: "1 year",
        description: "HVAC installation and repair training",
        cost: 8000,
        certification: "HVAC Technician Certificate",
        jobPlacementRate: "85%",
      },
      {
        name: "Refrigeration School of Technology",
        school: "Refrigeration School of Technology",
        duration: "15 months",
        description: "Advanced HVAC and refrigeration course",
        cost: 9000,
        certification: "Certified HVAC Technician",
        jobPlacementRate: "89%",
      },
    ],
    Carpenter: [
      {
        name: "Carpentry and Millwork Training Center",
        school: "Carpentry and Millwork Training Center",
        duration: "2 years",
        description: "Hands-on carpentry and woodworking",
        cost: 7000,
        certification: "Carpenter Certificate",
        jobPlacementRate: "83%",
      },
      {
        name: "United Brotherhood of Carpenters",
        school: "United Brotherhood of Carpenters",
        duration: "3 years",
        description: "Union carpentry apprenticeship",
        cost: 5500,
        certification: "Journeyman Carpenter",
        jobPlacementRate: "92%",
      },
    ],
    Welder: [
      {
        name: "Welding Technology Institute",
        school: "Welding Technology Institute",
        duration: "1 year",
        description: "Welding techniques and certification",
        cost: 6500,
        certification: "Certified Welder",
        jobPlacementRate: "80%",
      },
      {
        name: "American Welding Society",
        school: "American Welding Society",
        duration: "18 months",
        description: "Comprehensive welding training",
        cost: 8000,
        certification: "AWS Certified Welder",
        jobPlacementRate: "86%",
      },
    ],
  };

  const [selectedTab, setSelectedTab] = useState<string>(
    Object.keys(jobTrainingPrograms)[0]
  );
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  useEffect(() => {
    setSelectedTab(Object.keys(jobTrainingPrograms)[0]);
    setSelectedProgram(null); // Reset selected program when tab changes
  }, []);

  const handleProgramClick = (programName: string) => {
    if (selectedProgram === programName) {
      setSelectedProgram(null);
    } else {
      setSelectedProgram(programName);
    }
  };

  return (
    <PageWrapper
      title="Next Steps"
      pageNavProps={{
        back: { href: "/compare", label: "Compare Jobs" },
        forward: { href: "/dashboard", label: "Finish" },
      }}
    >
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="flex space-x-4 border-b border-gray-200">
          {Object.keys(jobTrainingPrograms).map((jobTitle) => (
            <TabsTrigger
              key={jobTitle}
              value={jobTitle}
              className="text-lg font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              {jobTitle}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.keys(jobTrainingPrograms).map((jobTitle) => (
          <TabsContent key={jobTitle} value={jobTitle} className="mt-6">
            <NextStepsSection
              savedPrograms={jobTrainingPrograms[jobTitle]}
              selectedProgram={selectedProgram}
              handleProgramClick={handleProgramClick}
              className="w-full"
            />
          </TabsContent>
        ))}
      </Tabs>
    </PageWrapper>
  );
}
