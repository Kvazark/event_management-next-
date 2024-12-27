export {};

declare global {
	export interface IAuthor {
		createdAt: Date;
		email: string;
		firstName: string;
		hashedPassword: string;
		id: string;
		lastName: string;
		patronymic: string | null;
		role: 'ADMIN';
		updatedAt: Date;
	}
	export interface IUserBase {
		login: string;
		password: string;
		firstName: string;
		lastName: string;
		patronymic?: string;
	}

	export interface IAdminSearch {
		id: string;
		email: string;
		firstName: string;
		lastName: string;
	}
}
