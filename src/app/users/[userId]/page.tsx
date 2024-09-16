import { UserEntity } from "@/backend/entities/user";
import { CompanyEntity } from "@/backend/entities/company";
import Link from "next/link";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { get } from "http";
import { getUser } from "@/backend/usecases/user";
import { getCompany } from "@/backend/usecases/company";
import LinkButton from "@/app/components/LinkButton";
import { notFound } from "next/navigation";

export default async function User({ params }: { params: Params }) {
  const { userId } = params;

  const user = await getUser(userId).then((res) => {
    if (res.isFailure) {
      if (res.value.statusCode === 404) return notFound();
      throw res.value.error;
    }
    return res.value;
  });

  const company = await getCompany(user.companyId).then((res) => {
    if (res.isFailure) throw res.value.error;
    return res.value;
  });

  return (
    <div>
      <div className="w-full">
        <img className="w-full" src={`https://picsum.photos/800/200`} />
      </div>
      <h2 className="text-4xl mt-8">{user.name}</h2>
      <p className="mt-4">{user.memo}</p>
      <div className="mt-8">
        <LinkButton href={`/companies/${company.id}`}>
          {company.name}
        </LinkButton>
      </div>
    </div>
  );
}
