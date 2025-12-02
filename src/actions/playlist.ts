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
  playlistId:number,
  songId:number
) {
  console.log("adding song to playlist", playlistId, songId);

  const db = await getDB();
  await db
    .insertInto("playlists_songs")
    .values({
      playlist_id: playlistId,
      song_id: songId,
    })
    .execute();
  
  revalidatePath(`/playlist/${playlistId}`);
}