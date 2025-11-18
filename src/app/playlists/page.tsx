import getDB from "@/lib/db";
import Link from "next/link";
import { RemovePlaylistButton } from "./removePlaylist";

export default async function PlaylistsPage() {
  const playlists = await getDB().selectFrom("playlists").selectAll().execute();

  return (
    <main>
      <h1>Playlists</h1>
      <ul>
        {playlists.map((playlist) => (
          <li className="underline" key={playlist.id}>
            <Link href={`/playlist/${playlist.id}`}>{playlist.name}</Link>
            <RemovePlaylistButton
              playlistId={playlist.id}
            ></RemovePlaylistButton>
          </li>
        ))}
      </ul>
    </main>
  );
}
