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

interface SkillsSectionProps extends DefaultSectionProps {
  skills: string[];
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
          {skills.map((skill, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-lg font-semibold text-center">
                      {skill}
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
