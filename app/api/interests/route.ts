import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const interests = await prisma.interest.findMany();
    return NextResponse.json(interests, { status: 200 });
  } catch (error) {
    console.error('Error fetching interests:', error);
    return NextResponse.json({ error: 'Failed to fetch interests' }, { status: 500 });
  }
}