"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { Transaction } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { addTransaction } from "@/lib/api/transaction";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
	Form,
	FormControl,
	FormField,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { transactionSchemaType } from "@/schema";

export default function AddTransaction() {
	const router = useRouter();
	const transactionForm = useForm<transactionSchemaType>({
		resolver: zodResolver(transactionSchema),
		defaultValues: {
			title: "",
			amount: 0,
		},
	});

	const submitForm: SubmitHandler<transactionSchemaType> = (data) => {
		mutation.mutate(data);
	};
	const mutation = useMutation({
		mutationFn: addTransaction,
		mutationKey: ["addTransaction"],
		onSuccess: () => {
			// console.log("submitted");
			toast.success(`Transaction added successfully`);
			router.push("/transactions");
		},
	});
	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="w-[30%]">
				<CardTitle className="pb-4">Add transaction</CardTitle>

				<Form {...transactionForm}>
					<form onSubmit={transactionForm.handleSubmit(submitForm)}>
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
											{...field}
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
