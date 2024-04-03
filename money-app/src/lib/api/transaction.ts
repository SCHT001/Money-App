import axios from "axios";

const ENDPOINT = "http://crudcrud.com/api/04bb3b52eeba4a8b903196721bb9c548";

const getALlTrsnactions = async () => {
	const response = await axios
		.get(`${ENDPOINT}/transactions`);
	return response;
};

export default getALlTrsnactions;
