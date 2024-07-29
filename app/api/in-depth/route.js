/*Author: Matt Uehling
* Purpose: puls the timesheets for a certain week
*/
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const weekId = parseInt(searchParams.get('weekId'), 10);

    if (!weekId) {
      return new Response(JSON.stringify({ error: 'week ID is required' }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const timesheet = await prisma.week.findMany({
      where: {
        id: weekId,
      },
      select: {
        timesheetId: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
        startDate: true,
        endDate: true,
        hoursWorked: true,
        submissionDate: true,
      },
    });

    return new Response(JSON.stringify(timesheet), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error('Error during fetching week data:', error);
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
