import { NotFoundError } from "@/app/types/customError";
import {
  CompanyEntity,
  generateCompanyEntity,
} from "@/backend/entities/company";
import prisma from "@/lib/prisma/client";
import { PrismaTrx } from "@/lib/prisma/type";
import { UUID } from "crypto";

// TODO: 現状使ってない……
export type CompanySelectListCommand = {
  companyIdList?: UUID[];
};

export class CompanyRepository {
  async selectList({
    trx,
    command,
  }: {
    trx?: PrismaTrx;
    command?: CompanySelectListCommand;
  }): Promise<CompanyEntity[]> {
    const client = trx || prisma;
    const queryRes = await client.company.findMany({
      where: {
        id: {
          in: command?.companyIdList,
        },
      },
    });

    const res: CompanyEntity[] = queryRes.map((company) =>
      generateCompanyEntity(company)
    );
    return res;
  }
  async selectById(companyId: string): Promise<CompanyEntity> {
    const queryRes = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!queryRes) {
      throw new NotFoundError(`Not Found: companyId=${companyId}`);
    }

    const res: CompanyEntity = generateCompanyEntity(queryRes);

    return res;
  }
}
