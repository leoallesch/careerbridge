"use client";

import { useEffect, useState } from "react";
import PathwayExplorationSection from "@/components/dashboard/pathway-exploration-section";
import SkillsSection from "@/components/dashboard/skills-section";
import JobsSection from "@/components/dashboard/jobs-section";
import NextStepsSection from "@/components/dashboard/next-steps-section";
import { Job, Program, Interest } from "@prisma/client";
import { useSession } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [favoriteJobs, setFavoriteJobs] = useState<Job[]>([]);
  const [savedPrograms, setSavedPrograms] = useState<number[]>([]); // Changed to store program IDs
  const [favoritePrograms, setFavoritePrograms] = useState<Program[]>([]); // New state for program details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false); // Rely on middleware to redirect if no userId
        return;
      }

      try {
        // Fetch saved interests
        const savedInterestsRes = await fetch(
          `/api/user-saved/interest?userId=${userId}`
        );
        if (!savedInterestsRes.ok)
          throw new Error("Failed to fetch saved interests");
        const savedInterestsData = await savedInterestsRes.json();
        const interestsData = savedInterestsData.map(
          (item: { interest: Interest }) => item.interest
        );
        setInterests(interestsData);

        // Fetch saved jobs
        const savedJobsRes = await fetch(
          `/api/user-saved/job?userId=${userId}`
        );
        if (!savedJobsRes.ok) throw new Error("Failed to fetch saved jobs");
        const savedJobsData = await savedJobsRes.json();
        const savedJobIds = savedJobsData.map(
          (item: { jobId: number }) => item.jobId
        );
        setSavedJobs(savedJobIds);

        // Fetch favorite job details
        let jobsData: Job[] = [];
        if (savedJobIds.length > 0) {
          const jobsRes = await fetch(
            `/api/jobs?jobIds=${savedJobIds.join(",")}`
          );
          if (!jobsRes.ok) throw new Error("Failed to fetch favorite jobs");
          jobsData = await jobsRes.json();
          setFavoriteJobs(jobsData);
        }

        // Fetch saved programs
        const savedProgramsRes = await fetch(
          `/api/user-saved/program?userId=${userId}`
        );
        if (!savedProgramsRes.ok)
          throw new Error("Failed to fetch saved programs");
        const savedProgramsData = await savedProgramsRes.json();
        const savedProgramIds = savedProgramsData.map(
          (item: { programId: number }) => item.programId
        );
        setSavedPrograms(savedProgramIds);

        // Fetch favorite program details
        if (savedProgramIds.length > 0) {
          const programsRes = await fetch(
            `/api/programs?programIds=${savedProgramIds.join(",")}`
          );
          if (!programsRes.ok)
            throw new Error("Failed to fetch favorite programs");
          const programsData = await programsRes.json();
          setFavoritePrograms(programsData);
        }
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleJobClick = (jobTitle: string) => {
    setSelectedJob(selectedJob === jobTitle ? null : jobTitle);
  };

  const handleProgramClick = (programId: number) => {
    setSelectedProgram(selectedProgram === programId ? null : programId);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-10 w-1/4 mb-8" />
        <div className="mb-8">
          <Skeleton className="h-6 w-1/5 mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="mb-8">
          <Skeleton className="h-6 w-1/5 mb-4" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="mb-8">
          <Skeleton className="h-6 w-1/5 mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-6 w-1/5 mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

      <PathwayExplorationSection />
      <SkillsSection skills={interests} editHref="/dashboard/interests" />
      <JobsSection
        title="Saved Jobs"
        jobs={favoriteJobs}
        savedJobs={savedJobs}
        selectedJob={selectedJob}
        handleJobClick={handleJobClick}
        showJobInfo={true}
        editHref="/dashboard/jobs"
      />
      <NextStepsSection
        title="Saved Next Steps"
        savedPrograms={favoritePrograms} // Use favoritePrograms instead of savedPrograms
        selectedProgram={selectedProgram}
        handleProgramClick={handleProgramClick}
        className="w-full"
        editHref="/dashboard/next-steps"
      />
    </div>
  );
}
