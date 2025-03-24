import { queryOptions } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';
import axios from 'redaxios';
import 'dotenv/config';

export type User = {
	id: number;
	name: string;
	email: string;
};

export const DEPLOY_URL =
	process.env.RAILWAY_PRIVATE_URL || 'http://localhost:3000';

/* Normally we don't need to use server functions to fetch data
 But fetching with server functions allows us to gain all the 
 benefits of private networking in Railway */
const fetchUsers = createServerFn({ method: 'GET' }).handler(async () => {
	return axios
		.get<Array<User>>(DEPLOY_URL + '/api/users')
		.then((r) => r.data)
		.catch((error) => {
			console.error('Error fetching users', error);
			throw error;
		});
});

export const usersQueryOptions = () =>
	queryOptions({
		queryKey: ['users'],
		queryFn: () => fetchUsers(),
	});

/* Normally we don't need to use server functions to fetch data
 But fetching with server functions allows us to gain all the 
 benefits of private networking in Railway */
const fetchUser = createServerFn({ method: 'GET' })
	.validator((d: string) => d)
	.handler(async ({ data }) => {
		console.info(`Fetching user with id ${data}...`);
		return axios
			.get<User>(DEPLOY_URL + '/api/users/' + data)
			.then((r) => r.data)
			.catch((error) => {
				console.error(error);
				throw new Error('Failed to fetch user');
			});
	});

export const userQueryOptions = (id: string) =>
	queryOptions({
		queryKey: ['users', id],
		queryFn: () => fetchUser({ data: id }),
	});
