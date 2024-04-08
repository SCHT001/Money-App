import { client } from "@/lib/axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {},
			async authorize(credentials, req) {
				const resposne = await client.post("/auth/signIn", credentials);
				console.log(resposne);
				return resposne.data;
			},
		}),
	],
	session: {
		maxAge: 30 * 24 * 60 * 60,
	},
});

export { handler as GET, handler as POST };
