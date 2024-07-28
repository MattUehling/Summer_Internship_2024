import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = parseInt(searchParams.get('userId'), 10);

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const employees = await prisma.employee.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        userId: true,
        name: true,
        job: true,
        email: true,
        timesheet: {
          select: {
            week: {
              orderBy: {
                submissionDate: 'desc',
              },
              take: 1,
              select: {
                submissionDate: true,
              },
            },
          },
        },
      },
    });
    
    const employeesWithLastSubmission = employees.map(employee => ({
      ...employee,
      lastSubmission: employee.timesheet.length > 0 ? employee.timesheet[0].week[0]?.submissionDate || null : null,
    }));
    console.log(employeesWithLastSubmission)

    return new Response(JSON.stringify(employeesWithLastSubmission), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error('Error during fetching users:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}
