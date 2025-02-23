import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const industryId = searchParams.get("industryId");
        const programIds = searchParams.get("programIds");

        // If programIds is provided (single or multiple)
        if (programIds) {
            const ids = programIds.split(",").map((id) => Number(id.trim())).filter((id) => !isNaN(id));
            if (ids.length === 0) {
                return NextResponse.json({ error: "Invalid programIds provided" }, { status: 400 });
            }

            const programs = await prisma.program.findMany({
                where: {
                    programId: {
                        in: ids, // Fetch multiple programs by IDs
                    },
                },
            });

            return NextResponse.json(programs, { status: 200 });
        }

        // If industryId is provided (existing functionality)
        if (industryId) {
            const programs = await prisma.program.findMany({
                where: { industryId: Number(industryId) },
            });

            return NextResponse.json(programs, { status: 200 });
        }

        // If neither parameter is provided
        return NextResponse.json({ error: "No industryId or programIds provided" }, { status: 400 });
    } catch (error) {
        console.error("Error fetching programs:", error);
        return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
    }
}