import { NotFoundError } from "@/app/types/customError";
import { isUUID } from "@/common";
import { UUID } from "crypto";
import { CompanyEntity } from "../entities/company";
import {
  CompanyRepository,
  CompanySelectListCommand,
} from "../repositories/company";
import { CompanyService } from "../services/company";
import {
  Failure,
  generateResultError,
  Result,
  ResultError,
  Success,
} from "../utils/result";

const companyRepository = new CompanyRepository();
const companyService = new CompanyService(companyRepository);

export const getCompanyList = async (
  command?: CompanySelectListCommand
): Promise<Result<CompanyEntity[], ResultError>> => {
  let companyList = [];
  try {
    companyList = await companyService.selectList({ command: command });
  } catch (e: unknown) {
    return generateResultError(e);
  }

  return new Success(companyList);
};

export const getCompany = async (
  companyId: UUID
): Promise<Result<CompanyEntity, ResultError>> => {
  if (!isUUID(companyId)) {
    const error = new NotFoundError();
    return new Failure(new ResultError(error, error.statusCode, error.message));
  }

  let company: CompanyEntity | undefined = undefined;
  try {
    company = await companyService.selectById(companyId);
  } catch (e: unknown) {
    return generateResultError(e);
  }

  return new Success(company);
};
