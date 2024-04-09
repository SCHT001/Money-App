import { client } from "@/lib/axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "text" },
			},
			async authorize(credentials, req) {
				const resposne = await client.post("/auth/signIn", credentials);
				console.log(resposne);
				return resposne.data;
			},
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	session: {
		maxAge: 30 * 24 * 60 * 60,
	},
});

export { handler as GET, handler as POST };
