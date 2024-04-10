type User = {
	id: string;
	name: string;
	email: string;
	photo?: string;
	password?: string;
};

export type RequestUserType = {
	id?: string;
	email: string;
	password: string;
};
export default User;
