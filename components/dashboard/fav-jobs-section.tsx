import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FavoriteableJobCard from "@/components/dashboard/fav-job-card";
import DashboardSection from "@/components/dashboard/dashboard-section";
import {Job,DefaultSectionProps} from "@/lib/types";


interface FavoriteableJobsSectionProps extends DefaultSectionProps {
  jobs: Job[];
  favoriteJobs: Job[]; // Added to receive favorite jobs from parent
  selectedJob: string|null;
  handleJobClick: (jobTitle: string) => void;
  onFavorite: (title: string) => void; // Added to receive favorite handler from parent
}

const FavoriteableJobsSection=({
  jobs,
  favoriteJobs,
  selectedJob,
  handleJobClick,
  onFavorite,
  editHref,
  className,
}: FavoriteableJobsSectionProps) => {
  return (
    <DashboardSection title="Jobs" editHref={editHref} className={className}>
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent>
          {jobs.map((job,index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                <FavoriteableJobCard
                  job={job}
                  isFavorite={favoriteJobs.some((favJob) => favJob.title===job.title)}
                  onFavorite={onFavorite}
                  isSelected={selectedJob===job.title}
                  onClick={handleJobClick}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </DashboardSection>
  );
};

export default FavoriteableJobsSection;