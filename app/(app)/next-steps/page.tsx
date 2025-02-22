"use client";

import { PageNav } from "@/components/page-nav";
import PageWrapper from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

export default function JobTrainingTabs() {
  const jobTrainingPrograms = {
    Electrician: [
      { name: "ABC Electrical Training Center", location: "City A" },
      { name: "XYZ Electrician School", location: "City B" },
      { name: "Local IBEW Chapter", location: "City C" },
    ],
    Plumber: [
      { name: "Plumbing Institute of America", location: "City D" },
      { name: "United Association Training Center", location: "City E" },
    ],
    "HVAC Technician": [
      { name: "HVAC Technical School", location: "City F" },
      { name: "Refrigeration School of Technology", location: "City G" },
    ],
    Carpenter: [
      { name: "Carpentry and Millwork Training Center", location: "City H" },
      { name: "United Brotherhood of Carpenters", location: "City I" },
    ],
    Welder: [
      { name: "Welding Technology Institute", location: "City J" },
      { name: "American Welding Society", location: "City K" },
    ],
  };

  const [selectedTab, setSelectedTab] = useState(
    Object.keys(jobTrainingPrograms)[0]
  );

  useEffect(() => {
    setSelectedTab(Object.keys(jobTrainingPrograms)[0]);
  }, []);

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
            <ul className="list-disc pl-6 text-lg">
              {jobTrainingPrograms[jobTitle].map((school) => (
                <li key={school.name} className="mb-4">
                  <strong className="font-semibold">{school.name}</strong> -{" "}
                  {school.location}
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </PageWrapper>
  );
}
