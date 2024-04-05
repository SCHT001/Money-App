import { z } from "zod";

export const transactionSchema = z.object({
	title: z.string().min(1, "Title must be at least 1 character long"),
	amount: z.coerce.number().min(0.1, "Amount must be at least 0.1"),
});

export const editTransactionSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, "Title must be at least 1 character long"),
	amount: z.coerce.number().min(0.1, "Amount must be at least 0.1"),
});

export type transactionSchemaType = z.infer<typeof transactionSchema>;
export type editTransactionSchemaType = z.infer<typeof editTransactionSchema>;
