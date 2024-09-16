import { PrismaClient } from "@prisma/client";
import { companies } from "./companies";
import { users } from "./users";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();
  await companies();
  await users();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
