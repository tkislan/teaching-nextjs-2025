"use client";

import { followAuthor, unfollowAuthor } from "@/actions/followed_authors";

export function FollowAuthorButton({
  authorId,
  isFollowing,
}: {
  authorId: number;
  isFollowing: boolean;
}) {
  return (
    <button
      className="btn btn-sm btn-outline"
      type="button"
      onClick={() =>
        isFollowing ? unfollowAuthor(authorId) : followAuthor(authorId)
      }
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}
