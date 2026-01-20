"use client";

import { likeSong, unlikeSong } from "@/actions/liked_songs";

export function LikeSongButton({
  songId,
  isLiked,
}: {
  songId: number;
  isLiked: boolean;
}) {
  return (
    <button
      className="btn btn-xs btn-ghost w-8"
      onClick={() => (isLiked ? unlikeSong(songId) : likeSong(songId))}
    >
      {isLiked ? "♥" : "♡"}
    </button>
  );
}
