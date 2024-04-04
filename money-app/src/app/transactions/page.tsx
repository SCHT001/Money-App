"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTransactions } from "@/lib/api/transaction";
import Link from "next/link";
import { useQuery } from "react-query";

const data = [
	{ id: "1", title: "Groceries", amount: 150.0 },
	{ id: "2", title: "Rent", amount: 1000.0 },
	{ id: "3", title: "Utilities", amount: 200.0 },
	{ id: "4", title: "Transportation", amount: 50.0 },
	{ id: "5", title: "Dining out", amount: 75.0 },
];

const AllTransactions = () => {
	const {data,isLoading} = useQuery({
		queryKey: "transactions",
		queryFn: getAllTransactions,
	});
	// console.log(query.data?.data);
	

	return (
		<div className="flex flex-col justify-center items-center h-screen  ">
			<Card className="p-5 w-[30%]">
				<CardTitle>Money App </CardTitle>
				<div className="flex justify-between">
					<CardHeader className="pl-0">Track your money</CardHeader>
					<Link href="/transactions/create">
						<Button className="self-center">Add</Button>
					</Link>
				</div>
				{isLoading?'Loading...':''}
				{data?.data.map((item: any, index: any) => {
					return (
						<Card key={index} className="w-full flex justify-between mb-3">
							<div>
								<CardTitle>{item.title}</CardTitle>
								<CardContent>{item.amount} $ </CardContent>
							</div>
							<div className="flex flex-col gap-2">
								<Link href={`/transactions/${item.id}/edit`} className="w-full">
									<Button variant={"secondary"} className="w-full">
										Edit
									</Button>
								</Link>
								<Button variant={"destructive"}>Delete</Button>
							</div>
						</Card>
					);
				})}
			</Card>
		</div>
	);
};
export default AllTransactions;
