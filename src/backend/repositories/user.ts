import { NotFoundError } from "@/app/types/customError";
import { generateUserEntity, UserEntity } from "@/backend/entities/user";
import prisma from "@/lib/prisma/client";
import { PrismaTrx } from "@/lib/prisma/type";
import { UUID } from "crypto";

export type UserSelectListCommand = {
  userId?: UUID;
  companyId?: UUID;
};

export class UserRepository {
  async selectList(command?: UserSelectListCommand): Promise<UserEntity[]> {
    const queryRes = await prisma.user.findMany({
      where: {
        companyId: command?.companyId,
      },
    });

    const res: UserEntity[] = queryRes.map((user) => generateUserEntity(user));

    return res;
  }

  async selectById(userId: string): Promise<UserEntity> {
    const queryRes = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!queryRes) {
      throw new NotFoundError(`Not Found: userId=${userId}`);
    }

    const res: UserEntity = generateUserEntity(queryRes);

    return res;
  }

  async insert({
    trx,
    user,
  }: {
    trx?: PrismaTrx;
    user: UserEntity;
  }): Promise<UUID> {
    const client = trx || prisma;

    const queryRes = await client.user.create({
      data: {
        id: user.id,
        name: user.name,
        companyId: user.companyId,
        memo: user.memo,
      },
    });

    return queryRes.id as UUID;
  }
}
