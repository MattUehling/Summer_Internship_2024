const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.create({
  //   data:{
  //   id:2,
  //   email:"MattUehling@gmail.com",
  //   password:"Password"
  //   },
  // });
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
});

