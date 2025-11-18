"use client";

import { removeSongFromPlaylist } from "@/actions/playlist";

export function RemoveSongButton(props: {
  playlistId: number;
  songId: number;
}) {
  return (
    <button
      onClick={(e) => {
        console.log("remove");
        removeSongFromPlaylist(props.playlistId, props.songId);
      }}
    >
      Remove
    </button>
  );
}
