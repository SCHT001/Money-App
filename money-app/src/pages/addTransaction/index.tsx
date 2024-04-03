import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Transaction } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/schema";
import { useRouter } from "next/router";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddTransaction() {
	const router = useRouter();
	const form = useForm<Transaction>({
		resolver: zodResolver(transactionSchema),
	});

	const submitForm = () => {
		console.log("submitted");
		router.push("/allTransactions");

	};

	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="w-[30%]">
				<CardTitle>Add transaction</CardTitle>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submitForm)}
						className="flex flex-col gap-2"
					>
						<FormField
							control={form.control}
							name="title"
							render={(f) => {
								return (
									<>
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input
													placeholder="Title"
													{...f.field}
													defaultValue={""}
												></Input>
											</FormControl>
										</FormItem>
									</>
								);
							}}
						></FormField>

						<FormField
							control={form.control}
							name="amount"
							render={(f) => {
								return (
									<FormItem>
										<FormLabel>Amount</FormLabel>
										<FormControl>
											<Input
												placeholder="Amount"
												{...f.field}
												type="number"
												defaultValue={""}
											></Input>
										</FormControl>
									</FormItem>
								);
							}}
						></FormField>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</Card>
		</div>
	);
}
