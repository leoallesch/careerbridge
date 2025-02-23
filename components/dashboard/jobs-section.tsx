// components/dashboard/JobsByIndustrySection.tsx
"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {Card,CardContent} from "@/components/ui/card";
import JobInfoCard from "@/components/dashboard/job-info-card";
import DashboardSection from "@/components/dashboard/dashboard-section";
import {Job} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {Heart} from "lucide-react";

interface JobsSectionProps {
  title?: string;
  jobs: Job[];
  savedJobs?: number[]; // Optional
  selectedJob: string|null;
  handleJobClick: (jobTitle: string) => void;
  onToggleFavorite?: (jobId: number) => Promise<void>; // Optional
  showJobInfo?: boolean;
  className?: string;
  editHref?: string;
}

export default function JobsSection({
  title="Industry Jobs",
  jobs,
  savedJobs=[],
  selectedJob,
  handleJobClick,
  onToggleFavorite,
  showJobInfo=false,
  className,
  editHref,
}: JobsSectionProps) {
  const selectedJobData=jobs.find((job) => job.jobTitle===selectedJob);
  const canFavorite=!!onToggleFavorite; // Check if favoriting is enabled

  return (
    <DashboardSection title={title} className={className} editHref={editHref}>
      {jobs.length===0? (
        <div className="text-center py-8">No jobs found</div>
      ):(
        <Carousel className="w-full max-w-3xl mx-auto">
          <CarouselContent>
            {jobs.map((job) => (
              <CarouselItem
                key={job.jobId}
                className="md:basis-1/3 lg:basis-1/4"
              >
                <div className="p-3">
                  <Card
                    className={`cursor-pointer hover:bg-accent hover:shadow-lg hover:scale-105 transition-all duration-200 ${selectedJob===job.jobTitle
                      ? "bg-accent border-2 border-primary"
                      :""
                      }`}
                    onClick={() => handleJobClick(job.jobTitle)}
                  >
                    <CardContent className="flex aspect-square flex-col items-center justify-center p-6 relative">
                      <span className="text-lg font-semibold">
                        {job.jobTitle}
                      </span>
                      {canFavorite&&(
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite!(job.jobId); // Safe due to canFavorite check
                          }}
                        >
                          <Heart
                            className={`h-5 w-5 ${savedJobs.includes(job.jobId)
                              ? "fill-red-500 text-red-500"
                              :"text-gray-500"
                              }`}
                          />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}

      {showJobInfo&&selectedJobData&&(
        <JobInfoCard
          title={selectedJobData.jobTitle}
          description={selectedJobData.jobDesc}
          salary={selectedJobData.avgSalary}
          requiredTraining={selectedJobData.requiredTraining}
          laborDemand={selectedJobData.growthOpportunities}
          roiYears={selectedJobData.roiYears}
          promotionOpportunities={selectedJobData.growthOpportunities}
          className="mt-8 mb-8"
        />
      )}
    </DashboardSection>
  );
}
