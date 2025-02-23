"use client";

import React,{useState,useEffect} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Tabs,TabsList,TabsTrigger} from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {Bar,BarChart,CartesianGrid,XAxis} from "recharts";
import {Card,CardContent,CardHeader} from "@/components/ui/card";
import PageWrapper from "@/components/layout/page-wrapper";
import {useSession} from "@/lib/auth-client";
import {Job} from "@prisma/client";

// Define the attributes we want to display
type JobAttribute=
  |"avgSalary"
  |"avgTrainingCost"
  |"avgTrainingTime"
  |"roiYears";

const attributeOptions=[
  {value: "avgSalary" as const,label: "Salary ($)"},
  {value: "avgTrainingCost" as const,label: "Training Cost ($)"},
  {value: "avgTrainingTime" as const,label: "Training Time (years)"},
  {value: "roiYears" as const,label: "ROI (years)"},
];

export default function JobTablePage() {
  const {data: session}=useSession();
  const userId=session?.user?.id;
  const [jobsData,setJobsData]=useState<Job[]>([]);
  const [selectedAttribute,setSelectedAttribute]=
    useState<JobAttribute>("avgSalary");
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);

  useEffect(() => {
    const fetchSavedJobs=async () => {
      try {
        // Fetch saved job IDs
        const savedJobsRes=await fetch(
          `/api/user-saved/job?userId=${userId}`
        );
        if(!savedJobsRes.ok) {
          const errorData=await savedJobsRes.json();
          throw new Error(errorData.error||"Failed to fetch saved jobs");
        }
        const savedJobsData=await savedJobsRes.json();
        const savedJobIds=savedJobsData.map(
          (item: {jobId: number;}) => item.jobId
        );

        if(savedJobIds.length===0) {
          setJobsData([]);
          setLoading(false);
          return;
        }

        // Fetch job details for saved jobs
        const jobsRes=await fetch(
          `/api/jobs?jobIds=${savedJobIds.join(",")}`
        );
        if(!jobsRes.ok) {
          const errorData=await jobsRes.json();
          throw new Error(errorData.error||"Failed to fetch job details");
        }
        const jobsData=await jobsRes.json();
        setJobsData(jobsData);
      } catch(err) {
        console.error("Error fetching saved jobs:",err);
        setError(err instanceof Error? err.message:"An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  },[userId]);

  const chartConfig={
    [selectedAttribute]: {
      label: attributeOptions.find((opt) => opt.value===selectedAttribute)
        ?.label,
      color: "var(--primary)",
    },
  };

  // Prepare chart data
  const chartData=jobsData.map((job) => ({
    name: job.jobTitle,
    [selectedAttribute]: job[selectedAttribute as keyof Job],
  }));

  if(loading) return <div>Loading...</div>;
  if(error) return <div>Error: {error}</div>;


  return (
    <PageWrapper
      title="Compare your job options"
      pageNavProps={{
        back: {href: "/dashboard/jobs",label: "See Jobs"},
        forward: {href: "/dashboard/next-steps",label: "Next Steps"},
      }}
    >
      <Card>
        <CardHeader>
          <Tabs
            value={selectedAttribute}
            onValueChange={(value) =>
              setSelectedAttribute(value as JobAttribute)
            }
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5 flex justify-center">
              {attributeOptions.map((attr) => (
                <TabsTrigger key={attr.value} value={attr.value}>
                  {attr.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[45vh] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey={selectedAttribute}
                radius={4}
                fill="#016FB9"
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            {attributeOptions.map((attr) => (
              <TableHead key={attr.value}>{attr.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobsData.map((job) => (
            <TableRow key={job.jobId}>
              <TableCell>{job.jobTitle}</TableCell>
              <TableCell>
                {job.avgSalary?.toLocaleString("en-US",{
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })??"N/A"}
              </TableCell>
              <TableCell>
                {job.avgTrainingCost?.toLocaleString("en-US",{
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })??"N/A"}
              </TableCell>
              <TableCell>{job.avgTrainingTime??"N/A"}</TableCell>
              <TableCell>{job.roiYears??"N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageWrapper>
  );
}
