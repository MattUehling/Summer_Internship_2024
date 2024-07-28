import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(req) {
  try {
    const { userId, name, job, email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    console.log(user);

    const newEmployee = await prisma.employee.create({
      data: {
        name,
        job,
        email,
        userId,
      },
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Error creating employee', details: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  // Implement the GET handler if needed
  return NextResponse.json({ message: 'GET method not implemented' }, { status: 405 });
}
