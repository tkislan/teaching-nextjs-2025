import { getSessionUserId } from "@/actions/login";
import { FollowAuthorButton } from "@/components/FollowAuthorButton";
import { getDb } from "@/lib/db";
import Link from "next/link";

export default async function AuthorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await getSessionUserId();

  const db = getDb();

  const { id } = await params;

  const authorId = parseInt(id);

  if (isNaN(authorId)) {
    return <div>Invalid Album id</div>;
  }

  const author = await db
    .selectFrom("authors")
    .selectAll()
    .where("id", "=", authorId)
    .executeTakeFirst();

  if (author == null) {
    return <div>Author not found</div>;
  }

  const followRow =
    userId != null
      ? await db
          .selectFrom("user_followed_authors")
          .select("id")
          .where("user_id", "=", userId)
          .where("author_id", "=", author.id)
          .executeTakeFirst()
      : null;

  const albums = await db
    .selectFrom("albums")
    .selectAll()
    .where("author_id", "=", author.id)
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-4">
          <span>Name: {author.name}</span>
          {userId != null ? (
            <FollowAuthorButton authorId={author.id} isFollowing={followRow != null} />
          ) : null}
        </div>
        <div>Bio: {author.bio}</div>

        <div>
          Albums:
          <ul>
            {albums.map((album) => (
              <li key={album.id}>
                <Link href={`/album/${album.id}`}>{album.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
