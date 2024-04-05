import { editTransactionSchemaType, transactionSchemaType } from "@/schema";
import { Transaction } from "@/types";
import { client } from "../axios";
import { AxiosResponse, HttpStatusCode } from "axios";

const ENDPOINT = "https://cms-3v4y.onrender.com/api/transaction";

const getAllTransactions = async () => {
	const response: AxiosResponse<editTransactionSchemaType[]> = await client.get(
		`/transaction/getTransactions`
	);
	console.log(response);
	return response.data;
};

const addTransaction = async (data: Transaction) => {
	const response = await client.post(`/transactions`, data);
	return response.data;
};

const updateTransaction = async (data: editTransactionSchemaType) => {
	const response = await client.put(`/transactions/${data.id}`, data);
	return response.data;
};

const updateTransactionAmount = async (data: {
	amount: number;
	id: string;
}) => {
	const response = await client.patch(
		`/transactions/${data.id}/change-amount`,
		data.amount
	);
	return response.data;
};
const getSingleTransaction = async (id: string) => {
	const response = await client.get(`/transactions/${id}`);
	return response.data;
};

export { getAllTransactions, addTransaction, updateTransaction };
