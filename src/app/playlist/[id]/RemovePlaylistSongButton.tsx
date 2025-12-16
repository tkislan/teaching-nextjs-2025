"use client";

import { removeSongFromPlaylist } from "@/actions/playlists";

export function RemovePlaylistSongButton(props: {
  id: number;
  playlistId: number;
  songId: number;
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={() => {
        console.log("Remove");
        removeSongFromPlaylist(props.id, props.playlistId, props.songId);
      }}
    >
      Remove
    </button>
  );
}
