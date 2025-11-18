import getDB from "@/lib/db";
import Link from "next/link";
import { AddToplaylist } from "./addSongToPlaylist";

export default async function AlbumDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const songs = await getDB()
    .selectFrom("songs")
    .selectAll()
    .where("album_id", "=", Number(id))
    .execute();

  const album = await getDB()
    .selectFrom("albums")
    .selectAll()
    .where("id", "=", Number(id))
    .execute();

  const author = await getDB()
    .selectFrom("authors")
    .selectAll()
    .where("id", "=", album[0].author_id)
    .execute();

  return (
    <div>
      <h1 style={{ fontSize: "2rem" }}>{album[0].name}</h1>
      <h2>
        autor: <Link href={`/author/${author[0].id}`}>{author[0].name}</Link>
      </h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <p>{song.name}</p>
            <AddToplaylist playlistId={6} songId={song.id}></AddToplaylist>
          </li>
        ))}
      </ul>
    </div>
  );
}
