import { UUID } from "crypto";

const UuidPattern =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export const isUUID = (value: string | undefined): value is UUID => {
  if (typeof value !== "string") {
    return false;
  }

  return UuidPattern.test(value);
};
