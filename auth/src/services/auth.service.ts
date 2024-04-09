import { client } from "@/lib/axios";
import { formSchemaType } from "@/schema";
import { AxiosResponse } from "axios";
import { setCookie } from "cookies-next";
import { SessionContextValue } from "next-auth/react";

export const mannualSignIn = async (data: formSchemaType) => {
	const response = await client.post("/auth/signIn", data);
	response.status == 200
		? setCookie("token", response.data, {
				httpOnly: true,
		  })
		: console.log("error");
	console.log(response);
	return response;
};

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
