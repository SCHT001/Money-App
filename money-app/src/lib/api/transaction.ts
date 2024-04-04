
import { Transaction } from "@/types";
import axios from "axios";

const ENDPOINT = "https://cms-3v4y.onrender.com/api/transaction";

const getAllTransactions = async () => {
	const response = await axios.get(`${ENDPOINT}/getTransactions`);
	// console.log(response.data);
	return response;
};

const addTransaction = async (data: Transaction) => {
	console.log(typeof(data.amount));
	const response = await axios.post(`${ENDPOINT}/addTransactions`,data, {headers: {
		"Content-Type": "application/json",
	}} );
	return response;
};

export { getAllTransactions, addTransaction };
