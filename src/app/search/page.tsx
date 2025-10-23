import getDb from "@/lib/db";
import Link from "next/link";

export default async function Search({searchParams}: 
  {searchParams: Promise<{ [key: string]: string | undefined }>}) {
    const {q} = await searchParams;
    console.log("Search q:", q);
    const db = getDb();

    const all_albums_search = await db.selectFrom('albums').where('name', 'like', `%${q}%`).selectAll().execute();
    const all_authors_search = await db.selectFrom('authors').where('name', 'like', `%${q}%`).selectAll().execute();
    const all_songs_search = await db.selectFrom('songs').where('name', 'like', `%${q}%`).selectAll().execute();
  
  return (
    <div>
      <h1 className="text-xl">Albums:</h1>
      <div>
        {all_albums_search.map(album => (
          <div key={album.id}>
            <Link href={`/album/${album.id}`}>{album.name}</Link>
          </div>
        ))}
      </div><br />
      <h1 className="text-xl">Authors:</h1>
      <div>
        {all_authors_search.map(author => (
          <div key={author.id}>
            <Link href={`/author/${author.id}`}>{author.name}</Link>
          </div>
        ))}
      </div><br />
      <h1 className="text-xl">Songs:</h1>
      <div>
        {all_songs_search.map(song => (
          <div key={song.id}>
            <p>{song.name}</p>
          </div>
        ))}
      </div>
      </div>
  );
  }