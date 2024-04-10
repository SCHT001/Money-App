import { Router } from "express";
import { addUser, getUsers } from "./controller";

const router = Router();

router.post("/addUser", async (req, res) => {
	addUser(req, res);
});

router.get("/getUser", (req, res) => {
	getUsers(req, res);
});

export default router;
