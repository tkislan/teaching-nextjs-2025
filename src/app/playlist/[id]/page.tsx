import getDB from "@/lib/db";

export default async function PlaylistDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const playlist = await getDB()
    .selectFrom("playlists")
    .selectAll()
    .where("id", "=", Number(id))
    .execute();

  const playlists_songs = await getDB()
    .selectFrom("playlists_songs")
    .selectAll()
    .where("playlist_id", "=", Number(id))
    .execute();

  const songs = [];

  for (const playlist_song of playlists_songs) {
    const song = await getDB()
      .selectFrom("songs")
      .selectAll()
      .where("id", "=", playlist_song.song_id)
      .execute();

    songs.push(song[0]);
  }

  return (
    <main>
      <h1 style={{ fontSize: "2rem" }}>{playlist[0].name}</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <p>{song.name}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}