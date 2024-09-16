import { CompanyEntity } from "@/backend/entities/company";
import {
  CompanyRepository,
  CompanySelectListCommand,
} from "@/backend/repositories/company";
import { PrismaTrx } from "@/lib/prisma/type";
import { UUID } from "crypto";

export class CompanyService {
  public companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async selectList({
    trx,
    command,
  }: {
    trx?: PrismaTrx;
    command?: CompanySelectListCommand;
  }): Promise<CompanyEntity[]> {
    return this.companyRepository.selectList({ trx, command });
  }

  async selectById(userId: UUID): Promise<CompanyEntity> {
    return this.companyRepository.selectById(userId);
  }
}
