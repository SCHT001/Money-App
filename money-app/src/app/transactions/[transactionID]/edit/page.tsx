"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { Transaction } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import {
	getAllTransactions,
	updateTransaction,
	addTransaction,
} from "@/lib/api/transaction";
import { editTransactionSchemaType, transactionSchema } from "@/schema";

export default function EditTransaction() {
	const router = useRouter();
	const params = useParams();
	console.log(params.transactionID);

	const query = useQuery({
		queryKey: ["getTransaction"],
		queryFn: getAllTransactions,
		onSuccess: (a) => {
			const item = a.data.find((item: any) => item.id === params.transactionID);
			console.log(item);
			transactionForm.setValue("title", item?.amount);
			transactionForm.setValue("amount", item.amount);
		},
	});

	//filter the data to get the item with the id that matches the transactionID

	const transactionForm = useForm<editTransactionSchemaType>({
		resolver: zodResolver(transactionSchema),
		defaultValues: {
			amount: 0,
			title: "",
		},
	});

	const mutation = useMutation({
		mutationFn: async (data: editTransactionSchemaType) => {
			await updateTransaction(data);
		},
		mutationKey: "addTransaction",
		onSuccess: () => {
			console.log("submitted");
			router.push("/transactions");
		},
	});

	const onSubmit: SubmitHandler<editTransactionSchemaType> = (data) => {
		console.log("submitted");
		mutation.mutate(data);
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="w-[30%]">
				<form onSubmit={transactionForm.handleSubmit(onSubmit)}>
					<CardTitle className="pb-4">Edit transaction</CardTitle>
					<label htmlFor="title" className="font-semibold">
						Title
					</label>
					<Input
						placeholder="Title"
						{...transactionForm.register("title")}
						type="text"
						className={cn(
							" mb-2",
							transactionForm.formState.errors.title ? "border-destructive" : ""
						)}
						name="title"
					></Input>
					<label
						htmlFor="title"
						className={cn(
							transactionForm.formState.errors.title ? "text-destructive" : "",
							"block mb-2"
						)}
					>
						{transactionForm.formState.errors.title?.message}
					</label>
					<label htmlFor="amount" className="font-semibold ">
						Amount
					</label>
					<Input
						placeholder="Amount"
						{...transactionForm.register("amount")}
						type="number"
						className={cn(
							transactionForm.formState.errors.amount
								? "border-destructive"
								: "",
							"mb-2"
						)}
						name="amount"
					></Input>
					<label
						htmlFor="amount"
						className={cn(
							transactionForm.formState.errors.amount ? "text-destructive" : "",
							"block bt-2"
						)}
					>
						{transactionForm.formState.errors.amount?.message}
					</label>
					<Button className="w-full mt-2">Submit</Button>
				</form>
			</Card>
		</div>
	);
}
