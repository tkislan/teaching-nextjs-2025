import getDB from "@/lib/db";
import Link from "next/link";

export default async function PlaylistsPage() {
  const playlists = await getDB().selectFrom("playlists").selectAll().execute();

  return (
    <main>
      <h1>Playlists</h1>
      <ul>
        {playlists.map((playlist) => (
          <li className="underline" key={playlist.id}>
            <Link href={`/playlist/${playlist.id}`}>
              {playlist.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}