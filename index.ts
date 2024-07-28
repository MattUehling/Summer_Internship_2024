const { PrismaClient } = require('@prisma/client');
// const { LocalStorage } = require('node-localstorage');

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
    // const timesheet = await prisma.week.findMany({where:{
    //   employeeId:25,
    // },
    //   select:{
    //     timesheetId: true,
    //     monday: true,
    //     tuesday: true,
    //     wednesday: true,
    //     thursday: true,
    //     friday: true,
    //     saturday: true,
    //     sunday: true,
    //     startDate: true,
    //     endDate: true,
    //     hoursWorked: true,
    //     submissionDate: true,
    //   }});  const timesheet = await prisma.timesheet.findMany({
    //   where: {
    //     employeeId: 25,
    //   },
    //   select: {
    //     // id: true,
    //     // employeeId: true,
    //     week: {
    //       select: {
    //         id: true,
    //         startDate: true,
    //         endDate: true,
    //         hoursWorked: true,
    //       },
    //     },
    //   },
    // });
    // console.log(timesheet);
// 

   

//   try {
//     // Fetch all users to verify
//     const users = await prisma.refreshtoken.findMany({});
//     console.log(users);

//     const newToken = await prisma.refreshtoken.create({
//       data: {
//         token: 'sample-refresh-token5', // Replace with the actual token
//         user: {
//           connect: {
//             id: 5, // Replace with the actual user ID
//           },
//         },
//       },
//     });
//     const imput = await prisma.refreshtoken.findMany({});
//     console.log(imput);
//   }catch(error)
//   {
//     console.log("mewo", error)
//   }
// }
// let name = 'Josh Uehling'
// let job = 'CNA'
// let email = "email@email.com"
// let userId= 5
// const user = await prisma.user.findUnique({
//   where: { id: userId },
// });
// const newEmployee = await prisma.employee.create({
//   data: {
//     name,
//     job,
//     email,
//     userId: userId,
//   },
// });
// const employee = await prisma.employee.findMany({
//   where:{userId:userId}
// });
// console.log(employee);

async function main() {

  try {
    const employees = await prisma.employee.findMany({
      where: { userId: 5 },
      include: {
        timesheet: {
          include: {
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

    const employeesWithLastSubmission = employees.map((employee: { timesheet: string | any[]; }) => ({
      ...employee,
      lastSubmission: employee.timesheet.length > 0 ? employee.timesheet[0].week[0]?.submissionDate || null : null,
    }));
    console.log(employeesWithLastSubmission)
    console.log(employees)


}catch(error)
{
  console.log(error);
}
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
