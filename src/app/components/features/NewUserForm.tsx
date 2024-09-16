"use client";

import { createUserFormSchema } from "@/app/types/form/userFormType";
import { zodResolver } from "@hookform/resolvers/zod";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { Form, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Button from "../Button";
import { ErrorMessage } from "../Form/ErrorMessage";
import Label from "../Form/Label";

export type UserFormProps = {
  companyIdNameMap: Map<UUID, string>;
};

export default function NewUserForm({ companyIdNameMap }: UserFormProps) {
  const router = useRouter();

  const companyIdList = Array.from(companyIdNameMap.keys());
  const UserFormSchema = createUserFormSchema(companyIdList);
  type UserFormType = z.infer<typeof UserFormSchema>;

  const methods = useForm<UserFormType>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(UserFormSchema),
  });

  const {
    control,
    register,
    formState: { errors },
  } = methods;

  return (
    <>
      <FormProvider {...methods}>
        <Form
          control={control}
          onSubmit={async ({
            data,
            formData,
          }: {
            data: UserFormType;
            formData: FormData;
          }) => {
            // 本当はOpenAPI, OpenAPI-fetchを使う
            const res = await fetch("/api/users/", {
              method: "POST",
              body: formData,
            });

            if (!res.ok) {
              // 404でも500でもとりあえずエラーは握り潰しておく(API側でログとか吐く)
              toast.error("ユーザの登録に失敗しました。");
            } else {
              const userId = (await res.json()).userId;
              router.push(`/users/${userId}/`);
              router.refresh();
              toast.success("ユーザを登録しました。");
            }
          }}
        >
          {/* name */}
          <div className="mt-12">
            <Label text={"氏名"} htmlFor={"name"} />
            <input
              {...register("name")}
              placeholder={"テスト 太郎"}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {!!errors.name?.message && (
              <ErrorMessage text={errors.name?.message} />
            )}
          </div>

          {/* memo */}
          <div className="mt-8">
            <Label text={"メモ"} htmlFor={"memo"} />
            <textarea
              {...register("memo")}
              placeholder={"memo..."}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {!!errors.memo?.message && (
              <ErrorMessage text={errors.memo?.message} />
            )}
          </div>

          {/* company */}
          <div className="mt-8">
            <Label text={"会社"} htmlFor={"companyId"} />
            <select
              {...register("companyId")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={"0"}
            >
              <option value={"0"} disabled>
                会社を選んでください。
              </option>
              {Array.from(companyIdNameMap).map(([id, name]) => {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>
            {!!errors.companyId?.message && (
              <ErrorMessage text={errors.companyId?.message} />
            )}
          </div>

          <div className="mt-8">
            <Button type={"submit"}>
              <p>登録する</p>
            </Button>
          </div>
        </Form>
      </FormProvider>
    </>
  );
}
