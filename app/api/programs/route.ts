// app/api/programs/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const industryId = searchParams.get("industryId");

        if (!industryId) {
            return NextResponse.json({ error: "No industryId provided" }, { status: 400 });
        }

        const programs = await prisma.program.findMany({
            where: { industryId: Number(industryId) },
        });
        
        return NextResponse.json(programs, { status: 200 });
    } catch (error) {
        console.error("Error fetching programs:", error);
        return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
    }
}