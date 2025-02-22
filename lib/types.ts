export interface Job {
    title: string;
    company: string;
    description: string;
    salary: number;
    requiredTraining: string;
    laborDemand: "High" | "Medium" | "Low";
    roiYears: number;
    promotionOpportunities: "Good" | "Moderate" | "Limited";
  }
  
  export interface Program {
    name: string;
    school: string;
    duration: string;
    description: string;
    cost: number;
    certification: string;
    jobPlacementRate: string;
  }

  export interface DefaultSectionProps {
    editHref?: string;
    className?: string;
  }