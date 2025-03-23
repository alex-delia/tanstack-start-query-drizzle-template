import { db } from './index';
import { usersTable } from './schema';

const seedUsers = [
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

async function seed() {
	try {
		console.log('🌱 Seeding database...');

		// Clear existing data
		await db.delete(usersTable);

		// Insert seed data
		await db.insert(usersTable).values(seedUsers);

		console.log('✅ Database seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding database:', error);
		process.exit(1);
	}
	process.exit(0);
}

seed();
