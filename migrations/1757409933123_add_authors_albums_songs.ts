import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  // --- Drop child tables first (to avoid FK errors) ---
  await sql`DROP TABLE IF EXISTS playlists_songs`.execute(db);
  await sql`DROP TABLE IF EXISTS playlists`.execute(db);
  await sql`DROP TABLE IF EXISTS songs`.execute(db);
  await sql`DROP TABLE IF EXISTS albums`.execute(db);
  await sql`DROP TABLE IF EXISTS authors`.execute(db);

  // --- Create parent tables first ---

  // Authors
  await sql`
    CREATE TABLE authors (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL,
      bio TEXT
    ) STRICT
  `.execute(db);

  // Albums
  await sql`
    CREATE TABLE albums (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      author_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      release_date INTEGER NOT NULL,
      FOREIGN KEY (author_id) REFERENCES authors (id) ON DELETE CASCADE
    ) STRICT
  `.execute(db);

  // Songs
  await sql`
    CREATE TABLE songs (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      album_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      duration INTEGER NOT NULL,
      FOREIGN KEY (album_id) REFERENCES albums (id) ON DELETE CASCADE
    ) STRICT
  `.execute(db);

  // Playlists
  await sql`
    CREATE TABLE playlists (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL
    ) STRICT
  `.execute(db);

  // Playlist–Song Join Table
  await sql`
    CREATE TABLE playlists_songs (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      playlist_id INTEGER NOT NULL,
      song_id INTEGER NOT NULL,
      FOREIGN KEY (playlist_id) REFERENCES playlists (id) ON DELETE CASCADE,
      FOREIGN KEY (song_id) REFERENCES songs (id) ON DELETE CASCADE
    ) STRICT
  `.execute(db);
}
