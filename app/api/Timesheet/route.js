// pages/api/employees.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
      const timesheet = await prisma.week.findMany({
        where:{
        id:34,
      },
        select:{
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
        }});
    return new Response(JSON.stringify(employees), {
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
