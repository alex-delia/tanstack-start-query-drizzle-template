import { queryOptions } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';
import axios from 'redaxios';

export type User = {
	id: number;
	name: string;
	email: string;
};

export const DEPLOY_URL =
	import.meta.env.VITE_RAILWAY_PRIVATE_URL || 'http://localhost:3000';

// This is a server function that fetches users from the API
// Server functions allow us to use private networking in Railway
const fetchUsers = createServerFn({ method: 'GET' }).handler(async () => {
	return axios
		.get<Array<User>>(DEPLOY_URL + '/api/users')
		.then((r) => r.data)
		.catch((error) => {
			console.error(error);
			throw new Error('Failed to fetch users');
		});
});

export const usersQueryOptions = () =>
	queryOptions({
		queryKey: ['users'],
		queryFn: () => fetchUsers(),
	});

const fetchUser = createServerFn({ method: 'GET' })
	.validator((d: string) => d)
	.handler(async ({ data }) => {
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
