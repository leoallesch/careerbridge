import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import DashboardSection from "@/components/dashboard/dashboard-section";
import { DefaultSectionProps } from "@/lib/types";
import { LuSparkles } from "react-icons/lu";

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
      <div className="flex flex-row flex-wrap gap-4">
        <Button
          variant="outline"
          asChild
          className="bg-primary text-white font-semibold text-lg px-4 py-3 rounded-md hover:bg-primary hover:text-white hover:scale-110 transition-transform w-[250px] flex-grow-0 flex-shrink-0"
        >
          <Link
            href="/dashboard/resume"
            className="flex items-center justify-center"
          >
            <LuSparkles className="h-5 w-5 mr-2" />
            <span>AI Skills Builder</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button
          variant="outline"
          asChild
          className="bg-primary text-white font-semibold text-lg px-4 py-3 rounded-md hover:bg-primary hover:text-white hover:scale-110 transition-transform w-[250px] flex-grow-0 flex-shrink-0"
        >
          <Link
            href="/dashboard/interests"
            className="flex items-center justify-center"
          >
            <span>Skills Builder</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </DashboardSection>
  );
}
