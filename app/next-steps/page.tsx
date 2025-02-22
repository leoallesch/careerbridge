"use client";

import {Tabs,TabsList,TabsTrigger,TabsContent} from "@/components/ui/tabs";
import React from "react";
import {useEffect,useState} from 'react';

export default function JobTrainingTabs() {
  const jobTrainingPrograms={
    "Electrician": [
      {name: "ABC Electrical Training Center",location: "City A"},
      {name: "XYZ Electrician School",location: "City B"},
      {name: "Local IBEW Chapter",location: "City C"},
      // ... more electrician schools
    ],
    "Plumber": [
      {name: "Plumbing Institute of America",location: "City D"},
      {name: "United Association Training Center",location: "City E"},
      // ... more plumber schools
    ],
    "HVAC Technician": [
      {name: "HVAC Technical School",location: "City F"},
      {name: "Refrigeration School of Technology",location: "City G"},
      // ... more HVAC schools
    ],
    "Carpenter": [
      {name: "Carpentry and Millwork Training Center",location: "City H"},
      {name: "United Brotherhood of Carpenters",location: "City I"},
      // ... more carpenter schools
    ],
    "Welder": [
      {name: "Welding Technology Institute",location: "City J"},
      {name: "American Welding Society",location: "City K"},
      // ... more welder schools
    ],
    // ... more job titles and schools
  };

  const [selectedTab,setSelectedTab]=useState(Object.keys(jobTrainingPrograms)[0]); // Auto-select first tab

  useEffect(() => {
    // Set the initial selected tab after component mounts
    setSelectedTab(Object.keys(jobTrainingPrograms)[0]);
  },[]);

  return (
    <div className="flex justify-center items-center h-screen"> {/* Center on screen */}
      <div className="w-3/4 max-w-5xl p-8 bg-white rounded-lg shadow-md"> {/* Larger size, card styling */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}> {/* Controlled component */}
          <TabsList className="flex space-x-4 border-b border-gray-200"> {/* Style the tab list */}
            {Object.keys(jobTrainingPrograms).map((jobTitle) => (
              <TabsTrigger key={jobTitle} value={jobTitle} className="text-lg font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"> {/* Style the tabs */}
                {jobTitle}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(jobTrainingPrograms).map((jobTitle) => (
            <TabsContent key={jobTitle} value={jobTitle} className="mt-6"> {/* Add margin top */}
              <ul className="list-disc pl-6 text-lg"> {/* Style the list */}
                {jobTrainingPrograms[jobTitle].map((school) => (
                  <li key={school.name} className="mb-4"> {/* Add margin bottom to list items */}
                    <strong className="font-semibold">{school.name}</strong> - {school.location}
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}