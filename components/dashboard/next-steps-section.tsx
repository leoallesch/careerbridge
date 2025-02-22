import { Card, CardContent } from "@/components/ui/card";
import NextStepInfoCard from "@/components/dashboard/next-step-info-card";
import DashboardSection from "@/components/dashboard/dashboard-section";
import { Program, DefaultSectionProps } from "@/lib/types";

interface NextStepsSectionProps extends DefaultSectionProps {
  savedPrograms: Program[];
  selectedProgram: string | null;
  handleProgramClick: (programName: string) => void;
}

export default function NextStepsSection({
  savedPrograms,
  selectedProgram,
  handleProgramClick,
  editHref,
  className,
}: NextStepsSectionProps) {
  const selectedProgramData = savedPrograms.find(
    (program) => program.name === selectedProgram
  );

  return (
    <DashboardSection
      title="Next Steps"
      editHref={editHref}
      className={className}
    >
      <div className="space-y-4">
        {savedPrograms.length > 0 ? (
          savedPrograms.map((program, index) => (
            <Card
              key={index}
              className={`cursor-pointer hover:bg-accent transition-colors ${
                selectedProgram === program.name
                  ? "bg-accent border-2 border-primary"
                  : ""
              }`}
              onClick={() => handleProgramClick(program.name)}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold">{program.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {program.school} - {program.duration}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">
            No saved programs yet. Add some trade school programs to get
            started!
          </p>
        )}
      </div>

      {selectedProgramData && (
        <NextStepInfoCard
          name={selectedProgramData.name}
          school={selectedProgramData.school}
          duration={selectedProgramData.duration}
          description={selectedProgramData.description}
          cost={selectedProgramData.cost}
          certification={selectedProgramData.certification}
          jobPlacementRate={selectedProgramData.jobPlacementRate}
          className="mt-8 mb-8"
        />
      )}
    </DashboardSection>
  );
}
