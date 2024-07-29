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
    console.log(employeeId);
    const bankInfo = await prisma.bankinginformation.findMany({
      where: { employeeId: employeeId },
      select:{
        id: true,
        employeeId: true,
        accountNumber: true,
        routingNumber: true,
        hourlyRate: true,
        employee: true
      }
     });
    console.log(bankInfo);

    return new Response(JSON.stringify(bankInfo), {
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
