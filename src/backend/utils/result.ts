import { PrismaError } from "@/lib/prisma/type";
import { ValidationError } from "@/lib/zod/validator";

// see: https://yatsbashy.hatenablog.com/entry/typescript-simple-result
export type Result<T, E extends Error> = Success<T> | Failure<E>;

export class Success<T> {
  readonly isSuccess = true;
  readonly isFailure = false;
  constructor(readonly value: T) {}
}

export class Failure<ResultError> {
  readonly isSuccess = false;
  readonly isFailure = true;
  constructor(readonly value: ResultError) {}
}

// https://qiita.com/Kodak_tmo/items/d48eb3497be18896b999
export class ResultError extends Error {
  constructor(
    readonly error = new Error("unknown error"),
    readonly statusCode?: number,
    // TODO: 本当はエラーコードやらで制御する
    readonly messageForClient: string = "unknown error"
  ) {
    super();
    // TODO: 本当は真面目にロギングする
    console.log(`[${statusCode}] ${error.message}`);
    console.log(`${error.stack}`);
  }
}

// ちょっと微妙
export const generateResultError = (error: unknown) => {
  if (error instanceof ValidationError) {
    return new Failure(new ResultError(error, 404, "invalid request"));
  } else if (error instanceof PrismaError) {
    return new Failure(new ResultError(error, 500, "db error"));
  } else if (error instanceof Error) {
    return new Failure(new ResultError(error, 500, "unknown error"));
  } else {
    // error以外をthrowしなければここには来ない
    throw error;
  }
};
