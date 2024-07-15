const { PrismaClient } = require('@prisma/client');
const { LocalStorage } = require('node-localstorage');

const prisma = new PrismaClient();
// const { LocalStorage } = require('node-localstorage');
// const localStorages = new LocalStorage('./scratch'); // You can specify the directory where you want to store the data
// localStorages.setItem("id", '3');
    // let id = localStorages.getItem("id");

    // const employees = await prisma.employee.findMany({
    //   where: {
    //     userId: parseInt('3', 10),
    //   },
    //   select: {
    //     id: true,
    //     userId: true,
    //     user: true,
    //     timesheet: true,
    //     _count: true,
    //     name: true,
    //     job: true,
    //     email: true,
    //     lastsubmission: true,

async function main() {
  try {
    const timesheet = await prisma.week.findMany({where:{
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
    console.log(timesheet);
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
