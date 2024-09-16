import { User } from "@prisma/client";
import { UUID } from "crypto";

export type UserEntity = {
  id: UUID;
  name: string;
  memo?: string;
  companyId: UUID;
};

export const generateUserEntity = (
  user: User
  // user: Prisma.UserGetPayload<{ include: {} }>
): UserEntity => {
  return {
    id: user.id as UUID,
    name: user.name,
    memo: user.memo ?? undefined,
    companyId: user.companyId as UUID,
  };
};
