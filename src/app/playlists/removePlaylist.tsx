"use client";

import { removePlaylist } from "@/actions/playlist";

export function RemovePlaylistButton(props: { playlistId: number }) {
  return (
    <button
      onClick={(e) => {
        console.log("remove");
        removePlaylist(props.playlistId);
      }}
    >
      Remove
    </button>
  );
}
