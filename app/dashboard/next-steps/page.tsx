"use client";

import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/layout/page-wrapper";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import NextStepsSection from "@/components/dashboard/next-steps-section";
import { Job, Program } from "@prisma/client";
import { useSession } from "@/lib/auth-client";

export default function JobTrainingTabs() {
  const { data: session } = useSession(); // Still use useSession for userId, but no status check
  const userId = session?.user?.id;
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [programsByJob, setProgramsByJob] = useState<Record<string, Program[]>>({});
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedJobsRes = await fetch(`/api/user-saved/job?userId=${userId}`);
        if (!savedJobsRes.ok) {
          const errorData = await savedJobsRes.json();
          throw new Error(errorData.error || "Failed to fetch saved jobs");
        }
        const savedJobsData = await savedJobsRes.json();
        const savedJobIds = savedJobsData.map((item: { jobId: number }) => item.jobId);
        console.log("Saved Job IDs:", savedJobIds); // Debug log

        if (savedJobIds.length === 0) {
          setSavedJobs([]);
          setProgramsByJob({});
          setLoading(false);
          return;
        }

        const jobsRes = await fetch(`/api/jobs?jobIds=${savedJobIds.join(",")}`);
        if (!jobsRes.ok) {
          const errorData = await jobsRes.json();
          throw new Error(errorData.error || "Failed to fetch job details");
        }
        const jobsData = await jobsRes.json();
        setSavedJobs(jobsData);
        console.log("Fetched Jobs:", jobsData); // Debug log

        const programsMap: Record<string, Program[]> = {};
        for (const job of jobsData) {
          const programsRes = await fetch(`/api/programs?industryId=${job.industryId}`);
          if (!programsRes.ok) {
            const errorData = await programsRes.json();
            throw new Error(errorData.error || `Failed to fetch programs for ${job.jobTitle}`);
          }
          const programsData = await programsRes.json();
          console.log(`Programs for ${job.jobTitle}:`, programsData); // Debug log
          programsMap[job.jobTitle] = programsData;
        }
        setProgramsByJob(programsMap);
        console.log("Programs by Job:", programsMap); // Debug log

        if (jobsData.length > 0) {
          setSelectedTab(jobsData[0].jobTitle);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]); // Only depend on userId since middleware ensures auth

  const handleProgramClick = (programName: string) => {
    setSelectedProgram(selectedProgram === programName ? null : programName);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (savedJobs.length === 0) return <div>No saved jobs found</div>;

  console.log("Rendering with savedJobs:", savedJobs); // Debug log
  console.log("Rendering with programsByJob:", programsByJob); // Debug log

  return (
    <PageWrapper
      title="Next Steps"
      pageNavProps={{
        back: { href: "/dashboard/compare", label: "Compare Jobs" },
        forward: { href: "/dashboard", label: "Finish" },
      }}
    >
      <Tabs value={selectedTab || ""} onValueChange={setSelectedTab}>
        <TabsList className="flex space-x-4 border-b border-gray-200">
          {savedJobs.map((job) => (
            <TabsTrigger
              key={job.jobId}
              value={job.jobTitle}
              className="text-lg font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              {job.jobTitle}
            </TabsTrigger>
          ))}
        </TabsList>
        {savedJobs.map((job) => (
          <TabsContent key={job.jobId} value={job.jobTitle} className="mt-6">
            <NextStepsSection
              savedPrograms={programsByJob[job.jobTitle] || []}
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