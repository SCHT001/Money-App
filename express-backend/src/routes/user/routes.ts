import { Router } from "express";
import { addUser, getUsers } from "./controller";

const router = Router();

router.post("/addUser", async (req, res) => {
	return addUser(req, res);
});

router.get("/getUser", (req, res) => {
	return getUsers(req, res);
});

export default router;
