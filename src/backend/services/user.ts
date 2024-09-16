import { UserEntity } from "@/backend/entities/user";
import { UserRepository } from "@/backend/repositories/user";
import { PrismaTrx } from "@/lib/prisma/type";
import { UUID } from "crypto";

export class UserService {
  public userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async selectList(): Promise<UserEntity[]> {
    return this.userRepository.selectList();
  }

  async selectListByCompanyId(companyId: UUID): Promise<UserEntity[]> {
    const command = { companyId };
    return this.userRepository.selectList(command);
  }

  async selectById(userId: UUID): Promise<UserEntity> {
    return this.userRepository.selectById(userId);
  }

  async save({
    trx,
    user,
  }: {
    trx?: PrismaTrx;
    user: UserEntity;
  }): Promise<UUID> {
    return this.userRepository.insert({ trx, user });
  }
}
