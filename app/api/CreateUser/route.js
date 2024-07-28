import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405, headers: { 'Allow': 'POST' } });
  }

  try {
    const { email, password, name } = await req.json();
    console.log('email', email, password, name);

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Error creating user', details: error.message }, { status: 500 });
  }
}
