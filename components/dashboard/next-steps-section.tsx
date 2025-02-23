import {Card,CardContent} from "@/components/ui/card";
import NextStepInfoCard from "@/components/dashboard/next-step-info-card";
import DashboardSection from "@/components/dashboard/dashboard-section";
import {DefaultSectionProps} from "@/lib/types";
import {Program as PrismaProgram} from "@prisma/client"; // Alias to avoid conflict

// Extended Program type with optional fields
interface ExtendedProgram extends PrismaProgram {
  website?: string;
  contactInfo?: string;
  location?: string;
  description?: string;
}

interface NextStepsSectionProps extends DefaultSectionProps {
  title?: string;
  savedPrograms: ExtendedProgram[]; // Use the extended type
  selectedProgram: number|null;
  handleProgramClick: (programId: number) => void;
}

export default function NextStepsSection({
  title="Next Steps",
  savedPrograms,
  selectedProgram,
  handleProgramClick,
  editHref,
  className,
}: NextStepsSectionProps) {
  const selectedProgramData=savedPrograms.find(
    (program) => program.programId===selectedProgram
  );

  return (
    <DashboardSection
      title={title}
      editHref={editHref}
      className={className}
    >
      <div className="space-y-4">
        {savedPrograms.length>0? (
          savedPrograms.map((program) => (
            <Card
              key={program.programId}
              className={`cursor-pointer hover:bg-accent transition-colors ${selectedProgram===program.programId
                ? "bg-accent border-2 border-primary"
                :""
                }`}
              onClick={() => handleProgramClick(program.programId)}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold">{program.programName}</h3>
                <p className="text-sm text-muted-foreground">
                  {program.schoolName} - {program.timeToCompletion}
                  {program.location&&` | ${program.location}`}
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
          website={selectedProgramData.website} // Now type-safe
          contactInfo={selectedProgramData.contactInfo} // Now type-safe
          location={selectedProgramData.location} // Now type-safe
          description={selectedProgramData.description} // Now type-safe
          className="mt-8 mb-8"
        />
      )}
    </DashboardSection>
  );
}