"use client";
import { addSongToPlaylist } from "@/actions/playlist";

export function AddToplaylist(props: { playlistId: number; songId: number }) {
  const handleClick = async () => {
    try {
      // call the action (may be a server action) — await it so errors are visible
      await addSongToPlaylist(props.playlistId, props.songId);
      console.log("added to playlist", props.playlistId, props.songId);
    } catch (err) {
      console.error("failed to add to playlist", err);
    }
  };

  return <button onClick={handleClick}>Add to Playlist</button>;
}
