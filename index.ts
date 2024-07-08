const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.create({
  //   data:{
  //   email:"Joe@gmail.com",
  //   password:"Password",
  //   name:"Josh1"
  //   },
  // });
  // const allUsers = await prisma.user.findMany()
  // console.log(allUsers)

  try {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userObj = JSON.parse(userString);
      console.log(userObj.id)
    }
        const employees = await prisma.employee.findMany({
          where: {
            userId: parseInt('3', 10),
    
          },
          select: {
            id: true,
            userId: true,
            user: true,
            timesheet: true,
           _count: true,
            name: true,
            job: true,
            email: true,
            lastsubmission: true,
          },
        });
  console.log(employees)
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
