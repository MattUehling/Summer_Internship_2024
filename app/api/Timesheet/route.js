import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const employeeId = parseInt(searchParams.get('employeeId'), 10);

    if (!employeeId) {
      return new Response(JSON.stringify({ error: 'Employee ID is required' }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const timesheet = await prisma.timesheet.findMany({
      where: {
        employeeId: employeeId,
      },
      select: {
        id: true,
        week: {
          select: {
            id: true,
            startDate: true,
            endDate: true,
            hoursWorked: true,
            submissionDate: true,
          },
        },
      },
    });
    console.log(timesheet)

    return new Response(JSON.stringify(timesheet), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error during fetching timesheet:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}
