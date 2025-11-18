"use server"
import getDB from "@/lib/db";
import { revalidatePath } from "next/cache";
export async function removeSongFromPlaylist(
  playlistId:number,
  songId:number
) {
  console.log("removing song from playlist", playlistId, songId);

  const db = await getDB();
  await db
    .deleteFrom("playlists_songs")
    .where("playlist_id", "=", playlistId)
    .where("song_id", "=", songId)
    .execute();
  
  revalidatePath(`/playlist/${playlistId}`);
}

export async function removePlaylist(playlistId:number) {
  const db = await getDB()
  await db.deleteFrom("playlists").where("id","=",playlistId) .execute();
  revalidatePath(`/playlist`)
}

export async function addSongToPlaylist(
  notUsedPlaylistId:number,
  songId:number
) {
  console.log("adding song to playlist", songId);

  const db = await getDB();
  const playlist = await db.selectFrom("playlists").selectAll().where("user_id","=",1).execute();
  const playlistId = playlist.id;
}