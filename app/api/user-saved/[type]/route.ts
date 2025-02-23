import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type UserSavedType = 'job' | 'program' | 'interest' | 'industry';

interface SaveRequestBody {
    userId: string;
    id: number;
}

export async function GET(
    request: Request,
    context: { params: Promise<{ type: string }> }
) {
    const params = await context.params;
    const { type } = params as { type: UserSavedType };
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    if (!['job', 'program', 'interest', 'industry'].includes(type)) {
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    try {
        switch (type) {
            case 'job':
                return NextResponse.json(
                    await prisma.userSavedJob.findMany({
                        where: { userId },
                        include: { job: true },
                    }),
                    { status: 200 }
                );
            case 'program':
                return NextResponse.json(
                    await prisma.userSavedProgram.findMany({
                        where: { userId },
                        include: { program: true },
                    }),
                    { status: 200 }
                );
            case 'interest':
                return NextResponse.json(
                    await prisma.userSavedInterest.findMany({
                        where: { userId },
                        include: { interest: true },
                    }),
                    { status: 200 }
                );
            case 'industry':
                return NextResponse.json(
                    await prisma.userSavedIndustry.findMany({
                        where: { userId },
                        include: { industry: true },
                    }),
                    { status: 200 }
                );
            default:
                return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error fetching userSaved:', error);
        return NextResponse.json({ error: 'Failed to fetch userSaved' }, { status: 500 });
    }
}

export async function POST(
    request: Request,
    context: { params: Promise<{ type: string }> }
) {
    const params = await context.params;
    const { type } = params as { type: UserSavedType };

    let body: SaveRequestBody;
    try {
        const rawBody = await request.text();
        if (!rawBody) {
            return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
        }
        body = JSON.parse(rawBody);
    } catch (error) {
        console.error('Body parsing error:', error);
        return NextResponse.json(
            { error: 'Invalid request body - must be valid JSON' },
            { status: 400 }
        );
    }

    const { userId, id } = body;

    if (!userId || !id) {
        return NextResponse.json(
            { error: 'Missing required fields: userId and id' },
            { status: 400 }
        );
    }

    if (!['job', 'program', 'interest', 'industry'].includes(type)) {
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    try {
        // Check for existing entry before creating
        const existingEntry = await checkExistingEntry(type, userId, id);
        if (existingEntry) {
            return NextResponse.json(
                { message: `${type} already saved for this user`, data: existingEntry },
                { status: 200 } // Return 200 since it's not an error, just a duplicate
            );
        }

        // If no duplicate, proceed with creation
        switch (type) {
            case 'job':
                return NextResponse.json(
                    await prisma.userSavedJob.create({
                        data: { userId, jobId: id, createdAt: new Date() },
                    }),
                    { status: 201 }
                );
            case 'program':
                return NextResponse.json(
                    await prisma.userSavedProgram.create({
                        data: { userId, programId: id, createdAt: new Date() },
                    }),
                    { status: 201 }
                );
            case 'interest':
                return NextResponse.json(
                    await prisma.userSavedInterest.create({
                        data: { userId, interestId: id, createdAt: new Date() },
                    }),
                    { status: 201 }
                );
            case 'industry':
                return NextResponse.json(
                    await prisma.userSavedIndustry.create({
                        data: { userId, industryId: id, createdAt: new Date() },
                    }),
                    { status: 201 }
                );
            default:
                return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Database error:', errorMessage, error);
        return NextResponse.json(
            { error: 'Failed to save item', details: errorMessage },
            { status: 500 }
        );
    }
}

// Helper function to check for existing entries
async function checkExistingEntry(type: UserSavedType, userId: string, id: number) {
    switch (type) {
        case 'job':
            return await prisma.userSavedJob.findUnique({
                where: { userId_jobId: { userId, jobId: id } },
            });
        case 'program':
            return await prisma.userSavedProgram.findUnique({
                where: { userId_programId: { userId, programId: id } },
            });
        case 'interest':
            return await prisma.userSavedInterest.findUnique({
                where: { userId_interestId: { userId, interestId: id } },
            });
        case 'industry':
            return await prisma.userSavedIndustry.findUnique({
                where: { userId_industryId: { userId, industryId: id } },
            });
        default:
            return null;
    }
}

export async function DELETE(
    request: Request,
    context: { params: Promise<{ type: string }> }
) {
    const params = await context.params;
    const { type } = params as { type: UserSavedType };

    let body: SaveRequestBody;
    try {
        const rawBody = await request.text();
        if (!rawBody) {
            return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
        }
        body = JSON.parse(rawBody);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request body:' + error }, { status: 400 });
    }

    const { userId, id } = body;

    if (!userId || !id) {
        return NextResponse.json({ error: 'Missing or invalid userId or id' }, { status: 400 });
    }

    if (!['job', 'program', 'interest', 'industry'].includes(type)) {
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    try {
        switch (type) {
            case 'job':
                return NextResponse.json(
                    {
                        message: 'Entry removed successfully',
                        data: await prisma.userSavedJob.delete({
                            where: { userId_jobId: { userId, jobId: id } },
                        }),
                    },
                    { status: 200 }
                );
            case 'program':
                return NextResponse.json(
                    {
                        message: 'Entry removed successfully',
                        data: await prisma.userSavedProgram.delete({
                            where: { userId_programId: { userId, programId: id } },
                        }),
                    },
                    { status: 200 }
                );
            case 'interest':
                return NextResponse.json(
                    {
                        message: 'Entry removed successfully',
                        data: await prisma.userSavedInterest.delete({
                            where: { userId_interestId: { userId, interestId: id } },
                        }),
                    },
                    { status: 200 }
                );
            case 'industry':
                return NextResponse.json(
                    {
                        message: 'Entry removed successfully',
                        data: await prisma.userSavedIndustry.delete({
                            where: { userId_industryId: { userId, industryId: id } },
                        }),
                    },
                    { status: 200 }
                );
            default:
                return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'P2025') {
            return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
        }
        console.error('Error removing from userSaved:', error);
        return NextResponse.json({ error: 'Failed to remove from userSaved' }, { status: 500 });
    }
}