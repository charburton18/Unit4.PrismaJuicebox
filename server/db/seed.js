const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// main is like sync and seed (connects to db, adds data)
// write Prisma Client queries in here
async function main() {
  // creates a user
  await prisma.user.create({
    data: {
      username: 'Alice9',
      password: 'abc',
      Post: {
        create: { title: 'Alice in Wonderland', content: 'hi' },
      },
    },
  })

  //get AllUsers
  const allUsers = await prisma.user.findMany({
    include: {
      Post: true
    },
  });
  console.dir(allUsers, {depth: null});
};


// invoke main() function, then disconnect from db
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })