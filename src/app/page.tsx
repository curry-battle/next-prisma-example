import { getCompanyList } from "@/backend/usecases/company";
import Link from "next/link";

export default async function Home() {
  const companyList = await getCompanyList().then((res) => {
    if (res.isFailure) throw new Error();
    return res.value;
  });

  return (
    <div>
      <h2 className="text-4xl">企業</h2>

      <div className="py-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {companyList.map((company, index) => (
          <Link
            href={`/companies/${company.id}`}
            key={company.id}
            className="max-w-xs rounded overflow-hidden shadow-lg"
          >
            {/* next/image使うほどではないだろう */}
            <img
              className="w-full"
              src={`https://picsum.photos/280/180?random=${index}`}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{company.name}</div>
              <p className="text-gray-700 text-base">{company.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
