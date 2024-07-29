import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405, headers: { 'Allow': 'POST' } });
  }

  try {
    const { employeeId, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = await req.json();
    if (!employeeId) {
      throw new Error('Employee ID is required');
    }

    const newTimesheet = await prisma.timesheet.create({
      data: {
        employeeId,
        week: {
          create: { monday, tuesday, wednesday, thursday, friday, saturday, sunday }
        }
      }
    });

    return NextResponse.json(newTimesheet, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Error creating timesheet', details: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
