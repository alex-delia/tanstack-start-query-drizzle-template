import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	age: integer().notNull(),
});

export const postsTable = pgTable('posts', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	authorId: integer().references(() => usersTable.id),
	title: varchar({ length: 255 }).notNull(),
	body: varchar().notNull(),
});
