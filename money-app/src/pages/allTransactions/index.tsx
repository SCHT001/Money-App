import { Transaction } from "@/types";
import { transactionSchema } from "@/schema";
import { useQuery } from "@tanstack/react-query";
import getALlTrsnactions from "@/lib/api/transaction";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/router";

const data = [
	{ title: "Groceries", amount: 150.0 },
	{ title: "Rent", amount: 1000.0 },
	{ title: "Utilities", amount: 200.0 },
	{ title: "Transportation", amount: 50.0 },
	{ title: "Dining out", amount: 75.0 },
];

const AllTransactions = () => {

	const router=useRouter();

	const queriedData = useQuery({
		queryKey: ["transactions"],
		queryFn: getALlTrsnactions,
	});

	
	return (
		<div className="flex flex-col justify-center items-center h-screen  ">
			<Card className="p-5 w-[30%]">
				<CardTitle>Money App </CardTitle>
				<div className="flex justify-between">
					<CardHeader className="pl-0">Track your money</CardHeader>
					<Button className="self-center" onClick={()=>{router.push('/addTransaction')}}>Add</Button>
				</div>
				{data.map((item, index) => {
					return (
						<Card key={index} className="w-full flex justify-between">
							<div>
								<CardTitle>{item.title}</CardTitle>
								<CardContent>{item.amount} $ </CardContent>
							</div>
                            <div className="flex flex-col gap-2">
                                <Button variant={"secondary"}>Edit</Button>
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
