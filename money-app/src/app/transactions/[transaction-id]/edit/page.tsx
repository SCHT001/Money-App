"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { updateTransaction, getSingleTransaction } from "@/lib/api/transaction";
import {
	editTransactionSchemaType,
	transactionSchema,
	transactionSchemaType,
} from "@/schema";

export default function EditTransaction() {
	//Initialize form
	const transactionForm = useForm<editTransactionSchemaType>({
		resolver: zodResolver(transactionSchema),
		defaultValues: {
			amount: 0,
			title: "",
		},
	});

	const router = useRouter();
	const params = useParams();

	// Query single transaction
	const { data, isLoading, error } = useQuery({
		queryKey: ["getSingleTransaction"],
		queryFn: () => {
			return getSingleTransaction(params["transaction-id"]);
		},
	});

	if (!isLoading) {
		transactionForm.setValue("title", data?.title || "");
		transactionForm.setValue("amount", data?.amount || 0);
	}

	const mutation = useMutation({
		mutationFn: async (data: transactionSchemaType) => {
			await updateTransaction(data);
		},
		mutationKey: ["addTransaction"],
		onSuccess: () => {
			router.push("/transactions");
		},
	});

	const onSubmit: SubmitHandler<transactionSchemaType> = (formData) => {
		const dataWithId = { ...formData, id: data?.id };
		mutation.mutate(dataWithId);
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
