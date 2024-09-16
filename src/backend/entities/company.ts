import { Company } from "@prisma/client";
import { UUID } from "crypto";

export type CompanyEntity = {
  id: UUID;
  name: string;
  description?: string;
};

export const generateCompanyEntity = (
  company: Company
  // user: Prisma.UserGetPayload<{ include: {} }>
): CompanyEntity => {
  return {
    id: company.id as UUID,
    name: company.name,
    description: company.description ?? undefined,
  };
};
