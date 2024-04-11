"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const Layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const { data, status } = useSession();
	status == "unauthenticated" && redirect("/auth/login");

	return <div>{children}</div>;
};

export default Layout;
