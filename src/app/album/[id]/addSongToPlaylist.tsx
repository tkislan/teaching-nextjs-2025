"use client";
import { addSongToPlaylist } from "@/actions/playlist";
export async function AddToplaylist(props: {
  playlistId: number;
  songId: number;
}) {
  return (
    <button
      onClick={(e) => {
        console.log("add to playlist");
        addSongToPlaylist(props.playlistId, props.songId);
      }}
    >
      Add to Playlist
    </button>
  );
}
