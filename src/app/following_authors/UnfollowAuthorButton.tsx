"use client";

import { unfollowAuthor } from "@/actions/followed_authors";

export function UnfollowAuthorButton({ authorId }: { authorId: number }) {
  return (
    <button className="btn btn-xs" type="button" onClick={() => unfollowAuthor(authorId)}>
      Unfollow
    </button>
  );
}
