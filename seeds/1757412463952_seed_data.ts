import { DB } from '@/lib/db-types';
import type { Kysely } from 'kysely'
import { faker } from '@faker-js/faker';


export async function seed(db: Kysely<DB>): Promise<void> {
	await db.deleteFrom("songs").execute();
	await db.deleteFrom("albums").execute();
	await db.deleteFrom("authors").execute();
	
	for (let i = 0; i <= 10; i++) {
		await db.insertInto("authors").values({
			name: faker.person.fullName(),
			bio: faker.lorem.paragraph(),
		}).execute();
	}
	
	const authors = await db.selectFrom("authors").select("id").execute();
	for (let i = 0; i < authors.length; i++) {
		await db.insertInto("albums").values({
			author_id: authors[i].id,
			name: faker.music.album(),
			release_date: faker.date.past({ years: 20 }).getFullYear(),
		}).execute();
	}

	const albums = await db.selectFrom("albums").select("id").execute();
	for (let i = 0; i < albums.length; i++) {
		await db.insertInto("songs").values({
			album_id: albums[i].id,
			name: faker.music.songName(),
			duration: faker.number.int({ min: 120, max: 420 }),
		}).execute();
	}
}