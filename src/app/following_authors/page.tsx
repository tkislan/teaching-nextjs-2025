import { assertSessionUserId } from "@/actions/login";
import { getDb } from "@/lib/db";
import Link from "next/link";
import { UnfollowAuthorButton } from "./UnfollowAuthorButton";

export default async function FollowingAuthorsPage() {
  const userId = await assertSessionUserId();

  const db = getDb();

  const rows = await db
    .selectFrom("user_followed_authors")
    .innerJoin("authors", "authors.id", "user_followed_authors.author_id")
    .select([
      "user_followed_authors.id",
      "user_followed_authors.author_id",
      "user_followed_authors.created_at",
      "authors.name as author_name",
    ])
    .where("user_followed_authors.user_id", "=", userId)
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-2xl font-bold">Following Authors</p>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Followed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.id}>
                  <td>{i + 1}</td>
                  <td>
                    <Link href={`/author/${row.author_id}`}>{row.author_name}</Link>
                  </td>
                  <td>{new Date(row.created_at).toDateString()}</td>
                  <td>
                    <UnfollowAuthorButton authorId={row.author_id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
