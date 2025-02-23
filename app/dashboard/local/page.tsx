"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Program as PrismaProgram } from "@prisma/client";
import PageWrapper from "@/components/layout/page-wrapper";

// Extended Program type with optional fields
interface ExtendedProgram extends PrismaProgram {
  description?: string;
}

export default function Localpage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const savedPrograms: ExtendedProgram[] = [
    {
      programId: 1,
      industryId: 1,
      schoolName: "Jefferson Community and Technical College",
      programName: "Nursing Assistant Program",
      website: "https://jefferson.kctcs.edu",
      contactInfo: "admissions@jefferson.kctcs.edu",
      costOfAttendance: 4500,
      timeToCompletion: 0.25,
      acceptanceRate: 0.95,
      jobPlacement: 0.85,
      location: "Louisville, KY",
      description:
        "This program trains students to become Certified Nursing Assistants (CNAs), focusing on patient care, hygiene, and basic medical procedures. Graduates assist nurses in hospitals, nursing homes, and home health settings.",
    },
    {
      programId: 2,
      industryId: 2,
      schoolName: "Ivy Tech Community College",
      programName: "Welding Technology Certificate",
      website: "https://www.ivytech.edu",
      contactInfo: "info@ivytech.edu",
      costOfAttendance: 6000,
      timeToCompletion: 1,
      acceptanceRate: 0.9,
      jobPlacement: 0.9,
      location: "Indianapolis, IN",
      description:
        "Learn welding techniques like MIG, TIG, and stick welding, along with blueprint reading and metal fabrication. Prepares students for careers in manufacturing, construction, and repair shops.",
    },
    {
      programId: 3,
      industryId: 3,
      schoolName: "Bluegrass Community and Technical College",
      programName: "Automotive Technology Program",
      website: "https://bluegrass.kctcs.edu",
      contactInfo: "bluegrass-admissions@kctcs.edu",
      costOfAttendance: 8000,
      timeToCompletion: 2,
      acceptanceRate: 0.95,
      jobPlacement: 0.87,
      location: "Lexington, KY",
      description:
        "This program covers automotive repair, diagnostics, and maintenance, including engines, brakes, and electrical systems. Graduates can work as auto technicians in dealerships or repair shops.",
    },
    {
      programId: 4,
      industryId: 4,
      schoolName: "Sullivan University",
      programName: "Electrical Construction and Maintenance Diploma",
      website: "https://www.sullivan.edu",
      contactInfo: "admissions@sullivan.edu",
      costOfAttendance: 12000,
      timeToCompletion: 1.5,
      acceptanceRate: 0.85,
      jobPlacement: 0.89,
      location: "Louisville, KY",
      description:
        "Gain hands-on skills in electrical wiring, circuit installation, and maintenance for residential and commercial buildings. Graduates are ready for apprentice electrician roles or further certification.",
    },
    {
      programId: 5,
      industryId: 5,
      schoolName: "Vincennes University",
      programName: "Heating, Ventilation, and Air Conditioning Certificate",
      website: "https://www.vinu.edu",
      contactInfo: "vuadmit@vinu.edu",
      costOfAttendance: 7000,
      timeToCompletion: 1,
      acceptanceRate: 0.9,
      jobPlacement: 0.91,
      location: "Vincennes, IN",
      description:
        "Focuses on installing, repairing, and maintaining HVAC systems, covering refrigeration, heating, and air quality control. Prepares students for HVAC technician jobs in a growing field.",
    },
    {
      programId: 6,
      industryId: 6,
      schoolName: "Elizabethtown Community and Technical College",
      programName: "Plumbing Technology Certificate",
      website: "https://elizabethtown.kctcs.edu",
      contactInfo: "ectc-admissions@kctcs.edu",
      costOfAttendance: 5500,
      timeToCompletion: 1,
      acceptanceRate: 0.95,
      jobPlacement: 0.88,
      location: "Elizabethtown, KY",
      description:
        "Teaches pipe installation, water supply systems, and drainage repair for residential and commercial plumbing. Graduates can pursue apprenticeships or entry-level plumbing positions.",
    },
    {
      programId: 7,
      industryId: 7,
      schoolName: "Ivy Tech Community College",
      programName: "Carpentry Certificate",
      website: "https://www.ivytech.edu",
      contactInfo: "info@ivytech.edu",
      costOfAttendance: 6500,
      timeToCompletion: 1,
      acceptanceRate: 0.9,
      jobPlacement: 0.86,
      location: "Evansville, IN",
      description:
        "Covers woodworking, framing, and construction techniques for building homes and structures. Equips students for carpentry jobs in construction or renovation industries.",
    },
    {
      programId: 8,
      industryId: 1,
      schoolName: "MedQuest College",
      programName: "Dental Assistant Program",
      website: "https://medquestcollege.edu",
      contactInfo: "info@medquestcollege.edu",
      costOfAttendance: 15000,
      timeToCompletion: 1,
      acceptanceRate: 0.8,
      jobPlacement: 0.9,
      location: "Louisville, KY",
      description:
        "Trains students in dental procedures, patient care, and office management. Graduates assist dentists in clinics, performing tasks like X-rays and chairside support.",
    },
    {
      programId: 9,
      industryId: 8,
      schoolName: "Southcentral Kentucky Community and Technical College",
      programName: "Machine Tool Technology Program",
      website: "https://southcentral.kctcs.edu",
      contactInfo: "southcentral-admissions@kctcs.edu",
      costOfAttendance: 7500,
      timeToCompletion: 2,
      acceptanceRate: 0.95,
      jobPlacement: 0.89,
      location: "Bowling Green, KY",
      description:
        "Focuses on CNC machining, lathe operation, and precision manufacturing. Prepares students for machinist roles in industrial and aerospace sectors.",
    },
    {
      programId: 10,
      industryId: 9,
      schoolName: "Lincoln Tech",
      programName: "Diesel Technology Program",
      website: "https://www.lincolntech.edu",
      contactInfo: "info@lincolntech.edu",
      costOfAttendance: 18000,
      timeToCompletion: 1.5,
      acceptanceRate: 0.85,
      jobPlacement: 0.92,
      location: "Indianapolis, IN",
      description:
        "Teaches repair and maintenance of diesel engines for trucks, buses, and heavy equipment. Graduates can work as diesel technicians in transportation or construction.",
    },
    {
      programId: 11,
      industryId: 5,
      schoolName: "Ashland Community and Technical College",
      programName: "HVAC Technician Certificate",
      website: "https://ashland.kctcs.edu",
      contactInfo: "ashland-admissions@kctcs.edu",
      costOfAttendance: 6000,
      timeToCompletion: 1,
      acceptanceRate: 0.95,
      jobPlacement: 0.9,
      location: "Ashland, KY",
      description:
        "Provides skills in HVAC system installation, troubleshooting, and repair, with a focus on energy efficiency. Prepares students for technician roles in residential and commercial settings.",
    },
    {
      programId: 12,
      industryId: 2,
      schoolName: "Ivy Tech Community College",
      programName: "Advanced Welding Certificate",
      website: "https://www.ivytech.edu",
      contactInfo: "info@ivytech.edu",
      costOfAttendance: 8000,
      timeToCompletion: 1.5,
      acceptanceRate: 0.9,
      jobPlacement: 0.91,
      location: "Fort Wayne, IN",
      description:
        "An advanced program building on basic welding skills, emphasizing structural welding and pipe welding. Ideal for careers in heavy industry or pipeline construction.",
    },
    {
      programId: 13,
      industryId: 10,
      schoolName: "Sullivan University",
      programName: "Professional Cook Certificate",
      website: "https://www.sullivan.edu",
      contactInfo: "admissions@sullivan.edu",
      costOfAttendance: 10000,
      timeToCompletion: 1,
      acceptanceRate: 0.85,
      jobPlacement: 0.87,
      location: "Lexington, KY",
      description:
        "Covers culinary techniques, food safety, and kitchen management for aspiring cooks. Graduates can work in restaurants, catering, or institutional kitchens.",
    },
    {
      programId: 14,
      industryId: 11,
      schoolName: "Ivy Tech Community College",
      programName: "Building Construction Technology Certificate",
      website: "https://www.ivytech.edu",
      contactInfo: "info@ivytech.edu",
      costOfAttendance: 7000,
      timeToCompletion: 1,
      acceptanceRate: 0.9,
      jobPlacement: 0.88,
      location: "Bloomington, IN",
      description:
        "Teaches construction fundamentals like masonry, framing, and site preparation. Prepares students for entry-level roles in residential or commercial construction.",
    },
    {
      programId: 15,
      industryId: 12,
      schoolName: "PJ’s College of Cosmetology",
      programName: "Cosmetology Program",
      website: "https://gotopjs.com",
      contactInfo: "info@gotopjs.com",
      costOfAttendance: 16000,
      timeToCompletion: 1.5,
      acceptanceRate: 0.8,
      jobPlacement: 0.85,
      location: "Clarksville, IN",
      description:
        "Covers hair styling, skincare, and nail technology, preparing students for state licensure. Graduates can work as cosmetologists in salons or start their own businesses.",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false); // Rely on middleware to redirect if no userId
        return;
      }

      try {
        // Future API integration can go here
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleProgramClick = (programId: number) => {
    setSelectedProgram(selectedProgram === programId ? null : programId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageWrapper title="Local Schools and Programs">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Sponsored</h2>
        {savedPrograms.length > 0 ? (
          savedPrograms.map((program) => (
            <div key={program.programId} className="space-y-2">
              <Card
                className={`cursor-pointer hover:bg-accent transition-colors w-full ${
                  selectedProgram === program.programId
                    ? "bg-accent border-2 border-primary"
                    : ""
                }`}
                onClick={() => handleProgramClick(program.programId)}
              >
                <CardHeader>
                  <CardTitle>{program.programName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {program.schoolName}
                  </p>
                </CardContent>
              </Card>
              {selectedProgram === program.programId && (
                <Card className="mt-2">
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <p>
                        <strong>Location:</strong> {program.location}
                      </p>
                      <p>
                        <strong>Duration:</strong> {program.timeToCompletion}{" "}
                        years
                      </p>
                      <p>
                        <strong>Cost:</strong> $
                        {program.costOfAttendance?.toLocaleString()}
                      </p>
                      <p>
                        <strong>Job Placement Rate:</strong>{" "}
                        {(program.jobPlacement * 100).toFixed(0)}%
                      </p>
                      <p>
                        <strong>Description:</strong> {program.description}
                      </p>
                      <p>
                        <strong>Website:</strong>{" "}
                        <a
                          href={program.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {program.website}
                        </a>
                      </p>
                      <p>
                        <strong>Contact:</strong> {program.contactInfo}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">
            No programs available at this time.
          </p>
        )}
      </div>
    </PageWrapper>
  );
}
