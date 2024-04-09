import { client } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { SessionContextValue } from "next-auth/react";

export const addUser = async (data: SessionContextValue) => {
	try {
		const response: AxiosResponse = await client.post(
			"/user/addUser",
			data.data?.user
		);
		console.log(response);
	} catch (err) {
		console.log(err);
	}
};
