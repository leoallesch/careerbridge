"use client";

import React,{useState,useEffect} from "react";
import PageWrapper from "@/components/layout/page-wrapper";
import {Tabs,TabsContent} from "@/components/ui/tabs";
import NextStepsSection from "@/components/dashboard/next-steps-section";
import {Job,Program} from "@prisma/client";
import {useSession} from "@/lib/auth-client";
import JobsSection from "@/components/dashboard/jobs-section"; // Import the new component

export default function JobTrainingTabs() {
  const {data: session}=useSession();
  const userId=session?.user?.id;
  const [savedJobs,setSavedJobs]=useState<Job[]>([]);
  const [programsByJob,setProgramsByJob]=useState<Record<string,Program[]>>({});
  const [selectedTab,setSelectedTab]=useState<string|null>(null);
  const [selectedProgram,setSelectedProgram]=useState<number|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);

  useEffect(() => {
    const fetchData=async () => {
      try {
        const savedJobsRes=await fetch(`/api/user-saved/job?userId=${userId}`);
        if(!savedJobsRes.ok) {
          const errorData=await savedJobsRes.json();
          throw new Error(errorData.error||"Failed to fetch saved jobs");
        }
        const savedJobsData=await savedJobsRes.json();
        const savedJobIds=savedJobsData.map((item: {jobId: number;}) => item.jobId);

        if(savedJobIds.length===0) {
          setSavedJobs([]);
          setProgramsByJob({});
          setLoading(false);
          return;
        }

        const jobsRes=await fetch(`/api/jobs?jobIds=${savedJobIds.join(",")}`);
        if(!jobsRes.ok) {
          const errorData=await jobsRes.json();
          throw new Error(errorData.error||"Failed to fetch job details");
        }
        const jobsData=await jobsRes.json();
        setSavedJobs(jobsData);

        const programsMap: Record<string,Program[]>={};
        for(const job of jobsData) {
          const programsRes=await fetch(`/api/programs?industryId=${job.industryId}`);
          if(!programsRes.ok) {
            const errorData=await programsRes.json();
            throw new Error(errorData.error||`Failed to fetch programs for ${job.jobTitle}`);
          }
          const programsData=await programsRes.json();
          programsMap[job.jobTitle]=programsData;
        }
        setProgramsByJob(programsMap);

        if(jobsData.length>0) {
          setSelectedTab(jobsData[0].jobTitle);
        }
      } catch(err) {
        console.error("Error fetching data:",err);
        setError(err instanceof Error? err.message:"An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[userId]);

  const handleTabClick=(jobTitle: string) => {
    setSelectedTab(jobTitle);
  };

  const handleProgramClick=(programId: number) => {
    setSelectedProgram((prev) => (prev===programId? null:programId));
  };

  if(loading) return <div>Loading...</div>;
  if(error) return <div>Error: {error}</div>;
  if(savedJobs.length===0) return <div>No saved jobs found</div>;

  return (
    <PageWrapper
      title="Next Steps"
      pageNavProps={{
        back: {href: "/dashboard/compare",label: "Compare Jobs"},
        forward: {href: "/dashboard",label: "Finish"},
      }}
    >
      <Tabs value={selectedTab||""} onValueChange={setSelectedTab}>
        <JobsSection
          title="Favorited Jobs"
          jobs={savedJobs}
          selectedJob={selectedTab}
          handleJobClick={handleTabClick}
          className="mb-6"
        />
        {savedJobs.map((job) => (
          <TabsContent key={job.jobId} value={job.jobTitle} className="mt-6">
            <NextStepsSection
              savedPrograms={programsByJob[job.jobTitle]||[]}
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