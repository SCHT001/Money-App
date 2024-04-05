import { editTransactionSchemaType, transactionSchemaType } from "@/schema";
import { Transaction } from "@/types";
import { client } from "../axios";
import axios, { AxiosResponse, HttpStatusCode } from "axios";

const ENDPOINT = "https://cms-3v4y.onrender.com/api/transaction";

const getAllTransactions = async () => {
	const response: AxiosResponse<editTransactionSchemaType[]> = await client.get(
		`/transactions`
	);
	return response.data;
};

const addTransaction = async (data: transactionSchemaType) => {
	const response = await client.post(`/transactions`, data);
	return response.data;
};

const updateTransaction = async (data: editTransactionSchemaType) => {
	const response = await client.put(`/transactions/${data.id}`, data);
	return response.data;
};

const getSingleTransaction = async (id: string | string[]) => {
	const response: AxiosResponse<editTransactionSchemaType> = await client.get(
		`/transactions/${id}`
	);
	return response.data;
};

const deleteTransaction = async (id: string) => {
	const response = await client.delete(`/transactions/${id}`);
	return response.data;
};

export {
	getAllTransactions,
	addTransaction,
	updateTransaction,
	getSingleTransaction,
	deleteTransaction,
};
