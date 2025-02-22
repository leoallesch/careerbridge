"use client";

import React,{useState,useEffect} from "react";
import {PiCode} from "react-icons/pi";
import PageWrapper from "@/components/layout/page-wrapper";
import {Tile} from "@/components/tile/tile";
import {TileCarousel} from "@/components/tile/tile-carousel";
import FavoriteableJobsSection from "@/components/dashboard/fav-jobs-section";
import {Job} from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FavoriteableJobCard from "@/components/dashboard/fav-job-card";
import DashboardSection from "@/components/dashboard/dashboard-section";

const JobsPage=() => {
  const [selectedJob,setSelectedJob]=useState<string|null>(null);
  const [favoriteJobs,setFavoriteJobs]=useState<Job[]>([]);

  const handleJobClick=(jobTitle: string) => setSelectedJob(jobTitle);

  // Sample jobs with full details
  const jobs: Job[]=[
    {
      title: "Carpenter",
      company: "BuildRight Co",
      description: "Constructs and repairs building frameworks",
      salary: 55000,
      requiredTraining: "Apprenticeship or vocational training",
      laborDemand: "High",
      roiYears: 2,
      promotionOpportunities: "Good",
    },
    {
      title: "Plumber",
      company: "FlowFix Inc",
      description: "Installs and maintains piping systems",
      salary: 60000,
      requiredTraining: "Apprenticeship and licensing",
      laborDemand: "High",
      roiYears: 2,
      promotionOpportunities: "Moderate",
    },
    {
      title: "Electrician",
      company: "SparkTech",
      description: "Installs and maintains electrical systems",
      salary: 65000,
      requiredTraining: "Apprenticeship and certification",
      laborDemand: "High",
      roiYears: 2,
      promotionOpportunities: "Good",
    },
    {
      title: "Welder",
      company: "MetalWorks Ltd",
      description: "Joins metal parts using various techniques",
      salary: 50000,
      requiredTraining: "Vocational training and certification",
      laborDemand: "Medium",
      roiYears: 3,
      promotionOpportunities: "Moderate",
    },
    {
      title: "Mason",
      company: "StoneCraft",
      description: "Builds structures with brick and stone",
      salary: 52000,
      requiredTraining: "Apprenticeship or on-the-job training",
      laborDemand: "Medium",
      roiYears: 3,
      promotionOpportunities: "Limited",
    },
    {
      title: "HVAC Technician",
      company: "CoolAir Solutions",
      description: "Installs and repairs heating/cooling systems",
      salary: 58000,
      requiredTraining: "Technical training and certification",
      laborDemand: "High",
      roiYears: 2,
      promotionOpportunities: "Good",
    },
  ];

  // Load favorite jobs from local storage on mount
  useEffect(() => {
    const storedFavorites=localStorage.getItem("favoriteJobs");
    if(storedFavorites) {
      try {
        const parsedFavorites=JSON.parse(storedFavorites);
        setFavoriteJobs(parsedFavorites);
      } catch(error) {
        console.error("Error parsing stored favorites:",error);
        setFavoriteJobs([]);
      }
    } else {
      setFavoriteJobs([]);
    }
  },[]);

  // Save favorite jobs to local storage when they change
  useEffect(() => {
    localStorage.setItem("favoriteJobs",JSON.stringify(favoriteJobs));
  },[favoriteJobs]);

  // Handle favoriting/unfavoriting
  const handleFavorite=(title: string) => {
    const jobToFavorite=jobs.find((job) => job.title===title);
    if(jobToFavorite) {
      const isAlreadyFavorite=favoriteJobs.some((favJob) => favJob.title===title);
      if(isAlreadyFavorite) {
        setFavoriteJobs(favoriteJobs.filter((favJob) => favJob.title!==title));
      } else {
        setFavoriteJobs([...favoriteJobs,jobToFavorite]);
      }
    }
  };

  return (
    <PageWrapper
      title="Select cards to learn more about each job, favorite the ones you are interested in"
      pageNavProps={{
        back: {href: "/interests",label: "See Interests"},
        forward: {href: "/compare",label: "Compare Jobs"},
      }}
    >
      <TileCarousel>
        <Tile icon={<PiCode size={32} />} text="Home Dashboard" />
        <Tile icon={<PiCode size={32} />} text="User Management" />
        <Tile icon={<PiCode size={32} />} text="System Settings" />
        <Tile icon={<PiCode size={32} />} text="Messages" />
        <Tile icon={<PiCode size={32} />} text="Programming" />
        <Tile icon={<PiCode size={32} />} text="Programming" />
        <Tile icon={<PiCode size={32} />} text="Programming" />
        <Tile icon={<PiCode size={32} />} text="Programming" />
        <Tile icon={<PiCode size={32} />} text="Programming" />
      </TileCarousel>

      {/* Main Jobs Section */}
      <FavoriteableJobsSection
        jobs={jobs}
        favoriteJobs={favoriteJobs}
        selectedJob={selectedJob}
        handleJobClick={handleJobClick}
        onFavorite={handleFavorite}
        className="mt-8"
      />

      {/* Favorite Jobs Section */}
      {favoriteJobs.length>0&&(
        <DashboardSection title="Favorite Jobs" className="mt-8">
          <Carousel className="w-full max-w-3xl mx-auto">
            <CarouselContent>
              {favoriteJobs.map((job,index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <FavoriteableJobCard
                      job={job}
                      isFavorite={true}
                      onFavorite={handleFavorite}
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
      )}
    </PageWrapper>
  );
};

export default JobsPage;