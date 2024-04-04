"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Transaction } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";

export default function AddTransaction() {
	const router = useRouter();
	const transactionForm = useForm<Transaction>({
		resolver: zodResolver(transactionSchema),
		defaultValues: {
			title: "",
			amount: 0,
		},
	});

	const submitForm = (data: any) => {
		console.log("Submitted");
		router.push("/");
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="w-[30%]">
				<CardTitle className="pb-4">Add transaction</CardTitle>

				<form
					onSubmit={transactionForm.handleSubmit(submitForm)}
					className="flex flex-col gap-2"
				>
					<label htmlFor="title" className="font-semibold">
						Title
					</label>
					<Input
						placeholder="Title"
						type="text"
						className={cn(
							"",
							transactionForm.formState.errors.title ? "border-destructive" : ""
						)}
						{...transactionForm.register("title")}
						name="title"
					></Input>
					<label htmlFor="title" className={cn(transactionForm.formState.errors.title?'text-destructive':'')}>{transactionForm.formState.errors.title?.message}</label>


					<label htmlFor="amount" className="font-semibold">
						Amount
					</label>

					<Input
						placeholder="Amount"
						type="number"
						className={cn(
							"",
							transactionForm.formState.errors.amount
								? "border-destructive "
								: ""
						)}
						defaultValue={""}
						{...transactionForm.register("amount")}
						name="amount"
					></Input>
					<label htmlFor="amount" className={cn(transactionForm.formState.errors.amount?'text-destructive':'')}>{transactionForm.formState.errors.amount?.message}</label>

					<Button type="submit">Submit</Button>
				</form>
			</Card>
		</div>
	);
}
