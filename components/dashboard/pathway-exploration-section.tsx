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
      <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
        <Button
          variant="outline"
          asChild
          className="bg-primary text-white font-semibold text-lg pl-3 pr-3 rounded-md hover:bg-primary hover:text-white hover:scale-110"
        >
          <Link
            href="/dashboard/interests"
            className="flex items-center justify-between"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </DashboardSection>
  );
}
