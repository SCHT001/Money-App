import cors from "cors";
import express from "express";
import api from "./routes/api";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	return res.send("Server running...");
});

app.use("/api", api);

app.listen(3005, () => {
	console.log("Server running in port 3005");
});
