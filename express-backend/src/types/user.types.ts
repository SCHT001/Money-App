type User = {
	id: string;
	username: string;
	email: string;
	photo?: string;
	password?: string;
};

export type RequestUserType = {
	id?: string;
	email: string;
	password: string;
};

export type AddUserType = {
	username: string;
	email: string;
	password: string;
};
export default User;
