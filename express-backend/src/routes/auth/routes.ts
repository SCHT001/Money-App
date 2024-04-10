import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { signIn } from "./controller";
// import User from "../../types/user.types";
const prisma = new PrismaClient();
const router = Router();

router.post("/signIn", async (req, res) => {
	signIn(req, res);
});

export default router;
