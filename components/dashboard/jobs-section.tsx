import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import JobInfoCard from "@/components/dashboard/job-info-card";
import DashboardSection from "@/components/dashboard/dashboard-section";
import { Job, DefaultSectionProps } from "@/lib/types";

interface JobsSectionProps extends DefaultSectionProps {
  jobs: Job[];
  selectedJob: string | null;
  handleJobClick: (jobTitle: string) => void;
}

export default function JobsSection({
  jobs,
  selectedJob,
  handleJobClick,
  editHref,
  className,
}: JobsSectionProps) {
  const selectedJobData = jobs.find((job) => job.title === selectedJob);

  return (
    <DashboardSection title="Jobs" editHref={editHref} className={className}>
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent>
          {jobs.map((job, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                <Card
                  className={`cursor-pointer hover:bg-accent transition-colors ${
                    selectedJob === job.title
                      ? "bg-accent border-2 border-primary"
                      : ""
                  }`}
                  onClick={() => handleJobClick(job.title)}
                >
                  <CardContent className="flex aspect-square flex-col items-center justify-center p-6">
                    <span className="text-lg font-semibold">{job.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {job.company}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {selectedJobData && (
        <JobInfoCard
          title={selectedJobData.title}
          description={selectedJobData.description}
          salary={selectedJobData.salary}
          requiredTraining={selectedJobData.requiredTraining}
          laborDemand={selectedJobData.laborDemand}
          roiYears={selectedJobData.roiYears}
          promotionOpportunities={selectedJobData.promotionOpportunities}
          className="mt-8 mb-8"
        />
      )}
    </DashboardSection>
  );
}
