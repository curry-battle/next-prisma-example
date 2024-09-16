import { Prisma, PrismaClient } from "@prisma/client";
import {
  DefaultArgs,
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

/**
 * prisma.$transactionで使う型
 */
export type PrismaTrx = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

// 標準にあると嬉しいけどない
// see: https://www.prisma.io/docs/orm/reference/error-reference#prisma-client-error-types
export class PrismaError extends Error {
  constructor(
    public error:
      | PrismaClientKnownRequestError
      | PrismaClientUnknownRequestError
      | PrismaClientRustPanicError
      | PrismaClientInitializationError
      | PrismaClientValidationError
  ) {
    super(error.message);
    this.name = error.name;
  }
}
