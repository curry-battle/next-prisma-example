import { ZodError, ZodType } from "zod";

export class ValidationError extends Error {
  constructor(readonly error: ZodError, readonly statusCode: number) {
    super();
  }
}

type ParseResult<T> = {
  data?: T;
  error?: ValidationError;
};

export const parseRequest = <T>(
  param: Partial<T>,
  schema: ZodType<T>
): ParseResult<T> => {
  const result = schema.safeParse(param);

  if (result.success) {
    return {
      data: result.data,
      error: undefined,
    };
  } else {
    return {
      data: undefined,
      error: new ValidationError(result.error, 404),
    };
  }
};
