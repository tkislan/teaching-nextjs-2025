"use client";

import { unlikeSong } from "@/actions/liked_songs";

export function RemoveLikeButton({ songId }: { songId: number }) {
  return (
    <button className="btn btn-xs" onClick={() => unlikeSong(songId)}>
      Remove Like
    </button>
  );
}
