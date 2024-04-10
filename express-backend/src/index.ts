import cors from "cors";
import express from "express";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
	return res.send("Server running...");
});

app.listen(3005, () => {
	console.log("Server running in port 3001");
});
