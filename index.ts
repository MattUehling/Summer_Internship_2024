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
// try{
//   
//   const employees = await prisma.employee.findMany({
//     where: { userId: 5 },
//     include: {
//       timesheet: {
//         include: {
//           week: {
//             select: {
//               submissionDate: true,
//             },
//             orderBy: {
//               submissionDate: 'desc',
//             },
//             take: 1, // Fetch the top 2 results in descending order
//           },
//         },
//       },
//     },
//   });
  
//   console.log('Employees:', employees);
  
//   const result = employees.map((employee: { timesheet: string | any[]; }) => {
//     const secondLastSubmission = employee.timesheet.length > 0 && employee.timesheet[0].week.length > 1
//       ? employee.timesheet[0].week[1].submissionDate.toISOString() // Access the second item if it exists
//       : null;
      
//     return {
//       ...employee,
//       secondLastSubmission,
//     };

// try{const result = await prisma.bankinginformation.findMany({
//   where:{employeeId: 5},
//   select:{
//     id: true,
//     employeeId: true,
//     accountNumber: true,
//     routingNumber: true,
//     hourlyRate: true,
//     employee: true
//   }
//  });

async function main() {
  try{
    const result = await prisma.week.findMany({
  
  })
  
    console.log('Result:', result);
    
  } catch (error) {
    console.error('Error:', error);

}
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
