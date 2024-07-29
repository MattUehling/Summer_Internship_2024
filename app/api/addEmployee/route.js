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

    const employeeValue = await prisma.employee.findFirst({
      where: {
        name: newEmployee.name,
      },
    });

    const bankInfo = await prisma.bankinginformation.findMany({
      where: { employeeId: employeeValue.id },
      select: {
        id: true,
        employeeId: true,
        accountNumber: true,
        routingNumber: true,
        hourlyRate: true,
        employee: true,
      },
    });
    console.log(newEmployee);
    console.log(employeeValue);
    console.log(bankInfo);

    return NextResponse.json(bankInfo, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Error creating employee', details: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  // Implement the GET handler if needed
  return NextResponse.json({ message: 'GET method not implemented' }, { status: 405 });
}
