import { Transaction } from "@/types";
import axios from "axios";

const ENDPOINT = "https://cms-3v4y.onrender.com/api/transaction";

const getAllTransactions = async () => {
	const response = await axios.get(`${ENDPOINT}/getTransactions`);
	console.log(response.data);
	return response;
};

const addTransaction = async (data: Transaction) => {
	console.log(data);
	const response = await axios.post(`${ENDPOINT}/addTransactions`, {title: 'From next test',amount:'50000'}, {headers: {
		"Content-Type": "application/json",
	}} );
	// console.log(response.data);
	return response;
};

export { getAllTransactions, addTransaction };
