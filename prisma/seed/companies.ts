import { fakerJA } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const companies = async () => {
  await prisma.company.createMany({
    data: Array(7)
      .fill(0)
      .map((v, i) => ({
        name: fakerJA.company.name(),
        description: fakerJA.company.buzzPhrase(),
      })),
  });
};
