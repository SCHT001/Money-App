"use client";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getSingleTransaction, updateTransaction } from "@/lib/api/transaction";
import { cn } from "@/lib/utils";
import {
	editTransactionSchemaType,
	transactionSchema,
	transactionSchemaType,
} from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

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
	const { data, isSuccess, error } = useQuery({
		queryKey: ["getSingleTransaction"],
		queryFn: () => {
			return getSingleTransaction(params["transaction-id"]);
		},
	});

	useEffect(() => {
		if (!data) return;
		transactionForm.setValue("amount", data?.amount || 0);
		transactionForm.setValue("title", data?.title || "");
	}),
		[data];

	const mutation = useMutation({
		mutationFn: async (data: transactionSchemaType) => {
			await updateTransaction(data);
		},
		mutationKey: ["addTransaction"],
		onSuccess: () => {
			router.push("/transactions");
			toast.success(`Transaction updated successfully`);
		},
	});

	const onSubmit: SubmitHandler<transactionSchemaType> = (formData) => {
		const dataWithId = { ...formData, id: data?.id };
		mutation.mutate(dataWithId);
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="w-[30%]">
				<CardTitle className="pb-4">Edit transaction</CardTitle>

				<Form {...transactionForm}>
					<form onSubmit={transactionForm.handleSubmit(onSubmit)}>
						<FormField
							name="title"
							control={transactionForm.control}
							render={({ field }) => (
								<>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Title"
											type="text"
											className={
												(cn(
													"",
													transactionForm.formState.errors.title
														? "border-destructive"
														: ""
												),
												"mb-2")
											}
										></Input>
									</FormControl>
									<FormMessage>
										{transactionForm.formState.errors.title?.message}
									</FormMessage>
								</>
							)}
						></FormField>
						<FormField
							name="amount"
							render={({ field }) => (
								<>
									<FormLabel>Amount</FormLabel>
									<Input
										{...field}
										placeholder="0"
										type="number"
										className={cn(
											transactionForm.formState.errors.amount
												? "border-destructive"
												: ""
										)}
									></Input>
									<FormMessage>
										{transactionForm.formState.errors.amount?.message}
									</FormMessage>
								</>
							)}
						></FormField>
						<Button className="w-full mt-2">Submit</Button>
					</form>
				</Form>
			</Card>
		</div>
	);
}
