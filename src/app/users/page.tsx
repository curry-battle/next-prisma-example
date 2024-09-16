import { getCompanyList } from "@/backend/usecases/company";
import { getAllUsers } from "@/backend/usecases/user";
import { UUID } from "crypto";
import NewUserForm from "../components/features/NewUserForm";
import UserCard from "../components/features/UserCard";

export default async function Home() {
  const userList = await getAllUsers().then((res) => {
    if (res.isFailure) throw new Error();
    return res.value;
  });

  const companyIdSet = (() => {
    const idList = userList.map((user) => user.companyId);
    const idSet = [...new Set(idList)];
    return idSet;
  })();

  const companyList = await (async () => {
    const companyList = await getCompanyList().then((res) => {
      if (res.isFailure) throw new Error();
      return res.value;
    });
    return companyList;
  })();

  // TODO: 冗長
  const allCompanyIdNameMap = (() => {
    const idNameMap = new Map<UUID, string>();
    companyList.forEach((company) => {
      idNameMap.set(company.id, company.name);
    });
    return idNameMap;
  })();

  const companyIdNameMap = (() => {
    const idNameMap = new Map<UUID, string>();
    companyList
      .filter((company) => companyIdSet.includes(company.id))
      .forEach((company) => {
        idNameMap.set(company.id, company.name);
      });
    return idNameMap;
  })();

  return (
    <div>
      <h2 className="text-4xl">従業員</h2>

      <div className="py-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {userList.map((user, index) => (
          <UserCard
            key={user.id}
            user={user}
            companyName={companyIdNameMap.get(user.companyId)}
            index={index}
          />
        ))}
      </div>

      <div className="max-w-xl flex flex-col mx-auto">
        <h3 className="text-3xl mt-16">ユーザを追加する</h3>
        <NewUserForm companyIdNameMap={allCompanyIdNameMap} />
      </div>
    </div>
  );
}
