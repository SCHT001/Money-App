"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Transaction } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/schema";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

export default function EditTransaction() {
	const router = useRouter();
	const params = useParams();
	// console.log(params.transactionID);

	const transactionForm = useForm<Transaction>({
		resolver: zodResolver(transactionSchema),
	});

	const submitForm = () => {
		console.log("submitted");
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="w-[30%]">
				<form onSubmit={transactionForm.handleSubmit(submitForm)}>
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
					<label htmlFor="title" className={cn(transactionForm.formState.errors.title?'text-destructive':'','block mb-2')}>{transactionForm.formState.errors.title?.message}</label>
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
					<label htmlFor="amount" className={cn(transactionForm.formState.errors.amount?'text-destructive':'','block bt-2')}>{transactionForm.formState.errors.amount?.message}</label>
					<Button className="w-full mt-2">Submit</Button>
				</form>
			</Card>
		</div>
	);
}
