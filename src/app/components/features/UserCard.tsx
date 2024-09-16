import { UserEntity } from "@/backend/entities/user";
import Link from "next/link";

export type UserCardProps = {
  user: UserEntity;
  companyName?: string;
  index: number;
};

export default function UserCard({ user, companyName, index }: UserCardProps) {
  return (
    <div key={user.id} className="max-w-xs rounded overflow-hidden shadow-lg">
      <Link href={`/users/${user.id}`}>
        <img
          className="w-full"
          src={`https://picsum.photos/280/180?random=${index}`}
        />
      </Link>

      <div className="p-4">
        <Link href={`/users/${user.id}`}>
          <p className="font-bold text-xl">{user.name}</p>
        </Link>

        {companyName && (
          <div className="mt-4">
            <Link href={`/companies/${user.companyId}`} key={user.id}>
              <span className="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700">
                {companyName}
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
