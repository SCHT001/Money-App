import axios from "axios";

export const client = axios.create({
	// baseURL: "https://cms-3v4y.onrender.com/api/",
	baseURL: "http://localhost:3005/api/",
});
