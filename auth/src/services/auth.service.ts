import { client } from "@/lib/axios";
import { formSchemaType } from "@/schema";
import { setCookie } from "cookies-next";

export const mannualSignIn = async (data: formSchemaType) => {
	const response = await client.post("/auth/signIn", data);
	response.status == 200
		? setCookie("token", response.data, {
				secure: true,
		  })
		: console.log("error");
	return response;
};
