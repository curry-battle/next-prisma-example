import { fakerJA } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const users = async () => {
  const companyList = await prisma.company.findMany();

  for (const company of companyList) {
    // 1企業に0 - 10人所属させる
    const userCount = Math.floor(Math.random() * 11);

    await prisma.user.createMany({
      data: Array(userCount)
        .fill(0)
        .map((v, i) => {
          // 10回に8回はメモあり
          const hasMemo = Math.random() < 0.8;
          return {
            name: fakerJA.person.fullName(),
            companyId: company.id,
            memo: hasMemo ? fakerJA.lorem.paragraph() : undefined,
          };
        }),
    });
  }
};
