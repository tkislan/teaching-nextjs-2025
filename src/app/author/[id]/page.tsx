import { getDb } from "@/lib/db";
import Link from "next/link";

function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes}` + ":" + `${seconds}`.padStart(2, "0");
}

export default async function Author({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const db = getDb();

  const { id } = await params;

  console.log("Author detail id:", id);

  const authorId = parseInt(id);

  if (isNaN(authorId)) {
    return <div>Invalid Author id</div>;
  }

  const author = await db
    .selectFrom("authors")
    .selectAll()
    .where("id", "=", authorId)
    .execute();

  const album = await db
    .selectFrom("albums")
    .selectAll()
    .where("author_id", "=", authorId)
    .execute();

  // if (album == null)
  if (author === null || author === undefined) {
    // throw new Error("Not Found");
    return <div>Author not found</div>;
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>{author[0].name}</div>
        <div>{author[0].bio}</div>

        <div className="grid grid-cols-2 gap-4">
          {album.map((album) => (
            <div key={album.id} className="card w-64 bg-base-100 shadow-sm">
              <div className="card-body">
                <span className="badge badge-xs badge-warning">Pop</span>
                <h2 className="text-3xl font-bold">{album.name}</h2>

                <p>ID: {album.id}</p>
                <p>
                  Release Date: {new Date(album.release_date).toDateString()}
                </p>
                <div className="mt-6">
                  <Link
                    className="btn btn-primary btn-block"
                    href={`/album/${album.id}`}
                  >
                    Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
