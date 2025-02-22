"use client";

import { useEffect, useState } from "react";
import PathwayExplorationSection from "@/components/dashboard/pathway-exploration-section";
import SkillsSection from "@/components/dashboard/skills-section";
import JobsSection from "@/components/dashboard/jobs-section";
import NextStepsSection from "@/components/dashboard/next-steps-section";
import { Job, Program, Interest } from "@prisma/client";
import { useSession } from "@/lib/auth-client";

export default function Dashboard() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [favoriteJobs, setFavoriteJobs] = useState<Job[]>([]);
  const [savedPrograms, setSavedPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false); // Rely on middleware to redirect if no userId
        return;
      }

      try {
        // Fetch saved interests and extract Interest objects
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
        console.log("Fetched Interests:", interestsData);

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

        // Fetch programs related to saved jobs' industries
        if (jobsData.length > 0) {
          const industryIds = [
            ...new Set(jobsData.map((job) => job.industryId)),
          ];
          const programsPromises = industryIds.map((id) =>
            fetch(`/api/programs?industryId=${id}`).then((res) => {
              if (!res.ok)
                throw new Error(`Failed to fetch programs for industry ${id}`);
              return res.json();
            })
          );
          const programsDataArrays = await Promise.all(programsPromises);
          const allPrograms = programsDataArrays.flat();
          setSavedPrograms(allPrograms);
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

  const handleProgramClick = (programName: string) => {
    setSelectedProgram(selectedProgram === programName ? null : programName);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Skilled Trades Career Dashboard
      </h1>

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
        savedPrograms={savedPrograms}
        selectedProgram={selectedProgram}
        handleProgramClick={handleProgramClick}
        className="w-full"
        editHref="/dashboard/next-steps"
      />
    </div>
  );
}
