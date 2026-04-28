"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { assertSessionUserId } from "./login";

export async function followAuthor(authorId: number) {
  const userId = await assertSessionUserId();

  const db = getDb();
  await db
    .insertInto("user_followed_authors")
    .values({
      user_id: userId,
      author_id: authorId,
      created_at: Date.now(),
    })
    .onConflict((oc) => oc.columns(["user_id", "author_id"]).doNothing())
    .execute();
  revalidatePath("/following_authors");
  revalidatePath(`/author/${authorId}`);
}

export async function unfollowAuthor(authorId: number) {
  const userId = await assertSessionUserId();

  const db = getDb();
  await db
    .deleteFrom("user_followed_authors")
    .where("user_id", "=", userId)
    .where("author_id", "=", authorId)
    .execute();
  revalidatePath("/following_authors");
  revalidatePath(`/author/${authorId}`);
}
