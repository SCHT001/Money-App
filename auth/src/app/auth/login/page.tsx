"use client";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formSchema, formSchemaType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

const Page = () => {
	// initialize form
	const loginForm = useForm<formSchemaType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const onSubmit: SubmitHandler<formSchemaType> = () => {
		console.log("submitted");
	};

	// session check
	const { data: session } = useSession();
	if (session) {
		console.log(session);
	} else {
		console.log("no session");
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="p-2 w-[20%]">
				<CardTitle className="pb-4 text-center">Login</CardTitle>
				<Form {...loginForm}>
					<form onSubmit={loginForm.handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-2">
							<FormField
								name="email"
								control={loginForm.control}
								render={({ field }) => {
									return (
										<>
											<FormLabel className="text-lg">Email</FormLabel>
											<Input
												{...field}
												type="email"
												placeholder="example@gmail.com"
												className={cn(
													loginForm.formState.errors.password
														? "border-destructive"
														: ""
												)}
											></Input>
											<FormMessage className="text-destructive">
												{loginForm.formState.errors.email?.message}
											</FormMessage>
										</>
									);
								}}
							></FormField>
							<FormField
								control={loginForm.control}
								name="password"
								render={({ field }) => {
									return (
										<>
											<FormLabel className="text-lg ">Password</FormLabel>
											<Input
												type="text"
												placeholder="password"
												className={cn(
													loginForm.formState.errors.password
														? "border-destructive"
														: ""
												)}
												// type="password"
												{...field}
											></Input>
											<FormMessage className="text-destructive">
												{loginForm.formState.errors.password?.message}
											</FormMessage>
										</>
									);
								}}
							></FormField>
							<Button variant={"default"} className="w-full">
								Submit
							</Button>
						</div>
					</form>
				</Form>
			</Card>
		</div>
	);
};

export default Page;
