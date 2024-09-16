import { z } from "zod";

export const createUserFormSchema = (companyIdList: string[]) => {
  return z.object({
    name: z
      .string()
      .min(1, { message: "ユーザ名を入力して下さい。" })
      .max(20, { message: "ユーザは20文字以内で入力して下さい。" }),
    memo: z
      .string()
      .max(100, { message: "メモは100文字以内で入力して下さい。" })
      .optional(),
    companyId: z
      .string()
      .min(10, { message: "会社を選択して下さい。" })
      .refine((id) => companyIdList.includes(id), {
        message: "無効な会社です。",
      }),
  });
};
