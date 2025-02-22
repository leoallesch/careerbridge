"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import DashboardSection from "@/components/dashboard/dashboard-section";
import { DefaultSectionProps } from "@/lib/types";
import { Interest } from "@prisma/client";
import { DynamicFaIcon } from "../icon/dynamic-fa-icon";

interface SkillsSectionProps extends DefaultSectionProps {
  skills: Interest[]; // Changed from string[] to Job[]
}

export default function SkillsSection({
  skills,
  editHref,
  className,
}: SkillsSectionProps) {
  return (
    <DashboardSection title="Skills" editHref={editHref} className={className}>
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent>
          {skills.map((skill) => (
            <CarouselItem
              key={skill.interestId} // Use jobId for unique key
              className="md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square flex-col items-center justify-center p-6 gap-4">
                    <DynamicFaIcon
                      name={skill.icon}
                      className="text-3xl text-primary"
                    />
                    <span className="text-lg font-semibold text-center">
                      {skill.name}
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
    </DashboardSection>
  );
}
