"use client";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteTransaction, getAllTransactions } from "@/lib/api/transaction";
import {
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AllTransactions = () => {
	const router = useRouter();
	const { data, isLoading } = useQuery({
		queryKey: ["transactions"],
		queryFn: getAllTransactions,
	});
	const { mutate, isSuccess } = useMutation({
		mutationKey: ["delete"],
		mutationFn: deleteTransaction,
	});

	if (isSuccess) {
		router.push("/");
		toast("Item deleted sucessfully");
	}

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
				{isLoading ? (
					<div className="flex gap-3 flex-col">
						<Skeleton className="h-28 w-full" />
						<Skeleton className="h-28 w-full" />
					</div>
				) : (
					""
				)}
				{data?.map((item: any, index: any) => {
					return (
						<Card
							key={index}
							className="w-full flex justify-between mb-3 relative"
						>
							<div>
								<CardTitle>{item.title}</CardTitle>
								<CardContent>{item.amount} $ </CardContent>
							</div>
							<div className="flex flex-col gap-2">
								<Link href={`/transactions/${item.id}/edit`} className="w-full">
									<Button className="w-full bg-slate-400 hover:bg-slate-500">
										Edit
									</Button>
								</Link>

								<AlertDialog>
									<AlertDialogTrigger className="bg-destructive hover:bg-red-600 rounded-md p-2 text-white">
										Delete
									</AlertDialogTrigger>

									<AlertDialogContent>
										<AlertDialogTitle>Delete item?</AlertDialogTitle>
										<Button
											variant={"destructive"}
											onClick={() => {
												mutate(item.id);
											}}
										>
											Delete
										</Button>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</Card>
					);
				})}
			</Card>
		</div>
	);
};
export default AllTransactions;
