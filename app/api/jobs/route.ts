// app/api/jobs/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const industryIds = searchParams.get("industryId")?.split(",").map(Number).filter(id => !isNaN(id)) || [];
        const jobIds = searchParams.get("jobIds")?.split(",").map(Number).filter(id => !isNaN(id)) || [];

        // Check if at least one parameter is provided
        if (!industryIds.length && !jobIds.length) {
            return NextResponse.json({ error: "No industryId or jobIds provided" }, { status: 400 });
        }

        // Build the where clause with explicit typing
        const whereClause: Prisma.JobWhereInput = {};
        if (industryIds.length) {
            whereClause.industryId = { in: industryIds };
        }
        if (jobIds.length) {
            whereClause.jobId = { in: jobIds };
        }

        // If both are provided, combine with AND
        const jobs = await prisma.job.findMany({
            where: industryIds.length && jobIds.length ? { AND: [whereClause] } : whereClause,
        });

        return NextResponse.json(jobs, { status: 200 });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }
}