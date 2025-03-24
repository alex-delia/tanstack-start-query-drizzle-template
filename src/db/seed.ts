import { db } from './index';
import { postsTable, usersTable } from './schema';

interface User {
	name: string;
	email: string;
	age: number;
}

interface Post {
	title: string;
	body: string;
}

const seedUsers: User[] = [
	{
		name: 'Leanne Graham',
		email: 'Sincere@april.biz',
		age: 32,
	},
	{
		name: 'Ervin Howell',
		email: 'Shanna@melissa.tv',
		age: 28,
	},
	{
		name: 'Clementine Bauch',
		email: 'Nathan@yesenia.net',
		age: 45,
	},
	{
		name: 'Patricia Lebsack',
		email: 'Julianne.OConner@kory.org',
		age: 35,
	},
	{
		name: 'Chelsey Dietrich',
		email: 'Lucio_Hettinger@annie.ca',
		age: 29,
	},
];

const seedPosts: Post[] = [
	{
		title: 'Post 1',
		body: 'Content 1',
	},
	{
		title: 'Post 2',
		body: 'Content 2',
	},
	{
		title: 'Post 3',
		body: 'Content 3',
	},
	{
		title: 'Post 4',
		body: 'Content 4',
	},
	{
		title: 'Post 5',
		body: 'Content 5',
	},
];

async function seed() {
	try {
		console.log('🌱 Seeding database...');

		// Clear existing data
		await db.delete(usersTable);

		// Insert seed data
		await db.insert(usersTable).values(seedUsers);
		await db.insert(postsTable).values(seedPosts);

		console.log('✅ Database seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding database:', error);
		process.exit(1);
	}
	process.exit(0);
}

seed();
