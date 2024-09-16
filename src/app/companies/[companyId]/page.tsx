import UserCard from "@/app/components/features/UserCard";
import { UserEntity } from "@/backend/entities/user";
import { getCompany } from "@/backend/usecases/company";
import { getCompanyUsers } from "@/backend/usecases/user";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

export default async function Company({ params }: { params: Params }) {
  const { companyId } = params;

  const company = await getCompany(companyId).then((res) => {
    if (res.isFailure) {
      if (res.value.statusCode === 404) return notFound();
      throw res.value.error;
    }
    return res.value;
  });
  const userList = await getCompanyUsers(companyId).then((res) => {
    if (res.isFailure) {
      if (res.value.statusCode === 404) return notFound();
      throw res.value.error;
    }
    return res.value;
  });

  return (
    <div>
      <div className="w-full">
        <img className="w-full" src={`https://picsum.photos/800/200`} />
      </div>
      <h2 className="text-4xl mt-8">{company.name}</h2>
      <p className="mt-4">{company.description}</p>
      <h3 className="text-2xl mt-8">従業員</h3>
      <div className="py-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {userList.map((user: UserEntity) => (
          <UserCard key={user.id} user={user} index={userList.indexOf(user)} />
        ))}
      </div>
    </div>
  );
}
