import { Card, CardTitle } from "@/components/ui/card";
import React from "react";
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
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditTransaction() {
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
				<CardTitle>Edit transaction</CardTitle>

				<Form {...form} >
					<form onSubmit={form.handleSubmit(submitForm)} className="pt-5">
						<FormField
							control={form.control}
							name="title"
							render={(f) => {
								return (
									<>
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input {...f.field} defaultValue={""} type="text" placeholder="Title"></Input>
											</FormControl>
                                            <FormMessage>{f.fieldState.error?.message}</FormMessage>
										</FormItem>
									</>
								);
							}}
						></FormField>
                        <FormField name="amount" control={form.control} render={(f)=>{
                            return (
                                <>
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input {...f.field} defaultValue={""} type="number" placeholder="Amount"></Input>
                                        </FormControl>
                                        <FormMessage>{f.fieldState.error?.message}</FormMessage>
                                    </FormItem>
                                </>
                            )
                        }}>

                        </FormField>
                        <Button type="submit" className="w-full mt-2">Submit</Button>
					</form>
				</Form>
			</Card>
		</div>
	);
}
