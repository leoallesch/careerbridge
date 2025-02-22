import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const interestIds = searchParams.get('interestIds')?.split(',').map(Number) || [];

        if (!interestIds.length) {
            return NextResponse.json({ error: 'No interestIds provided' }, { status: 400 });
        }

        const industries = await prisma.industry.findMany({
            where: {
                interests: {
                    some: {
                        interestId: { in: interestIds },
                    },
                },
            },
        });

        return NextResponse.json(industries, { status: 200 });
    } catch (error) {
        console.error('Error fetching industries:', error);
        return NextResponse.json({ error: 'Failed to fetch industries' }, { status: 500 });
    }
}