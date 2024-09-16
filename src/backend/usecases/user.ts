import { NotFoundError } from "@/app/types/customError";
import { createUserFormSchema } from "@/app/types/form/userFormType";
import { isUUID } from "@/common";
import prisma from "@/lib/prisma/client";
import { parseRequest } from "@/lib/zod/validator";
import { UUID } from "crypto";
import { z } from "zod";
import { UserEntity } from "../entities/user";
import { CompanyRepository } from "../repositories/company";
import { UserRepository } from "../repositories/user";
import { CompanyService } from "../services/company";
import { UserService } from "../services/user";
import {
  Failure,
  generateResultError,
  Result,
  ResultError,
  Success,
} from "../utils/result";

const userRepository = new UserRepository();
const companyRepository = new CompanyRepository();
const userService = new UserService(userRepository);
const companyService = new CompanyService(companyRepository);

export const getAllUsers = async (): Promise<
  Result<UserEntity[], ResultError>
> => {
  let userList = [];
  try {
    userList = await userService.selectList();
  } catch (e: unknown) {
    return generateResultError(e);
  }
  return new Success(userList);
};

export const getUser = async (
  userId: string
): Promise<Result<UserEntity, ResultError>> => {
  if (!isUUID(userId)) {
    const error = new NotFoundError();
    return new Failure(new ResultError(error, error.statusCode, error.message));
  }

  let user: UserEntity | undefined = undefined;

  try {
    user = await userService.selectById(userId as UUID);
  } catch (e: unknown) {
    return generateResultError(e);
  }
  return new Success(user);
};

export const getCompanyUsers = async (
  companyId: string
): Promise<Result<UserEntity[], ResultError>> => {
  if (!isUUID(companyId)) {
    const error = new NotFoundError();
    return new Failure(new ResultError(error, error.statusCode, error.message));
  }

  let userList: UserEntity[] | undefined = undefined;
  try {
    userList = await userService.selectListByCompanyId(companyId);
  } catch (e: unknown) {
    return generateResultError(e);
  }

  return new Success(userList);
};

export const saveNewUser = async (
  userData: Partial<UserEntity>
): Promise<Result<UUID, ResultError>> => {
  let userId: UUID | undefined = undefined;

  // スコープが過度にデカいのが不服だがtry-catch, transactionを張る
  try {
    await prisma.$transaction(async (trx) => {
      // schema用にcompanyIdListを取得
      const companyIdList: UUID[] = await (async () => {
        const companyList = await companyService.selectList({ trx });
        return companyList.map((company) => company.id);
      })();

      const UserFormSchema = createUserFormSchema(companyIdList);
      type UserFormType = z.infer<typeof UserFormSchema>;

      // parse and validate
      const parseResult = parseRequest<UserFormType>(userData, UserFormSchema);
      if (parseResult.error) throw parseResult.error;

      const data: UserFormType = parseResult.data!!;

      const newUserId = crypto.randomUUID() as UUID;

      // insert db
      const user: UserEntity = {
        id: newUserId,
        name: data.name,
        memo: data.memo,
        companyId: data.companyId as UUID,
      };
      userId = await userService.save({ trx, user });
    });
  } catch (e: unknown) {
    return generateResultError(e);
  }

  return new Success(userId!!);
};
