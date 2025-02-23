import { Card, CardContent } from "@/components/ui/card";
import NextStepInfoCard from "@/components/dashboard/next-step-info-card";
import DashboardSection from "@/components/dashboard/dashboard-section";
import { DefaultSectionProps } from "@/lib/types";
import { Program } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface NextStepsSectionProps extends DefaultSectionProps {
  title?: string;
  savedPrograms: Program[];
  selectedProgram: number | null;
  handleProgramClick: (programId: number) => void;
  favoritedPrograms?: number[]; // Optional array of favorited program IDs
  onToggleFavorite?: (programId: number) => Promise<void>; // Optional toggle function
}

export default function NextStepsSection({
  title = "Next Steps",
  savedPrograms,
  selectedProgram,
  handleProgramClick,
  favoritedPrograms = [], // Default to empty array
  onToggleFavorite,
  editHref,
  className,
}: NextStepsSectionProps) {
  const canFavorite = !!onToggleFavorite; // Check if favoriting is enabled

  return (
    <DashboardSection title={title} editHref={editHref} className={className}>
      <div className="space-y-4">
        {savedPrograms.length > 0 ? (
          savedPrograms.map((program) => (
            <div key={program.programId}>
              <Card
                className={`cursor-pointer hover:bg-accent transition-colors ${
                  selectedProgram === program.programId
                    ? "bg-accent border-2 border-primary"
                    : ""
                }`}
                onClick={() => handleProgramClick(program.programId)}
              >
                <CardContent className="p-4 relative">
                  <h3 className="font-semibold">{program.schoolName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {program.programName}
                  </p>
                  {canFavorite && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click from triggering
                        onToggleFavorite!(program.programId); // Safe due to canFavorite
                      }}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          favoritedPrograms.includes(program.programId)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-500"
                        }`}
                      />
                    </Button>
                  )}
                </CardContent>
              </Card>
              {selectedProgram === program.programId && (
                <NextStepInfoCard
                  name={program.programName}
                  school={program.schoolName}
                  duration={program.timeToCompletion}
                  cost={program.costOfAttendance}
                  jobPlacementRate={program.jobPlacement}
                  className="mt-4 mb-4 ml-4"
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">
            No saved programs yet. Add some trade school programs to get
            started!
          </p>
        )}
      </div>
    </DashboardSection>
  );
}
