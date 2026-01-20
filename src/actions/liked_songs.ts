"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function likeSong(songId: number) {
  const db = getDb();
  // Uses unique constraint - ignores if already liked (no extra SELECT needed)
  await db
    .insertInto("user_liked_songs")
    .values({ user_id: 1, song_id: songId })
    .onConflict((oc) => oc.columns(["user_id", "song_id"]).doNothing())
    .execute();
  revalidatePath("/");
}

export async function unlikeSong(songId: number) {
  const db = getDb();
  await db
    .deleteFrom("user_liked_songs")
    .where("user_id", "=", 1)
    .where("song_id", "=", songId)
    .execute();
  revalidatePath("/");
}
