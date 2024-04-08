
import QueryProvider from "@/providers/query-provider";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Money app",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		
			<html lang="en">
				<body className={`${inter.className} antialiased bg-slate-300 `}>
					<QueryProvider>
						{children}
					</QueryProvider>
					<Toaster></Toaster>
				</body>
			</html>
	);
}
