'use client'

import { Transaction } from "@/types";
import { transactionSchema } from "@/schema";
import { getAllTransactions } from "@/lib/api/transaction";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const data = [
    { id: '1', title: "Groceries", amount: 150.0 },
	{ id: '2', title: "Rent", amount: 1000.0 },
    { id: '3', title: "Utilities", amount: 200.0 },
    { id: '4', title: "Transportation", amount: 50.0 },
    { id: '5', title: "Dining out", amount: 75.0 },
];

const AllTransactions = () => {
	const router = useRouter();
	return (
		<div className="flex flex-col justify-center items-center h-screen  ">
			<Card className="p-5 w-[30%]">
				<CardTitle>Money App </CardTitle>
				<div className="flex justify-between">
					<CardHeader className="pl-0">Track your money</CardHeader>
					<Button
						className="self-center"
						onClick={() => {
							router.push("/transactions/create");
						}}
					>
						Add
					</Button>
				</div>
				{data.map((item: any, index: any) => {
					return (
						<Card key={index} className="w-full flex justify-between mb-3">
							<div>
								<CardTitle>{item.title}</CardTitle>
								<CardContent>{item.amount} $ </CardContent>
							</div>
							<div className="flex flex-col gap-2">
								<Button variant={"secondary"} onClick={()=>{router.push(`/transactions/${item.id}/edit`)}}>Edit</Button>
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
