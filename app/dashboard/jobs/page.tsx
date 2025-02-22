"use client";

import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/layout/page-wrapper";
import { Tile } from "@/components/tile/tile";
import { TileGrid } from "@/components/tile/tile-grid";
import JobsSection from "@/components/dashboard/jobs-section";
import { useSession } from "@/lib/auth-client";
import { Industry, Job } from "@prisma/client";

const JobsPage = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [selectedIndustryId, setSelectedIndustryId] = useState<number | null>(null);
  const [industryJobs, setIndustryJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [favoriteJobs, setFavoriteJobs] = useState<Job[]>([]);
  const [selectedJobIndustry, setSelectedJobIndustry] = useState<string | null>(null);
  const [selectedJobFavorite, setSelectedJobFavorite] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch saved interests
        const savedInterestsRes = await fetch(`/api/user-saved/interest?userId=${userId}`);
        if (!savedInterestsRes.ok) throw new Error("Failed to fetch saved interests");
        const savedInterests = await savedInterestsRes.json();
        const interestIds = savedInterests.map((item) => item.interestId);

        // Fetch industries
        const industriesRes = await fetch(`/api/industries?interestIds=${interestIds.join(",")}`);
        if (!industriesRes.ok) throw new Error("Failed to fetch industries");
        const industriesData = await industriesRes.json();
        setIndustries(industriesData);

        // Fetch saved jobs
        const savedJobsRes = await fetch(`/api/user-saved/job?userId=${userId}`);
        if (!savedJobsRes.ok) throw new Error("Failed to fetch saved jobs");
        const savedJobsData = await savedJobsRes.json();
        const savedJobIds = savedJobsData.map((item: { jobId: number }) => item.jobId);
        setSavedJobs(savedJobIds);

        // Fetch favorite job details
        if (savedJobIds.length > 0) {
          const jobsRes = await fetch(`/api/jobs?jobIds=${savedJobIds.join(",")}`);
          if (!jobsRes.ok) throw new Error("Failed to fetch favorite jobs");
          const jobsData = await jobsRes.json();
          setFavoriteJobs(jobsData);
        }
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [userId]);

  const handleIndustryClick = async (industryId: number) => {
    setSelectedIndustryId(industryId);
    try {
      const jobsRes = await fetch(`/api/jobs?industryId=${industryId}`);
      if (!jobsRes.ok) throw new Error("Failed to fetch industry jobs");
      const jobsData = await jobsRes.json();
      setIndustryJobs(jobsData);
    } catch (err) {
      console.error("Error fetching industry jobs:", err);
      setError(err instanceof Error ? err.message : "Failed to load industry jobs");
      setIndustryJobs([]);
    }
  };

  const toggleFavorite = async (jobId: number) => {
    if (!userId) {
      console.error("Please sign in to save jobs");
      return;
    }

    const isSaved = savedJobs.includes(jobId);
    const previousSavedJobs = [...savedJobs];
    const previousFavoriteJobs = [...favoriteJobs];

    // Optimistic update
    setSavedJobs((prev) => (isSaved ? prev.filter((id) => id !== jobId) : [...prev, jobId]));
    if (isSaved) {
      setFavoriteJobs((prev) => prev.filter((job) => job.jobId !== jobId));
    } else {
      // Fetch the job details if adding to favorites
      const jobRes = await fetch(`/api/jobs?jobIds=${jobId}`);
      if (jobRes.ok) {
        const jobData = await jobRes.json();
        setFavoriteJobs((prev) => [...prev, ...jobData.filter((j: Job) => j.jobId === jobId)]);
      }
    }

    try {
      const payload = { userId, id: jobId };
      const res = await fetch("/api/user-saved/job", {
        method: isSaved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to toggle favorite");
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
      setSavedJobs(previousSavedJobs);
      setFavoriteJobs(previousFavoriteJobs);
    }
  };

  const handleJobClickIndustry = (jobTitle: string) => {
    setSelectedJobIndustry(selectedJobIndustry === jobTitle ? null : jobTitle);
  };

  const handleJobClickFavorite = (jobTitle: string) => {
    setSelectedJobFavorite(selectedJobFavorite === jobTitle ? null : jobTitle);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageWrapper
      title="Select an industry to explore jobs, favorite the ones you are interested in"
      pageNavProps={{
        back: { href: "/dashboard/interests", label: "See Interests" },
        forward: { href: "/dashboard/compare", label: "Compare Jobs" },
      }}
    >
      <TileGrid rows={1} columns={5}>
        {industries.map((industry) => (
          <Tile
            key={industry.industryId}
            icon={industry.icon}
            text={industry.name}
            onClick={() => handleIndustryClick(industry.industryId)}
          />
        ))}
      </TileGrid>

      {selectedIndustryId && (
        <JobsSection
          title={`${industries.find((i) => i.industryId === selectedIndustryId)?.name} Jobs`}
          jobs={industryJobs}
          savedJobs={savedJobs}
          selectedJob={selectedJobIndustry}
          handleJobClick={handleJobClickIndustry}
          onToggleFavorite={toggleFavorite}
          showJobInfo={true}
          className="mt-8"
        />
      )}

      <JobsSection
        title="Favorite Jobs"
        jobs={favoriteJobs}
        savedJobs={savedJobs}
        selectedJob={selectedJobFavorite}
        handleJobClick={handleJobClickFavorite}
        onToggleFavorite={toggleFavorite}
        showJobInfo={false}
        className="mt-8"
      />
    </PageWrapper>
  );
};

export default JobsPage;