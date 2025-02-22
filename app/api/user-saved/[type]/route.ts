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
                // This should never be reached due to the earlier type check,
                // but included for TypeScript exhaustiveness and safety
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
        switch (type) {
            case 'job':
                return NextResponse.json(
                    await prisma.userSavedJob.create({
                        data: {
                            userId,
                            jobId: id,
                            createdAt: new Date(),
                        },
                    }),
                    { status: 201 }
                );
            case 'program':
                return NextResponse.json(
                    await prisma.userSavedProgram.create({
                        data: {
                            userId,
                            programId: id,
                            createdAt: new Date(),
                        },
                    }),
                    { status: 201 }
                );
            case 'interest':
                return NextResponse.json(
                    await prisma.userSavedInterest.create({
                        data: {
                            userId,
                            interestId: id,
                            createdAt: new Date(),
                        },
                    }),
                    { status: 201 }
                );
            case 'industry':
                return NextResponse.json(
                    await prisma.userSavedIndustry.create({
                        data: {
                            userId,
                            industryId: id,
                            createdAt: new Date(),
                        },
                    }),
                    { status: 201 }
                );
            default:
                return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to save item', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
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
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
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