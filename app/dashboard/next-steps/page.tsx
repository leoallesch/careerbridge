"use client";

import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/layout/page-wrapper";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import NextStepsSection from "@/components/dashboard/next-steps-section";
import { Job, Program } from "@prisma/client";
import { useSession } from "@/lib/auth-client";
import JobsSection from "@/components/dashboard/jobs-section";

export default function JobTrainingTabs() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [programsByJob, setProgramsByJob] = useState<Record<string, Program[]>>(
    {}
  );
  const [favoritedPrograms, setFavoritedPrograms] = useState<number[]>([]);
  const [favoritedProgramDetails, setFavoritedProgramDetails] = useState<
    Program[]
  >([]); // New state for favorited program details
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [selectedSavedProgram, setSelectedSavedProgram] = useState<
    number | null
  >(null); // New state for saved section
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch saved jobs
        const savedJobsRes = await fetch(
          `/api/user-saved/job?userId=${userId}`
        );
        if (!savedJobsRes.ok) {
          const errorData = await savedJobsRes.json();
          throw new Error(errorData.error || "Failed to fetch saved jobs");
        }
        const savedJobsData = await savedJobsRes.json();
        const savedJobIds = savedJobsData.map(
          (item: { jobId: number }) => item.jobId
        );

        if (savedJobIds.length === 0) {
          setSavedJobs([]);
          setProgramsByJob({});
          setLoading(false);
          return;
        }

        const jobsRes = await fetch(
          `/api/jobs?jobIds=${savedJobIds.join(",")}`
        );
        if (!jobsRes.ok) {
          const errorData = await jobsRes.json();
          throw new Error(errorData.error || "Failed to fetch job details");
        }
        const jobsData = await jobsRes.json();
        setSavedJobs(jobsData);

        // Fetch favorited programs
        const favoritedProgramsRes = await fetch(
          `/api/user-saved/program?userId=${userId}`
        );
        if (!favoritedProgramsRes.ok) {
          const errorData = await favoritedProgramsRes.json();
          throw new Error(
            errorData.error || "Failed to fetch favorited programs"
          );
        }
        const favoritedProgramsData = await favoritedProgramsRes.json();
        const favoritedProgramIds = favoritedProgramsData.map(
          (item: { programId: number }) => item.programId
        );
        setFavoritedPrograms(favoritedProgramIds);

        // Fetch favorited program details
        if (favoritedProgramIds.length > 0) {
          const programsRes = await fetch(
            `/api/programs?programIds=${favoritedProgramIds.join(",")}`
          );
          if (!programsRes.ok) {
            const errorData = await programsRes.json();
            throw new Error(
              errorData.error || "Failed to fetch favorited program details"
            );
          }
          const programsData = await programsRes.json();
          setFavoritedProgramDetails(programsData);
        }

        // Fetch programs by job
        const programsMap: Record<string, Program[]> = {};
        for (const job of jobsData) {
          const programsRes = await fetch(
            `/api/programs?industryId=${job.industryId}`
          );
          if (!programsRes.ok) {
            const errorData = await programsRes.json();
            throw new Error(
              errorData.error || `Failed to fetch programs for ${job.jobTitle}`
            );
          }
          const programsData = await programsRes.json();
          programsMap[job.jobTitle] = programsData;
        }
        setProgramsByJob(programsMap);

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
  }, [userId]);

  const handleTabClick = (jobTitle: string) => {
    setSelectedTab(jobTitle);
  };

  const handleProgramClick = (programId: number) => {
    setSelectedProgram((prev) => (prev === programId ? null : programId));
  };

  const handleSavedProgramClick = (programId: number) => {
    setSelectedSavedProgram((prev) => (prev === programId ? null : programId));
  };

  const toggleFavorite = async (programId: number) => {
    if (!userId) {
      console.error("Please sign in to save programs");
      return;
    }

    const isFavorited = favoritedPrograms.includes(programId);
    const previousFavoritedPrograms = [...favoritedPrograms];
    const previousFavoritedProgramDetails = [...favoritedProgramDetails];

    // Optimistic update
    setFavoritedPrograms((prev) =>
      isFavorited ? prev.filter((id) => id !== programId) : [...prev, programId]
    );
    if (isFavorited) {
      setFavoritedProgramDetails((prev) =>
        prev.filter((program) => program.programId !== programId)
      );
    } else {
      // Fetch program details if adding to favorites
      const programRes = await fetch(`/api/programs?programIds=${programId}`);
      if (programRes.ok) {
        const programData = await programRes.json();
        setFavoritedProgramDetails((prev) => [
          ...prev,
          ...programData.filter((p: Program) => p.programId === programId),
        ]);
      }
    }

    try {
      const payload = { userId, id: programId };
      const res = await fetch("/api/user-saved/program", {
        method: isFavorited ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to toggle favorite");
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
      setFavoritedPrograms(previousFavoritedPrograms);
      setFavoritedProgramDetails(previousFavoritedProgramDetails);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <PageWrapper
      title="Next Steps"
      pageNavProps={{
        back: { href: "/dashboard/compare", label: "Compare Jobs" },
        forward: { href: "/dashboard", label: "Finish" },
      }}
      loading={loading}
    >
      <Tabs value={selectedTab || ""} onValueChange={setSelectedTab}>
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
              title={"Next Steps - " + job.jobTitle}
              savedPrograms={programsByJob[job.jobTitle] || []}
              selectedProgram={selectedProgram}
              handleProgramClick={handleProgramClick}
              favoritedPrograms={favoritedPrograms}
              onToggleFavorite={toggleFavorite}
              className="w-full"
            />
          </TabsContent>
        ))}
      </Tabs>
      {/* New Saved Next Steps Section */}
      <NextStepsSection
        title="Saved Next Steps"
        savedPrograms={favoritedProgramDetails}
        selectedProgram={selectedSavedProgram}
        handleProgramClick={handleSavedProgramClick}
        favoritedPrograms={favoritedPrograms}
        onToggleFavorite={toggleFavorite}
        className="mt-8"
      />
    </PageWrapper>
  );
}
