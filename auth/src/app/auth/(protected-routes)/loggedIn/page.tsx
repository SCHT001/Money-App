"use client";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { signOut, useSession } from "next-auth/react";

const LoggedIn = () => {
	const currentSession = useSession();
	const logOut = () => {
		signOut();
	};
	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="p-5 flex flex-col gap-5">
				<CardTitle>
					You are logged in as {currentSession.data?.user?.name} |{" "}
					{currentSession.data?.user?.email}
				</CardTitle>
				<Button onClick={logOut}>Logout</Button>
			</Card>
		</div>
	);
};

export default LoggedIn;
