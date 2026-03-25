export interface User {
	id: number;
	username: string;
	roles: string[];
}

export interface CreatingUser extends Omit<User, "id" | "roles"> {
	password: string
}

