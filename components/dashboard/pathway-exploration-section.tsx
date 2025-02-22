import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import DashboardSection from "@/components/dashboard/dashboard-section";
import { DefaultSectionProps } from "@/lib/types";

export default function PathwayExplorationSection({
  editHref,
  className,
}: DefaultSectionProps) {
  return (
    <DashboardSection
      title="Pathway Exploration"
      editHref={editHref}
      className={className}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" asChild>
          <Link href="/dashboard/interests" className="flex items-center justify-between">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </DashboardSection>
  );
}
