import {Card,CardContent} from "@/components/ui/card";
import NextStepInfoCard from "@/components/dashboard/next-step-info-card";
import DashboardSection from "@/components/dashboard/dashboard-section";
import {DefaultSectionProps} from "@/lib/types";
import {Program} from "@prisma/client";

interface NextStepsSectionProps extends DefaultSectionProps {
  savedPrograms: Program[];
  selectedProgram: number|null; // Changed from string | null to number | null
  handleProgramClick: (programId: number) => void; // Changed from string to number
}

export default function NextStepsSection({
  savedPrograms,
  selectedProgram,
  handleProgramClick,
  editHref,
  className,
}: NextStepsSectionProps) {
  const selectedProgramData=savedPrograms.find(
    (program) => program.programId===selectedProgram // Now type-safe
  );

  return (
    <DashboardSection
      title="Next Steps"
      editHref={editHref}
      className={className}
    >
      <div className="space-y-4">
        {savedPrograms.length>0? (
          savedPrograms.map((program) => (
            <Card
              key={program.programId} // Use programId as the key
              className={`cursor-pointer hover:bg-accent transition-colors ${selectedProgram===program.programId
                ? "bg-accent border-2 border-primary"
                :""
                }`}
              onClick={() => handleProgramClick(program.programId)} // Pass programId
            >
              <CardContent className="p-4">
                <h3 className="font-semibold">{program.programName}</h3>
                <p className="text-sm text-muted-foreground">
                  {program.schoolName} - {program.timeToCompletion}
                </p>
              </CardContent>
            </Card>
          ))
        ):(
          <p className="text-muted-foreground">
            No saved programs yet. Add some trade school programs to get
            started!
          </p>
        )}
      </div>

      {selectedProgramData&&(
        <NextStepInfoCard
          name={selectedProgramData.programName}
          school={selectedProgramData.schoolName}
          duration={selectedProgramData.timeToCompletion}
          cost={selectedProgramData.costOfAttendance}
          jobPlacementRate={selectedProgramData.jobPlacement}
          className="mt-8 mb-8"
        />
      )}
    </DashboardSection>
  );
}